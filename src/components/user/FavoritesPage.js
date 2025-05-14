import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 100px;
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ComicCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CoverImage = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  background-color: ${props => props.theme.colors.background};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(231, 76, 60, 0.8);
    transform: scale(1.1);
  }
`;

const ComicInfo = styled.div`
  padding: 1.5rem;
`;

const ComicTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateAdded = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ExploreButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #008c9e;
  }
`;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id, event) => {
    event.stopPropagation(); // Prevent card click when removing
    const updatedFavorites = favorites.filter(comic => comic.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const navigateToComic = (id) => {
    navigate(`/comic/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (favorites.length === 0) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <EmptyState>
            <EmptyStateText>You haven't added any favorites yet</EmptyStateText>
            <ExploreButton onClick={() => navigate('/explore')}>
              Explore Comics
            </ExploreButton>
          </EmptyState>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <Header>
          <Title>Your Favorites</Title>
          <Subtitle>{favorites.length} {favorites.length === 1 ? 'comic' : 'comics'} in your collection</Subtitle>
        </Header>

        <Grid>
          {favorites.map(comic => (
            <ComicCard 
              key={comic.id}
              onClick={() => navigateToComic(comic.id)}
            >
              <CoverImage>
                <img src={comic.cover} alt={comic.title} />
                <FavoriteButton
                  onClick={(e) => removeFavorite(comic.id, e)}
                  title="Remove from favorites"
                >
                  ❤️
                </FavoriteButton>
              </CoverImage>
              <ComicInfo>
                <ComicTitle>{comic.title}</ComicTitle>
                <DateAdded>
                  Added {formatDate(comic.addedDate)}
                </DateAdded>
              </ComicInfo>
            </ComicCard>
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default FavoritesPage; 