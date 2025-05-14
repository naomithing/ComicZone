import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Header,
  LeftSection,
  CenterSection,
  RightSection,
  Logo,
  NavLink,
  SearchBar,
  UploadButton,
  UserDropdown,
  UserAvatar,
  DropdownContent,
  DropdownItem
} from './NavbarStyles';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // If user is not logged in, don't show the navbar
  if (!user) {
    return null;
  }

  return (
    <Header>
      <LeftSection>
        <Logo to="/user/dashboard">ComicZone</Logo>
        <NavLink 
          to="/explore" 
          className={isActive('/explore') ? 'active' : ''}
        >
          Explore
        </NavLink>
        <NavLink 
          to="/genres" 
          className={isActive('/genres') ? 'active' : ''}
        >
          Genres
        </NavLink>
      </LeftSection>

      <CenterSection>
        <SearchBar
          type="text"
          placeholder="Search comics..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </CenterSection>

      <RightSection>
        <UploadButton onClick={() => navigate('/upload')}>Upload</UploadButton>
        <UserDropdown>
          <UserAvatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
              user.username.charAt(0).toUpperCase()
            )}
          </UserAvatar>
          <DropdownContent isOpen={isDropdownOpen}>
            <DropdownItem 
              to="/profile"
              className={isActive('/profile') ? 'active' : ''}
            >
              Profile
            </DropdownItem>
            <DropdownItem 
              to="/favorites"
              className={isActive('/favorites') ? 'active' : ''}
            >
              Favorites
            </DropdownItem>
            <DropdownItem 
              to="/downloads"
              className={isActive('/downloads') ? 'active' : ''}
            >
              Downloads
            </DropdownItem>
            <DropdownItem 
              to="/settings"
              className={isActive('/settings') ? 'active' : ''}
            >
              Settings
            </DropdownItem>
            <DropdownItem as="button" onClick={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownContent>
        </UserDropdown>
      </RightSection>
    </Header>
  );
};

export default Navbar; 