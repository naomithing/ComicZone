import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const LoginCard = styled.div`
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
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
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

const LoginButton = styled.button`
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

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
`;

const BackToHome = styled.a`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  display: block;
  margin-top: 1.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // TODO: Add your actual login logic here
    try {
      // Placeholder login logic
      if (formData.email && formData.password) {
        // Store auth data
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        // Redirect to dashboard
        navigate('/user/dashboard');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>ComicZone</Logo>
        <Title>Welcome Back!</Title>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginButton type="submit">
            Log In
          </LoginButton>
        </Form>

        <BackToHome onClick={() => navigate('/')}>
          Back to Home
        </BackToHome>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 