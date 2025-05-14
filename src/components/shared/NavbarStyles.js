import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  background-color: #2a2f35;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00bcd4;
  text-decoration: none;
  cursor: pointer;
  margin-right: 2rem;
`;

export const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  position: relative;

  &:hover {
    color: #00bcd4;
  }

  &.active {
    color: #00bcd4;

    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #00bcd4;
      border-radius: 2px;
    }
  }
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 2rem;
`;

export const SearchBar = styled.input`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: 1px solid #00bcd4;
  background-color: #1a1f25;
  color: #ffffff;
  width: 100%;
  min-width: 300px;

  &:focus {
    outline: none;
    border-color: #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const UploadButton = styled.button`
  background-color: #00bcd4;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #008c9e;
  }
`;

export const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00bcd4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
`;

export const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  top: 120%;
  background-color: #2a2f35;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

export const DropdownItem = styled(Link)`
  color: #ffffff;
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-size: 0.95rem;

  &:hover {
    background-color: rgba(0, 188, 212, 0.1);
    color: #00bcd4;
  }

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`; 