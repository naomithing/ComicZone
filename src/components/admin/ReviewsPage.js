import React, { useState } from 'react';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable as ReviewsTable,
  UsersTableHeader as ReviewsTableHeader,
  UsersTableRow as ReviewsTableRow,
  ActionButton,
  RatingStars
} from './AdminStyles';

const ReviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      comicTitle: 'Dragon Slayer Chronicles',
      reviewer: 'John Smith',
      email: 'john@example.com',
      rating: 5,
      comment: 'Amazing storyline and character development! Can\'t wait for the next chapter.',
      date: '2024-02-15'
    },
    {
      id: 2,
      comicTitle: 'Urban Tales',
      reviewer: 'Emma Davis',
      email: 'emma@example.com',
      rating: 4,
      comment: 'Great art style, but the pacing could be better.',
      date: '2024-02-14'
    },
    {
      id: 3,
      comicTitle: 'Space Warriors',
      reviewer: 'Mike Wilson',
      email: 'mike@example.com',
      rating: 3,
      comment: 'Interesting concept but needs more world-building.',
      date: '2024-02-14'
    },
    {
      id: 4,
      comicTitle: 'Mystic Academy',
      reviewer: 'Sarah Lee',
      email: 'sarah@example.com',
      rating: 5,
      comment: 'Perfect blend of magic and school life! Love every chapter.',
      date: '2024-02-13'
    },
    {
      id: 5,
      comicTitle: 'Cyber Detective',
      reviewer: 'Alex Turner',
      email: 'alex@example.com',
      rating: 4,
      comment: 'Engaging mystery with great cyberpunk elements.',
      date: '2024-02-13'
    }
  ];

  const filteredReviews = reviews.filter(review => 
    review.comicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteReview = (reviewId) => {
    console.log('Deleting review:', reviewId);
    // TODO: Implement actual delete functionality
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Reviews</PageTitle>
          <Subtitle>Manage user reviews and ratings</Subtitle>
        </div>
        <SearchInput
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </PageHeader>

      <ReviewsTable>
        <thead>
          <ReviewsTableHeader>
            <th>COMIC</th>
            <th>REVIEWER</th>
            <th>RATING</th>
            <th>COMMENT</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </ReviewsTableHeader>
        </thead>
        <tbody>
          {filteredReviews.map(review => (
            <ReviewsTableRow key={review.id}>
              <td>{review.comicTitle}</td>
              <td>
                <div>{review.reviewer}</div>
                <div className="email">{review.email}</div>
              </td>
              <td>
                <RatingStars rating={review.rating} />
              </td>
              <td>
                <div className="comment">{review.comment}</div>
              </td>
              <td>{new Date(review.date).toLocaleDateString()}</td>
              <td>
                <ActionButton danger onClick={() => handleDeleteReview(review.id)}>
                  Delete
                </ActionButton>
              </td>
            </ReviewsTableRow>
          ))}
        </tbody>
      </ReviewsTable>
    </>
  );
};

export default ReviewsPage; 