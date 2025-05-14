import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ComicCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
`;

const CoverImage = styled.div`
  width: 100%;
  height: 280px;
  background-color: ${props => props.theme.colors.background};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ComicInfo = styled.div`
  padding: 1rem;
`;

const ComicTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const DownloadDate = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

const DownloadsPage = () => {
  const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');

  return (
    <>
      <Navbar />
      <PageContainer>
        <Title>Your Downloads</Title>
        {downloads.length === 0 ? (
          <p>No downloads yet.</p>
        ) : (
          <Grid>
            {downloads.map(comic => (
              <ComicCard key={comic.id}>
                <CoverImage>
                  <img src={comic.cover} alt={comic.title} />
                </CoverImage>
                <ComicInfo>
                  <ComicTitle>{comic.title}</ComicTitle>
                  <DownloadDate>
                    Downloaded on {new Date(comic.downloadDate).toLocaleDateString()}
                  </DownloadDate>
                </ComicInfo>
              </ComicCard>
            ))}
          </Grid>
        )}
      </PageContainer>
    </>
  );
};

export default DownloadsPage; 