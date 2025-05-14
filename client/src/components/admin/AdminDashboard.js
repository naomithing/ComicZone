import React from 'react';
import {
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  RecentComicsSection,
  ComicsTable,
  TableHeader,
  TableRow,
  StatusBadge,
  PageTitle,
  Subtitle
} from './AdminStyles';

const AdminDashboard = () => {
  const stats = {
    users: {
      total: 1249,
      newThisMonth: 49
    },
    comics: {
      total: 382,
      newThisMonth: 18
    },
    pendingReviews: {
      total: 57,
      message: 'Needs your attention'
    },
    popularGenre: {
      name: 'Fantasy',
      message: 'Based on user engagement'
    }
  };

  const recentComics = [
    { title: 'Dragon Slayer Chronicles', author: 'Jane Doe', status: 'published' },
    { title: 'Moonlight Shadows', author: 'John Smith', status: 'pending' },
    { title: 'Urban Tales', author: 'Alice Williams', status: 'published' },
    { title: 'Cosmic Adventures', author: 'Bob Johnson', status: 'pending' }
  ];

  return (
    <>
      <PageTitle>Admin Dashboard</PageTitle>
      <Subtitle>Welcome to your Comic Control Panel</Subtitle>

      <StatsGrid>
        <StatCard>
          <div className="icon user">👥</div>
          <div>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{stats.users.total}</StatNumber>
            <div className="subtitle">+{stats.users.newThisMonth} new users this month</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon comic">📚</div>
          <div>
            <StatLabel>Total Comics</StatLabel>
            <StatNumber>{stats.comics.total}</StatNumber>
            <div className="subtitle">+{stats.comics.newThisMonth} new comics this month</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon review">⭐</div>
          <div>
            <StatLabel>Pending Reviews</StatLabel>
            <StatNumber>{stats.pendingReviews.total}</StatNumber>
            <div className="subtitle">{stats.pendingReviews.message}</div>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon genre">📊</div>
          <div>
            <StatLabel>Popular Genre</StatLabel>
            <StatNumber>{stats.popularGenre.name}</StatNumber>
            <div className="subtitle">{stats.popularGenre.message}</div>
          </div>
        </StatCard>
      </StatsGrid>

      <RecentComicsSection>
        <h2>Recent Comics</h2>
        <ComicsTable>
          <thead>
            <TableHeader>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
            </TableHeader>
          </thead>
          <tbody>
            {recentComics.map((comic, index) => (
              <TableRow key={index}>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>
                  <StatusBadge status={comic.status}>
                    {comic.status}
                  </StatusBadge>
                </td>
              </TableRow>
            ))}
          </tbody>
        </ComicsTable>
      </RecentComicsSection>
    </>
  );
};

export default AdminDashboard; 