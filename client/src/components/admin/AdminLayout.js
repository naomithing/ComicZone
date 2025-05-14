import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LogoutIcon } from './icons/Icons';
import {
  DashboardContainer,
  Sidebar,
  MainContent,
  Logo,
  NavItem,
} from './AdminStyles';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>Comic Admin</Logo>
        <NavItem 
          active={isActive('/admin/dashboard')}
          onClick={() => navigate('/admin/dashboard')}
        >
          <span className="icon">📊</span>
          Dashboard
        </NavItem>
        <NavItem 
          active={isActive('/admin/users')}
          onClick={() => navigate('/admin/users')}
        >
          <span className="icon">👥</span>
          Users
        </NavItem>
        <NavItem 
          active={isActive('/admin/comics')}
          onClick={() => navigate('/admin/comics')}
        >
          <span className="icon">📚</span>
          Comics
        </NavItem>
        <NavItem 
          active={isActive('/admin/reviews')}
          onClick={() => navigate('/admin/reviews')}
        >
          <span className="icon">⭐</span>
          Reviews
        </NavItem>
        <NavItem 
          active={isActive('/admin/genres')}
          onClick={() => navigate('/admin/genres')}
        >
          <span className="icon">🏷️</span>
          Genres
        </NavItem>
        <NavItem onClick={handleLogout} className="logout">
          <span className="icon">
            <LogoutIcon />
          </span>
          Logout
        </NavItem>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminLayout; 