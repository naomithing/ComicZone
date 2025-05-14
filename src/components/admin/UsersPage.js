import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  PageTitle,
  Subtitle,
  SearchInput,
  UsersTable,
  UsersTableHeader,
  UsersTableRow,
  RoleBadge,
  ActionButton
} from './AdminStyles';
import api from "../../services/api"

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        // Set empty array if API call fails
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBanUser = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}/ban`);
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, role: 'banned' } : user
      );
      setUsers(updatedUsers);
      console.log('Banned user:', userId);
    } catch (err) {
      console.error('Error banning user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId));
      console.log('Deleted user:', userId);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Users</PageTitle>
          <Subtitle>Manage user accounts</Subtitle>
        </div>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </PageHeader>

      <UsersTable>
        <thead>
          <UsersTableHeader>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </UsersTableHeader>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <UsersTableRow key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <RoleBadge role={user.role}>
                  {user.role}
                </RoleBadge>
              </td>
              <td>
                <ActionButton warning onClick={() => handleBanUser(user._id)}>
                  Ban
                </ActionButton>
                <ActionButton danger onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </ActionButton>
              </td>
            </UsersTableRow>
          ))}
        </tbody>
      </UsersTable>
    </>
  );
};

export default UsersPage; 
