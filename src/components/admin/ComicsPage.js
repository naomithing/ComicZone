import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable as ComicsTable,
  UsersTableHeader as ComicsTableHeader,
  UsersTableRow as ComicsTableRow,
  ActionButton,
  StatusBadge,
  GenreTag,
  GenresList,
  UploadButton,
  UploaderInfo
} from './AdminStyles';
import AdminUploadForm from './AdminUploadForm';
import api from "../../services/api"

const ComicsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const fetchComics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/comics');
      setComics(res.data);
    } catch (error) {
      console.error('Failed to fetch comics:', error);
      setComics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  const filteredComics = comics.filter(comic => {
    if (!comic) return false;
    
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = comic.title?.toLowerCase().includes(searchLower) || false;
    const authorMatch = comic.author?.toLowerCase().includes(searchLower) || false;
    const genreMatch = comic.genres?.some(genre => 
      genre?.toLowerCase().includes(searchLower)
    ) || false;

    return titleMatch || authorMatch || genreMatch;
  });

  const handleApprove = async (comicId) => {
    try {
      setLoading(true);
      await api.patch(`/admin/comics/${comicId}/approve`);
      // Update local state immediately for better UX
      setComics(comics.map(comic => 
        comic._id === comicId ? { ...comic, status: 'approved' } : comic
      ));
    } catch (error) {
      console.error('Approve failed:', error);
      alert('Failed to approve comic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (comicId) => {
    try {
      setLoading(true);
      await api.patch(`/admin/comics/${comicId}/reject`);
      // Update local state immediately for better UX
      setComics(comics.map(comic => 
        comic._id === comicId ? { ...comic, status: 'rejected' } : comic
      ));
    } catch (error) {
      console.error('Reject failed:', error);
      alert('Failed to reject comic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const handleUploadSuccess = (newComic) => {
    // Add the new comic to the list with approved status
    setComics(prev => [{
      ...newComic,
      status: 'approved',
      isAdminUpload: true,
      uploadedBy: {
        ...newComic.uploadedBy,
        isAdmin: true
      }
    }, ...prev]);
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Comics</PageTitle>
          <Subtitle>Manage comics and upload new content</Subtitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UploadButton onClick={() => setShowUploadForm(true)}>
            Upload New Comic
          </UploadButton>
          <SearchInput
            type="text"
            placeholder="Search comics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </div>
      </PageHeader>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading comics...</div>
      ) : filteredComics.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {searchQuery ? 'No comics found matching your search.' : 'No comics available.'}
        </div>
      ) : (
        <ComicsTable>
          <thead>
            <ComicsTableHeader>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>GENRES</th>
              <th>UPLOADER</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </ComicsTableHeader>
          </thead>
          <tbody>
            {filteredComics.map(comic => (
              <ComicsTableRow key={comic._id}>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  <GenresList>
                    {comic.genres?.map((genre, index) => (
                      <GenreTag key={index}>{genre}</GenreTag>
                    ))}
                  </GenresList>
                </td>
                <td>
                  <UploaderInfo>
                    <div className="username">{comic.uploadedBy?.username || 'Unknown'}</div>
                    <div className="role">{comic.isAdminUpload ? 'Admin' : 'User'}</div>
                  </UploaderInfo>
                </td>
                <td>
                  <StatusBadge $status={getStatusColor(comic.status)}>
                    {getStatusLabel(comic.status)}
                  </StatusBadge>
                </td>
                <td>
                  {!comic.isAdminUpload && (
                    <>
                      <ActionButton 
                        success 
                        onClick={() => handleApprove(comic._id)}
                        disabled={loading || comic.status === 'approved'}
                        style={{ 
                          opacity: comic.status === 'approved' ? 0.5 : 1,
                          cursor: comic.status === 'approved' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Approve
                      </ActionButton>
                      <ActionButton 
                        danger 
                        onClick={() => handleReject(comic._id)}
                        disabled={loading || comic.status === 'rejected'}
                        style={{ 
                          opacity: comic.status === 'rejected' ? 0.5 : 1,
                          cursor: comic.status === 'rejected' ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Reject
                      </ActionButton>
                    </>
                  )}
                  {comic.isAdminUpload && (
                    <StatusBadge $status="info">Admin Upload</StatusBadge>
                  )}
                </td>
              </ComicsTableRow>
            ))}
          </tbody>
        </ComicsTable>
      )}

      {showUploadForm && (
        <AdminUploadForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </>
  );
};

export default ComicsPage;
