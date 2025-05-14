import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 80px);
  background-color: ${props => props.theme.colors.background};
`;

const ReaderHeader = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem 2rem;
  position: sticky;
  top: 80px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChapterInfo = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const ComicTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
`;

const ChapterTitle = styled.h2`
  color: ${props => props.theme.colors.text}99;
  font-size: 1rem;
`;

const ReaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const NavigationBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  z-index: 10;
`;

const NavButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #008c9e;
  }
`;

const PageImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  display: block;
  border-radius: 8px;
`;

const ChapterPage = () => {
  const { comicId, chapterNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  // Dummy data - replace with API call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      const comicData = {
        id: comicId,
        title: "The Amazing Comic",
        chapters: [
          { 
            number: 1, 
            title: "The Beginning",
            pages: ["/page1.jpg", "/page2.jpg"]
          },
          { 
            number: 2, 
            title: "The Journey",
            pages: ["/page3.jpg", "/page4.jpg"]
          },
          { 
            number: 3, 
            title: "The Challenge",
            pages: ["/page5.jpg", "/page6.jpg"]
          },
        ]
      };

      setComic(comicData);
      setCurrentChapter(
        comicData.chapters.find(ch => ch.number === parseInt(chapterNumber))
      );
      setLoading(false);
    };

    fetchData();
  }, [comicId, chapterNumber]);

  if (loading || !comic || !currentChapter) {
    return <div>Loading...</div>;
  }

  const currentChapterIndex = comic.chapters.findIndex(
    ch => ch.number === parseInt(chapterNumber)
  );
  
  const hasNextChapter = currentChapterIndex < comic.chapters.length - 1;
  const hasPrevChapter = currentChapterIndex > 0;

  const navigateToChapter = (direction) => {
    const newIndex = currentChapterIndex + (direction === 'next' ? 1 : -1);
    const newChapter = comic.chapters[newIndex];
    navigate(`/comic/${comicId}/chapter/${newChapter.number}`);
  };

  const returnToComicDetail = () => {
    navigate(`/comic/${comicId}`);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ReaderHeader>
          <NavButton onClick={returnToComicDetail}>
            ← Back to Comic
          </NavButton>
          <ChapterInfo>
            <ComicTitle>{comic.title}</ComicTitle>
            <ChapterTitle>
              Chapter {currentChapter.number}: {currentChapter.title}
            </ChapterTitle>
          </ChapterInfo>
          <div style={{ width: '100px' }}></div> {/* Spacer for centering */}
        </ReaderHeader>

        <ReaderContent>
          {currentChapter.pages.map((page, index) => (
            <PageImage 
              key={index}
              src={page} 
              alt={`Page ${index + 1}`}
            />
          ))}
        </ReaderContent>

        <NavigationBar>
          <NavButton
            onClick={() => navigateToChapter('prev')}
            disabled={!hasPrevChapter}
          >
            ← Previous Chapter
          </NavButton>

          <NavButton onClick={returnToComicDetail}>
            Chapter List
          </NavButton>

          <NavButton
            onClick={() => navigateToChapter('next')}
            disabled={!hasNextChapter}
          >
            Next Chapter →
          </NavButton>
        </NavigationBar>
      </PageContainer>
    </>
  );
};

export default ChapterPage; 