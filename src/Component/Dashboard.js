
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Spin } from 'antd';
import { MenuFoldOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import LeftSideBar from './LeftSideBar';
import RightSide from './RightSide';
import NewTask from './newTask';
import logo from '../image/logo.png';
import { Header } from 'antd/es/layout/layout';
import { fetchUsersRequest, logoutRequest, showData } from "../Redux/Action/action";
import { fetchTasksRequest, addTask, editTask } from '../Redux/Action/action';
import { IoGridOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from 'axios';

const { Search } = Input;

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isSearch, setIsSearch] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [localTasks, setLocalTasks] = useState([]);


  const usersVal = useSelector((state) => state.tasksReducer.users) || [];
  const users =  usersVal.users;
  console.log("nitinUsers===>",users,usersVal);
  
  const tasks  = useSelector((state) => state.tasksReducer.tasks);
  

  console.log("tasks====>",tasks);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      
      dispatch(showData())
     
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setLocalTasks(tasks);  // Sync local tasks with Redux state
  }, [tasks]);
  
  useEffect(()=>{
    dispatch( fetchUsersRequest());
  },[dispatch])


  const userVal1 = JSON.parse(localStorage.getItem('user'));
  console.log("userVal====>",userVal1.name);
  const userVal = userVal1.user?.name ?? userVal1.name;

  const handleLogout = async () => {
    // await Promise.resolve();
    dispatch(logoutRequest(() => {
      // Navigate after success
      navigate('/');
    }))
    // localStorage.removeItem('token');
    // navigate('/');
  };

  const handleClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
    setIsMenuVisible(false);
    // dispatch( fetchUsersRequest());
    
  };
  const handleOk = (newTask) => {
    const updatedTasks = [...localTasks, { ...newTask, key: tasks.length }];
    
    // Update the local tasks array
    // setLocalTasks(updatedTasks);
  
    // Dispatch Redux action to save it globally
    dispatch(addTask({ ...newTask, key: tasks.length }));
  
    setIsModalOpen(false);
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    console.log(value);
    setSearchQuery(value);
  };

  const handleFilterChange = (newFilter) => {
    console.log("nishN=>", newFilter);
    setFilter(newFilter);
    setSelectedTask(null);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    setIsMenuVisible(false);
  };

  const hideHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  const showHeader = () => {
    setIsHeaderVisible(true);
  };

  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClickSearch = () => {
    setIsSearch(!isSearch);
  };

  return (
    <div className={`main1 ${viewMode === 'list' ? 'list-view' : ''}`}>
      {isHeaderVisible && (
        <Header className='header'>
          <div className='logo-1'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <h2>Task!</h2>
            </div>
            {filter === "users" || filter === "support" ? "" :
              <div className={isSearch ? 'search-default' : 'Search-1'}>
                <Search
                  placeholder="Search"
                  onSearch={handleSearch}
                  enterButton
                  className='search-11'
                />
              </div>
            }
          </div>

          <div className='search-2'>
            <SearchOutlined onClick={handleClickSearch} />
          </div>
          <div className='menu-1'>
            <MenuFoldOutlined onClick={handleMenu} />
          </div>
          {isMenuVisible && (
            <div className='dropDown'>
              <Button icon={<PlusOutlined />} type='primary' onClick={handleClick}>
                Add task
              </Button>
              <Button icon={<RiLogoutCircleLine />} type='primary' onClick={handleLogout}>
                Log Out
              </Button>
              <Button icon={<IoGridOutline />} type='primary' onClick={() => toggleViewMode('grid')}>Grid View </Button>
              <Button icon={<CiCircleList />} type='primary'
                onClick={() => toggleViewMode('list')}> List View</Button>
            </div>
          )}

          <div className='header-right'>
            {filter === "users" || filter === "support" ? "" :
              <div className='Chota'>
                <IoGridOutline
                  className={viewMode === 'grid' ? 'active-icon' : 'inactive-icon'}
                  onClick={() => toggleViewMode('grid')}
                />
                <CiCircleList
                  className={viewMode === 'list' ? 'active-icon' : 'inactive-icon'}
                  onClick={() => toggleViewMode('list')}
                />
              </div>
            }
            <div className='addButton'>
              <Button type='primary' onClick={handleClick}>
                <PlusOutlined /> Add New task
              </Button>
              <Button type='primary' onClick={handleLogout}>
                <RiLogoutCircleLine className='circle' />
                Log Out
              </Button>
            </div>
          </div>
        </Header>
      )}
      {loading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className='dashboard'>
          <LeftSideBar
            userVal={userVal}
            onFilterChange={handleFilterChange}
            onFilterChangeCallback={() => setSelectedTask(null)}
            showHeader={showHeader}
          />
          <NewTask
            users={users}
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            editingTask={editingTask}
          />
          <RightSide
            tasks={localTasks ? localTasks : tasks}
            filter={filter}
            searchQuery={searchQuery}
            viewMode={viewMode}
            users={users}
            hideHeader={hideHeader}
            showHeader={showHeader}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

