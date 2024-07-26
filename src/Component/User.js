
import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import './user.css';

const { Search } = Input;

const UserTable = ({ users, theme }) => {
  // console.log("++",users);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(users); // State to hold filtered users

  // Function to handle search
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reset to first page on search
    filterUsers(value); // Filter users based on search text
  };

  // Function to filter users based on search text
  const filterUsers = (value) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Function to handle table pagination change
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  // Effect to reset filtered users when search text is empty
  useEffect(() => {
    if (searchText === '') {
      setFilteredUsers(users);
      setCurrentPage(1); // Reset to first page when search text is empty
    }
  }, [searchText, users]);

  // Table columns definition
  const columns = [
     {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
               title: 'Email',
               dataIndex: 'email',
               key: 'email',
             },
              {
               title: 'Password',
               dataIndex: 'password',
               key: 'password',
             },
             {
               title: 'Position',
               dataIndex: 'position',
               key: '',
             },
  ];

  return (
    <div className={`user-table-container ${theme}-theme`}> {/* Add theme class dynamically */}
    <div className='u'>
    <h3>Users</h3>
      <Search
        placeholder="Search users"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)} // Handle input change
        enterButton
        className="search-bar"
        value={searchText} // Controlled input
      />
    </div>

      <Table
        className="custom-table"
        columns={columns}
        dataSource={filteredUsers}
        pagination={{ current: currentPage, pageSize:8}}
        onChange={handleTableChange}
        rowKey="id"
      />
    </div>
  );
};

export default UserTable;
