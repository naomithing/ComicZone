import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin: 0 auto 1.5rem auto;
`;

const UserName = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.text}99;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const StatsContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.8rem;
`;

const InfoContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  padding: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
  }
`;

const InfoLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

const InfoValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;
  if (!user) return <PageContainer>No user data</PageContainer>;

  return (
    <>
      <Navbar />
      <PageContainer>
        <ProfileCard>
          <Avatar>{user.username ? user.username.charAt(0) : '?'}</Avatar>
          <UserName>{user.username}</UserName>
          <UserEmail>{user.email}</UserEmail>

          <StatsContainer>
            <StatsGrid>
              <StatItem>
                <StatNumber>{user.stats?.uploads || 0}</StatNumber>
                <StatLabel>Uploads</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.stats?.favorites || 0}</StatNumber>
                <StatLabel>Favorites</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{user.stats?.downloads || 0}</StatNumber>
                <StatLabel>Downloads</StatLabel>
              </StatItem>
            </StatsGrid>
          </StatsContainer>

          <InfoContainer>
            <InfoItem>
              <InfoLabel>Username</InfoLabel>
              <InfoValue>{user.username}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </InfoItem>
          </InfoContainer>
        </ProfileCard>
      </PageContainer>
    </>
  );
};

export default ProfilePage;