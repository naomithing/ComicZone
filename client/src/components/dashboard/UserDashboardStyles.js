import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #666;
    background-color: #e0e0e0;
  }

  label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const Username = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  color: #333;
`;

export const Email = styled.p`
  margin: 0.5rem 0;
  color: #666;
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const StatLabel = styled.div`
  color: #666;
  margin-top: 0.5rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const UploadSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

export const RecentUploads = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const UploadCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const UploadImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const UploadInfo = styled.div`
  padding: 1rem;
`;

export const UploadTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

export const UploadDate = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
`; 