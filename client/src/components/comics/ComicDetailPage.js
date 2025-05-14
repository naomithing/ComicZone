import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const ComicHeader = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CoverImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ComicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};

  &:hover {
    background-color: #008c9e;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  
  ${props => props.downloaded && `
    background-color: #2ecc71;
    &:hover {
      background-color: #27ae60;
    }
  `}

  ${props => props.favorited && `
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  `}

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Summary = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin: 2rem 0;
`;

const ChapterList = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const ChapterTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Chapter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}22;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Star = styled.span`
  color: ${props => props.active ? '#ffd700' : props.theme.colors.text}66;
  cursor: pointer;
  font-size: 1.5rem;
`;

const Comments = styled.div`
  margin: 2rem 0;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProgressOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProgressCard = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ComicDetailPage = () => {
  const { id: comicId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Dummy data - replace with API call
  const comic = {
    id: comicId,
    title: "The Amazing Comic",
    cover: "placeholder.jpg",
    summary: "Lorem ipsum dolor sit amet...",
    readers: "1.2k",
    chapters: [
      { number: 1, title: "The Beginning", date: "2024-01-01" },
      { number: 2, title: "The Journey", date: "2024-01-15" },
      { number: 3, title: "The Challenge", date: "2024-02-01" },
    ]
  };

  // Check initial states from localStorage when component mounts
  React.useEffect(() => {
    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    setIsDownloaded(downloads.some(d => d.id === comicId));
    setIsFavorite(favorites.some(f => f.id === comicId));
  }, [comicId]);

  const handleRating = (value) => {
    setRating(value);
    // TODO: Implement rating submission
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const simulateDownload = () => {
    if (isDownloaded) return; // Prevent re-downloading

    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDownloaded(true); // Set downloaded state to true
          
          // Add to downloads in localStorage
          const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
          const newDownload = {
            id: comicId,
            title: comic.title,
            cover: comic.cover,
            downloadDate: new Date().toISOString()
          };
          
          if (!downloads.some(d => d.id === comicId)) {
            downloads.push(newDownload);
            localStorage.setItem('downloads', JSON.stringify(downloads));
          }
          
          showToastMessage('Download completed! Added to your downloads.');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Update favorites in localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (newFavoriteStatus) {
      if (!favorites.some(f => f.id === comicId)) {
        favorites.push({
          id: comicId,
          title: comic.title,
          cover: comic.cover,
          addedDate: new Date().toISOString()
        });
        showToastMessage('Added to favorites!');
      }
    } else {
      const index = favorites.findIndex(f => f.id === comicId);
      if (index !== -1) {
        favorites.splice(index, 1);
        showToastMessage('Removed from favorites!');
      }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download clicked');
  };

  const startReading = () => {
    // Always starts from chapter 1
    navigate(`/comic/${comicId}/chapter/1`);
  };

  const navigateToChapter = (chapterNumber) => {
    navigate(`/comic/${comicId}/chapter/${chapterNumber}`);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ComicHeader>
          <CoverImage>
            <img src={comic.cover} alt={comic.title} />
          </CoverImage>
          
          <ComicInfo>
            <Title>{comic.title}</Title>
            
            <Stats>
              <span>📖 Read by {comic.readers} users</span>
            </Stats>

            <Rating>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  active={star <= rating}
                  onClick={() => handleRating(star)}
                >
                  ★
                </Star>
              ))}
            </Rating>

            <ActionButtons>
              <PrimaryButton onClick={startReading}>
                Start Reading
              </PrimaryButton>
              <SecondaryButton 
                onClick={simulateDownload} 
                disabled={isDownloading}
                downloaded={isDownloaded}
              >
                {isDownloading ? (
                  <>
                    <span>Downloading...</span>
                  </>
                ) : isDownloaded ? (
                  <>
                    <span>✓</span>
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <span>↓</span>
                    <span>Download</span>
                  </>
                )}
              </SecondaryButton>
              <SecondaryButton 
                onClick={toggleFavorite}
                favorited={isFavorite}
              >
                {isFavorite ? (
                  <>
                    <span>❤️</span>
                    <span>Favorited</span>
                  </>
                ) : (
                  <>
                    <span>🤍</span>
                    <span>Favorite</span>
                  </>
                )}
              </SecondaryButton>
            </ActionButtons>

            <Summary>{comic.summary}</Summary>
          </ComicInfo>
        </ComicHeader>

        <ChapterList>
          <ChapterTitle>Chapters</ChapterTitle>
          {comic.chapters.map((chapter) => (
            <Chapter 
              key={chapter.number}
              onClick={() => navigateToChapter(chapter.number)}
            >
              <div>
                <span>Chapter {chapter.number}</span>
                <span>: {chapter.title}</span>
              </div>
              <span>{chapter.date}</span>
            </Chapter>
          ))}
        </ChapterList>

        <Comments>
          <ChapterTitle>Comments</ChapterTitle>
          <CommentInput placeholder="Share your thoughts..." />
          <PrimaryButton>Post Comment</PrimaryButton>
        </Comments>
      </PageContainer>

      {/* Download Progress Overlay */}
      <ProgressOverlay show={isDownloading}>
        <ProgressCard>
          <h3>Downloading {comic.title}</h3>
          <ProgressBar>
            <Progress value={downloadProgress} />
          </ProgressBar>
          <p>{downloadProgress}%</p>
        </ProgressCard>
      </ProgressOverlay>

      {/* Toast Notification */}
      {showToast && (
        <Toast>
          {toastMessage}
        </Toast>
      )}
    </>
  );
};

export default ComicDetailPage; 