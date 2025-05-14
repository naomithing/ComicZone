import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  min-height: calc(100vh - 80px);
`;

const ProfileGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem;
  height: fit-content;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.text};
  margin: 0 auto 1.5rem auto;
`;

const UserName = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.text}99;
  text-align: center;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatBox = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
`;

const InfoLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  color: ${props => props.theme.colors.text};
`;

const AccountPage = () => {
  // This would typically come from your auth context or state management
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    stats: {
      uploads: 12,
      favorites: 45,
      downloads: 28,
      comments: 156
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ProfileGrid>
          {/* Sidebar with user info */}
          <Sidebar>
            <Avatar>{user.name.charAt(0)}</Avatar>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            
            <StatsGrid>
              <StatBox>
                <StatNumber>{user.stats.uploads}</StatNumber>
                <StatLabel>Uploads</StatLabel>
              </StatBox>
              <StatBox>
                <StatNumber>{user.stats.favorites}</StatNumber>
                <StatLabel>Favorites</StatLabel>
              </StatBox>
              <StatBox>
                <StatNumber>{user.stats.downloads}</StatNumber>
                <StatLabel>Downloads</StatLabel>
              </StatBox>
              <StatBox>
                <StatNumber>{user.stats.comments}</StatNumber>
                <StatLabel>Comments</StatLabel>
              </StatBox>
            </StatsGrid>
          </Sidebar>

          {/* Main content area */}
          <MainContent>
            {/* Basic Account Information */}
            <Section>
              <SectionTitle>Account Information</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{user.email}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </Section>
          </MainContent>
        </ProfileGrid>
      </PageContainer>
    </>
  );
};

export default AccountPage; 