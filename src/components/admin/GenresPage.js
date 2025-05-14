import React, { useState } from 'react';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable as GenresTable,
  UsersTableHeader as GenresTableHeader,
  UsersTableRow as GenresTableRow,
  ActionButton,
  EditInput,
  ConfirmationModal,
  ModalContent,
  ModalActions,
  CountBadge
} from './AdminStyles';

const GenresPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);

  // Mock genres data
  const [genres, setGenres] = useState([
    { id: 1, name: 'Action', comicCount: 45 },
    { id: 2, name: 'Fantasy', comicCount: 62 },
    { id: 3, name: 'Romance', comicCount: 38 },
    { id: 4, name: 'Sci-Fi', comicCount: 29 },
    { id: 5, name: 'Horror', comicCount: 15 },
    { id: 6, name: 'Comedy', comicCount: 51 },
    { id: 7, name: 'Drama', comicCount: 43 },
    { id: 8, name: 'Mystery', comicCount: 27 },
    { id: 9, name: 'Slice of Life', comicCount: 33 },
    { id: 10, name: 'Adventure', comicCount: 40 }
  ]);

  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (genre) => {
    setEditingId(genre.id);
    setEditValue(genre.name);
  };

  const handleSave = (id) => {
    console.log('Saving genre edit:', id, editValue);
    // TODO: Implement actual edit functionality
    setGenres(genres.map(genre => 
      genre.id === id ? { ...genre, name: editValue } : genre
    ));
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleDeleteClick = (genre) => {
    setGenreToDelete(genre);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting genre:', genreToDelete.id);
    // TODO: Implement actual delete functionality
    setGenres(genres.filter(genre => genre.id !== genreToDelete.id));
    setShowDeleteModal(false);
    setGenreToDelete(null);
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Genres</PageTitle>
          <Subtitle>Manage comic genres</Subtitle>
        </div>
        <SearchInput
          type="text"
          placeholder="Search genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </PageHeader>

      <GenresTable>
        <thead>
          <GenresTableHeader>
            <th>GENRE NAME</th>
            <th>COMICS</th>
            <th>ACTIONS</th>
          </GenresTableHeader>
        </thead>
        <tbody>
          {filteredGenres.map(genre => (
            <GenresTableRow key={genre.id}>
              <td>
                {editingId === genre.id ? (
                  <div className="edit-container">
                    <EditInput
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <ActionButton success onClick={() => handleSave(genre.id)}>
                      Save
                    </ActionButton>
                    <ActionButton warning onClick={handleCancelEdit}>
                      Cancel
                    </ActionButton>
                  </div>
                ) : (
                  genre.name
                )}
              </td>
              <td>
                <CountBadge>{genre.comicCount}</CountBadge>
              </td>
              <td>
                {editingId !== genre.id && (
                  <>
                    <ActionButton warning onClick={() => handleEdit(genre)}>
                      Edit
                    </ActionButton>
                    <ActionButton danger onClick={() => handleDeleteClick(genre)}>
                      Delete
                    </ActionButton>
                  </>
                )}
              </td>
            </GenresTableRow>
          ))}
        </tbody>
      </GenresTable>

      {showDeleteModal && (
        <ConfirmationModal>
          <ModalContent>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the genre "{genreToDelete?.name}"?</p>
            <p>This will affect {genreToDelete?.comicCount} comics.</p>
            <ModalActions>
              <ActionButton warning onClick={() => setShowDeleteModal(false)}>
                Cancel
              </ActionButton>
              <ActionButton danger onClick={handleConfirmDelete}>
                Delete
              </ActionButton>
            </ModalActions>
          </ModalContent>
        </ConfirmationModal>
      )}
    </>
  );
};

export default GenresPage; 