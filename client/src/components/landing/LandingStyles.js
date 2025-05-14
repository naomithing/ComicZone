import styled from 'styled-components';

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
`;

export const WelcomeTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

export const Tagline = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
  text-align: center;
`;

export const AuthContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.theme.colors.text};
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
  }
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

export const SwitchLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.text};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const PrivacyText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text}aa;
  text-align: center;
  margin-top: 0.5rem;
`;

export const AdminIndicator = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.background};
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;