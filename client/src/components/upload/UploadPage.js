import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UploadContainer = styled.div`
  margin-top: 80px; // To account for fixed navbar
  padding: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative; // Needed for absolute positioning of error message
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const HelperText = styled.small`
  color: ${props => props.theme.colors.text}99; // Slightly transparent text color
  font-size: 0.8rem;
  margin-top: -0.25rem; // Adjust spacing if needed
`;

const ErrorMessage = styled.span`
  color: #ff6b6b; // A suitable error color
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 173, 181, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 173, 181, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008c9e;
  }
`;

const FileInput = styled.input`
  &::file-selector-button {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1rem;
    font-family: ${props => props.theme.fonts.primary};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

const UploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genres: [],
    status: '',
    summary: '',
    coverImage: null,
    chapters: []
  });
  const [summaryError, setSummaryError] = useState(''); // State for summary validation error

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear summary error when user types in the summary field
    if (name === 'summary') {
      setSummaryError('');
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Handle single file for coverImage, multiple for chapters
    setFormData(prev => ({ ...prev, [name]: name === 'coverImage' ? files[0] : files }));
  };

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, genres: selectedOptions }));
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      alert('You must be logged in to upload a comic');
      navigate('/');
      return;
    }
    
    // Validate form data
    if (!formData.title || !formData.author || !formData.genres.length || !formData.status || !formData.summary || !formData.coverImage || !formData.chapters.length) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate summary length
    if (formData.summary.length < 100) {
      alert('Summary must be at least 100 characters long');
      return;
    }
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('status', formData.status);
    data.append('summary', formData.summary);
    data.append('uploadedBy', user._id);
  
    formData.genres.forEach(genre => data.append('genres', genre));
    data.append('coverImage', formData.coverImage);
    for (let i = 0; i < formData.chapters.length; i++) {
      data.append('chapters', formData.chapters[i]);
    }
  
    try {
      const response = await api.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        alert('Comic uploaded successfully!');
        // Optional: reset form
        setFormData({
          title: '',
          author: '',
          genres: [],
          status: '',
          summary: '',
          coverImage: null,
          chapters: []
        });
      } else {
        alert(response.data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <>
      <Navbar />
      <UploadContainer>
        <Title>Upload Comic</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Comic Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="author">Author Name</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="genres">Genres (Hold Ctrl/Cmd to select multiple)</Label>
            <Select
              id="genres"
              name="genres"
              multiple
              value={formData.genres}
              onChange={handleGenreChange}
              required
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="summary">Short Summary</Label>
            <HelperText>Minimum 100 words required.</HelperText>
            <TextArea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
            />
            {summaryError && <ErrorMessage>{summaryError}</ErrorMessage>} {/* Display error */}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="coverImage">Cover Image</Label>
            <FileInput
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="chapters">Upload Chapters</Label>
            <FileInput
              type="file"
              id="chapters"
              name="chapters"
              accept=".pdf,.zip,.cbz"
              multiple
              onChange={handleFileChange}
            />
          </FormGroup>

          <SubmitButton type="submit">Upload Comic</SubmitButton>
        </Form>
      </UploadContainer>
    </>
  );
};

export default UploadPage; 