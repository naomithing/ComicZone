import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import {
  GenresContainer,
  GenresContent,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicStatus,
  ReadMoreButton,
} from './GenresStyles';
import styled from 'styled-components';

const GenrePageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const GenreTitle = styled.h1`
  font-size: 2.5rem;
  color: #00bcd4;
  font-weight: 600;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #00bcd4;
  background-color: transparent;
  color: #00bcd4;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: #00bcd4;
    color: #ffffff;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${props => props.active ? '#00bcd4' : '#4a4a4a'};
  background-color: ${props => props.active ? '#00bcd4' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#b0b0b0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00bcd4;
    color: ${props => props.active ? '#ffffff' : '#00bcd4'};
  }
`;

// Extended mock data for each genre (more comics)
const extendedMockComics = {
  action: [
    { id: 1, title: 'Hero\'s Journey', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 2, title: 'Battle Arena', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 3, title: 'Power Strike', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 4, title: 'Warrior\'s Path', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 41, title: 'Ultimate Fighter', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 42, title: 'Martial Legend', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 43, title: 'Combat Master', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 44, title: 'Epic Battles', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  thriller: [
    { id: 5, title: 'Dark Mystery', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 6, title: 'Silent Whispers', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 7, title: 'The Unknown', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 8, title: 'Midnight Tales', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 45, title: 'Deadly Secrets', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 46, title: 'The Conspiracy', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 47, title: 'Fatal Error', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 48, title: 'Mind Games', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  romance: [
    { id: 9, title: 'First Love', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 10, title: 'Sweet Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 11, title: 'Love Story', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 12, title: 'Heart Beat', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 49, title: 'Summer Romance', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 50, title: 'Perfect Match', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 51, title: 'Love Letters', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 52, title: 'Destiny', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  fantasy: [
    { id: 13, title: 'Dragon\'s Crown', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 14, title: 'Magic Academy', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 15, title: 'Enchanted Realm', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 16, title: 'Mystic Knights', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 53, title: 'Wizard\'s Tale', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 54, title: 'Mythical Beasts', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 55, title: 'Fairy Kingdom', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 56, title: 'Legend of Magic', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  mystery: [
    { id: 17, title: 'Detective\'s Note', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 18, title: 'Hidden Clues', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 19, title: 'The Perfect Crime', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 20, title: 'Cold Case', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 57, title: 'Missing Pieces', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 58, title: 'The Investigation', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 59, title: 'Unsolved Files', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 60, title: 'Mystery Manor', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  horror: [
    { id: 21, title: 'Haunted House', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 22, title: 'Dark Secrets', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 23, title: 'Nightmare City', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 24, title: 'The Cursed', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 61, title: 'Ghost Stories', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 62, title: 'Dark Forest', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 63, title: 'The Ritual', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 64, title: 'Paranormal', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  'sci-fi': [
    { id: 25, title: 'Space Colony', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 26, title: 'Cyber World', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 27, title: 'Time Travelers', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 28, title: 'Android Dreams', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 65, title: 'Future Tech', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 66, title: 'AI Revolution', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 67, title: 'Space Wars', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 68, title: 'Quantum Tales', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  'slice-of-life': [
    { id: 29, title: 'Daily Life', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 30, title: 'Coffee & Dreams', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 31, title: 'Campus Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 32, title: 'Working Life', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 69, title: 'City Stories', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 70, title: 'Neighborhood', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 71, title: 'Simple Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 72, title: 'Life & Love', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  comedy: [
    { id: 33, title: 'Laugh Out Loud', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 34, title: 'Funny Business', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 35, title: 'School Humor', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 36, title: 'Comedy Club', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 73, title: 'Silly Stories', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 74, title: 'Fun Times', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 75, title: 'Jokes & More', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 76, title: 'Happy Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  drama: [
    { id: 37, title: 'Family Ties', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 38, title: 'Life Changes', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 39, title: 'Growing Pains', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 40, title: 'Emotional Path', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 77, title: 'Heart Strings', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 78, title: 'Life\'s Journey', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 79, title: 'Deep Waters', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 80, title: 'Soul Search', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ]
};

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('all');

  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
  const comics = extendedMockComics[genre.toLowerCase()] || [];

  const filteredComics = React.useMemo(() => {
    if (filter === 'all') return comics;
    return comics.filter(comic => 
      filter === 'ongoing' ? comic.status === 'Ongoing' : comic.status === 'Completed'
    );
  }, [comics, filter]);

  return (
    <GenresContainer>
      <Navbar />
      <GenresContent>
        <GenrePageHeader>
          <GenreTitle>{formattedGenre} Comics</GenreTitle>
          <BackButton onClick={() => navigate('/genres')}>
            Back to Genres
          </BackButton>
        </GenrePageHeader>

        <FilterSection>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'ongoing'} 
            onClick={() => setFilter('ongoing')}
          >
            Ongoing
          </FilterButton>
          <FilterButton 
            active={filter === 'completed'} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </FilterButton>
        </FilterSection>

        <ComicsGrid>
          {filteredComics.map(comic => (
            <ComicCard key={comic.id}>
              <ComicImage src={comic.image} alt={comic.title} />
              <ComicInfo>
                <ComicTitle>{comic.title}</ComicTitle>
                <ComicStatus status={comic.status}>{comic.status}</ComicStatus>
                <ReadMoreButton onClick={() => navigate(`/comic/${comic.id}`)}>
                  Read More
                </ReadMoreButton>
              </ComicInfo>
            </ComicCard>
          ))}
        </ComicsGrid>
      </GenresContent>
    </GenresContainer>
  );
};

export default GenrePage; 