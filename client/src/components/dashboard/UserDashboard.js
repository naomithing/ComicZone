import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  DashboardContainer,
  Header,
  LeftSection,
  CenterSection,
  RightSection,
  Logo,
  NavLink,
  SearchBar,
  UploadButton,
  UserDropdown,
  UserAvatar,
  DropdownContent,
  DropdownItem,
  MainContent,
  ComicsGrid,
  ComicCard,
  ComicImage,
  ComicInfo,
  ComicTitle,
  Footer,
  FooterContent,
  FooterSection,
  SocialLinks,
  ProfileSection,
  ProfileImage,
  ProfileInfo,
  Username,
  Email,
  StatsSection,
  StatCard,
  StatValue,
  StatLabel,
  ActionButtons,
  Button,
  UploadSection,
  RecentUploads,
  UploadCard,
  UploadImage,
  UploadInfo,
  UploadTitle,
  UploadDate
} from './DashboardStyles';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, updateProfileImage } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedComics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/comics/approved');
      setComics(res.data);
    } catch (error) {
      console.error('Failed to fetch approved comics:', error);
      setComics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedComics();
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear the auth token and user data
    navigate('/');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        await updateProfileImage(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Dummy data for recent uploads
  const recentUploads = [
    {
      id: 1,
      title: 'Chapter 1: The Beginning',
      image: 'https://via.placeholder.com/150',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Chapter 2: The Journey',
      image: 'https://via.placeholder.com/150',
      date: '2024-03-14'
    }
  ];

  const filteredComics = comics.filter(comic => 
    comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comic.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardContainer>
      <Header>
        <LeftSection>
          <Logo as={Link} to="/user/dashboard">ComicZone</Logo>
          <NavLink as={Link} to="/explore">Explore</NavLink>
          <NavLink as={Link} to="/genres">Genres</NavLink>
        </LeftSection>

        <CenterSection>
          <SearchBar
            type="text"
            placeholder="Search comics..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </CenterSection>

        <RightSection>
          <UploadButton onClick={() => navigate('/upload')}>Upload</UploadButton>
          <UserDropdown>
            <UserAvatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {user?.username ? user.username.charAt(0).toUpperCase() : '?'}
            </UserAvatar>
            <DropdownContent isOpen={isDropdownOpen}>
              <DropdownItem as={Link} to="/profile">Profile</DropdownItem>
              <DropdownItem as={Link} to="/favorites">Favorites</DropdownItem>
              <DropdownItem as={Link} to="/downloads">Downloads</DropdownItem>
              <DropdownItem as={Link} to="/settings">Settings</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContent>
          </UserDropdown>
        </RightSection>
      </Header>

      <MainContent>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading comics...</div>
        ) : filteredComics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            {searchQuery ? 'No comics found matching your search.' : 'No approved comics available yet.'}
          </div>
        ) : (
          <ComicsGrid>
            {filteredComics.map(comic => (
              <ComicCard key={comic._id} onClick={() => navigate(`/comic/${comic._id}`)}>
                <ComicImage 
                  src={comic.coverImage || 'https://via.placeholder.com/200x250'} 
                  alt={comic.title} 
                />
                <ComicInfo>
                  <ComicTitle>{comic.title}</ComicTitle>
                  {comic.author && <div style={{ color: '#888', fontSize: '0.9rem' }}>by {comic.author}</div>}
                </ComicInfo>
              </ComicCard>
            ))}
          </ComicsGrid>
        )}
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>About ComicZone</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Help</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Community</h3>
            <ul>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Connect With Us</h3>
            <SocialLinks>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Discord">💬</a>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
      </Footer>
    </DashboardContainer>
  );
};

export default UserDashboard; 