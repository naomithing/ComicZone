import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import {
  ExploreContainer,
  ExploreContent,
  ToggleContainer,
  ToggleButton,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicGenre,
  ComicStatus,
  ReadMoreButton
} from './ExploreStyles';

// Mock data for comics
const mockComics = [
  {
    id: 1,
    title: 'The Last Hero',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Action/Adventure',
    status: 'Ongoing',
    popularity: 'high',
    trending: true
  },
  {
    id: 2,
    title: 'Space Adventures',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Sci-Fi',
    status: 'Completed',
    popularity: 'medium',
    trending: false
  },
  {
    id: 3,
    title: 'Mystic World',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Fantasy',
    status: 'Ongoing',
    popularity: 'high',
    trending: true
  },
  {
    id: 4,
    title: 'Cyber Dreams',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Cyberpunk',
    status: 'Ongoing',
    popularity: 'medium',
    trending: true
  },
  {
    id: 5,
    title: 'Neon Nights',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Sci-Fi/Noir',
    status: 'Completed',
    popularity: 'high',
    trending: false
  },
  {
    id: 6,
    title: 'Fantasy Quest',
    image: 'https://via.placeholder.com/300x400',
    genre: 'Fantasy/Adventure',
    status: 'Ongoing',
    popularity: 'high',
    trending: true
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filterComics = () => {
    switch (activeTab) {
      case 'popular':
        return mockComics.filter(comic => comic.popularity === 'high');
      case 'trending':
        return mockComics.filter(comic => comic.trending);
      default:
        return mockComics;
    }
  };

  return (
    <ExploreContainer>
      <Navbar />
      <ExploreContent>
        <ToggleContainer>
          <ToggleButton 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Comics
          </ToggleButton>
          <ToggleButton 
            active={activeTab === 'popular'} 
            onClick={() => setActiveTab('popular')}
          >
            Popular Comics
          </ToggleButton>
          <ToggleButton 
            active={activeTab === 'trending'} 
            onClick={() => setActiveTab('trending')}
          >
            Trending Comics
          </ToggleButton>
        </ToggleContainer>

        <ComicsGrid>
          {filterComics().map(comic => (
            <ComicCard key={comic.id}>
              <ComicImage src={comic.image} alt={comic.title} />
              <ComicInfo>
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicGenre>{comic.genre}</ComicGenre>
                <ComicStatus status={comic.status}>{comic.status}</ComicStatus>
                <ReadMoreButton onClick={() => navigate(`/comic/${comic.id}`)}>
                  Read More
                </ReadMoreButton>
              </ComicInfo>
            </ComicCard>
          ))}
        </ComicsGrid>
      </ExploreContent>
    </ExploreContainer>
  );
};

export default Explore; 