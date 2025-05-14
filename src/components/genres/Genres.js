import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import {
  GenresContainer,
  GenresContent,
  GenreNavigation,
  GenreButton,
  GenreSection,
  GenreHeader,
  GenreTitle,
  ViewAllButton,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  ComicStatus,
  ReadMoreButton
} from './GenresStyles';

const GENRES = [
  'Action',
  'Thriller',
  'Romance',
  'Fantasy',
  'Mystery',
  'Horror',
  'Sci-Fi',
  'Slice of Life',
  'Comedy',
  'Drama'
];

// Mock data for comics with genres
const mockComics = {
  Action: [
    { id: 1, title: 'Hero\'s Journey', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 2, title: 'Battle Arena', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 3, title: 'Power Strike', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 4, title: 'Warrior\'s Path', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Thriller: [
    { id: 5, title: 'Dark Mystery', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 6, title: 'Silent Whispers', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 7, title: 'The Unknown', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 8, title: 'Midnight Tales', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Romance: [
    { id: 9, title: 'First Love', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 10, title: 'Sweet Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 11, title: 'Love Story', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 12, title: 'Heart Beat', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Fantasy: [
    { id: 13, title: 'Dragon\'s Crown', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 14, title: 'Magic Academy', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 15, title: 'Enchanted Realm', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 16, title: 'Mystic Knights', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Mystery: [
    { id: 17, title: 'Detective\'s Note', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 18, title: 'Hidden Clues', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 19, title: 'The Perfect Crime', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 20, title: 'Cold Case', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Horror: [
    { id: 21, title: 'Haunted House', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 22, title: 'Dark Secrets', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 23, title: 'Nightmare City', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 24, title: 'The Cursed', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  'Sci-Fi': [
    { id: 25, title: 'Space Colony', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 26, title: 'Cyber World', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 27, title: 'Time Travelers', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 28, title: 'Android Dreams', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  'Slice of Life': [
    { id: 29, title: 'Daily Life', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 30, title: 'Coffee & Dreams', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 31, title: 'Campus Days', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 32, title: 'Working Life', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Comedy: [
    { id: 33, title: 'Laugh Out Loud', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 34, title: 'Funny Business', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 35, title: 'School Humor', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 36, title: 'Comedy Club', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ],
  Drama: [
    { id: 37, title: 'Family Ties', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 38, title: 'Life Changes', status: 'Completed', image: 'https://via.placeholder.com/300x400' },
    { id: 39, title: 'Growing Pains', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' },
    { id: 40, title: 'Emotional Path', status: 'Ongoing', image: 'https://via.placeholder.com/300x400' }
  ]
};

const Genres = () => {
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState(GENRES[0]);

  const handleViewAll = (genre) => {
    navigate(`/genres/${genre.toLowerCase()}`);
  };

  return (
    <GenresContainer>
      <Navbar />
      <GenresContent>
        <GenreNavigation>
          {GENRES.map(genre => (
            <GenreButton
              key={genre}
              active={activeGenre === genre}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </GenreButton>
          ))}
        </GenreNavigation>

        {GENRES.map(genre => (
          <GenreSection key={genre} style={{ display: activeGenre === genre ? 'block' : 'none' }}>
            <GenreHeader>
              <GenreTitle>{genre}</GenreTitle>
              <ViewAllButton onClick={() => handleViewAll(genre)}>
                View All
              </ViewAllButton>
            </GenreHeader>
            <ComicsGrid>
              {(mockComics[genre] || []).map(comic => (
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
          </GenreSection>
        ))}
      </GenresContent>
    </GenresContainer>
  );
};

export default Genres; 