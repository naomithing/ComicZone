import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const AuthCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${props => props.theme.colors.background};
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  border-bottom: 2px solid ${props => 
    props.active ? props.theme.colors.primary : 'transparent'};
  margin-bottom: -2px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 173, 181, 0.2);
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008c9e;
  }
`;

const AdminToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.isAdmin ? props.theme.colors.primary : props.theme.colors.text};
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  width: 100%;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const { register, login, error: authError } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Form submitted:', { activeTab, isAdmin, formData });
      
      if (activeTab === 'signup' && !isAdmin) {
        // Validate input
        if (!formData.username || !formData.email || !formData.password) {
          console.log('Missing required fields:', formData);
          throw new Error('Please fill in all fields');
        }
        if (formData.password.length < 6) {
          console.log('Password too short:', formData.password.length);
          throw new Error('Password must be at least 6 characters long');
        }

        console.log('Attempting to register user:', {
          username: formData.username,
          email: formData.email,
          password: '[hidden]'
        });
        
        // Handle user signup
        const userData = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Registration successful:', userData);

        // Show success message and switch to login
        setActiveTab('login');
        setFormData({ ...formData, password: '' });
        alert('Registration successful! Please login.');
      } else {
        // Validate input
        if (!formData.email || !formData.password) {
          console.log('Missing login fields:', formData);
          throw new Error('Please fill in all fields');
        }

        console.log('Attempting to login:', {
          email: formData.email,
          password: '[hidden]'
        });
        
        // Handle login (both admin and user)
        const userData = await login({
          email: formData.email,
          password: formData.password
        });
        
        console.log('Login successful:', userData);
        
        // Redirect based on user type
        if (userData.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    setActiveTab('login'); // Force login tab when switching to admin
    setError('');
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Logo>ComicZone</Logo>
        
        {!isAdmin && (
          <TabsContainer>
            <Tab 
              active={activeTab === 'login'}
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
            >
              Login
            </Tab>
            <Tab 
              active={activeTab === 'signup'}
              onClick={() => {
                setActiveTab('signup');
                setError('');
              }}
            >
              Sign Up
            </Tab>
          </TabsContainer>
        )}

        <Form onSubmit={handleSubmit}>
          {activeTab === 'signup' && !isAdmin && (
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          )}
          
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          {(error || authError) && (
            <ErrorMessage>{error || authError}</ErrorMessage>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (
              isAdmin ? 'Login as Admin' : (activeTab === 'signup' ? 'Sign Up' : 'Login')
            )}
          </Button>
        </Form>

        <AdminToggle 
          onClick={toggleAdmin}
          isAdmin={isAdmin}
          disabled={loading}
        >
          {isAdmin ? 'Switch to User' : 'Switch to Admin'}
        </AdminToggle>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthPage;