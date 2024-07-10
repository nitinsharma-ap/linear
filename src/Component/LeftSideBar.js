import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, UsergroupAddOutlined, CheckCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Switch, Button } from 'antd';
import useDarkMode from '../Dark/useDarkMode';
import { useDispatch } from 'react-redux';
import './leftSide.css';
import { fetchTasksRequest } from '../Redux/Action/action';
import { FaUserCircle } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

import { RiLogoutCircleLine } from "react-icons/ri";
import { CgDarkMode } from "react-icons/cg";

function LeftSideBar({ userVal, onFilterChange,isMenuVisible2 ,onFilterChangeCallback, showHeader }) {
  const [theme, toggleTheme] = useDarkMode("");
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  const items = [
    {
      key: 'home',
      label: 'Home',
      icon: <UserOutlined />,
    },
    {
      key: 'my_issues',
      label: 'My Issues',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: <CheckCircleOutlined />,
    },

    {
      key: 'users',
      label: 'Users',
      icon: <UsergroupAddOutlined />,
    },
    {
      key: 'support',
      label: 'Support',
      icon: <MdSupportAgent />,
    },

  ];

  const onClick = (e) => {
    setCurrent(e.key);
    if (onFilterChange) {
      onFilterChange(e.key);
    }
    if (onFilterChangeCallback) {
      onFilterChangeCallback();
      showHeader()
    }
  };

  return (
    <div className={`Main ${theme}-theme`}>
      {isMenuVisible2 && (
        <div className='dropdown-2'>
          <div className='list'>
        <div className='userSection'>
          <div className='userPhoto'>
            <div className='icon'>
            <FaUserCircle className='userIcon' />
            </div>
            <div className='username'>
              {(userVal.name || `${userVal.FirstName} ${userVal.LastName}`).toUpperCase()}
            </div>
          </div>
          <div className='dark-mode'>

          <div className='Dark'>
            <div>
          <CgDarkMode className='d1' />
          </div>
          <div>

          <p>Dark Mode </p>
          </div>
          </div>
          <div>
        <Switch
          size='small'
          checked={theme === 'dark'}
          className='switch'
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        </div>
        </div>



        <br />

        <Menu
          className='dark'
          theme={theme === 'dark' ? 'dark' : 'light'}
          onClick={onClick}
          // style={{ width: 256 }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />

      </div>
    </div>
        </div>
      )}
      <div className='list'>
        <div className='userSection'>
          <div className='userPhoto'>
            <div className='icon'>
            <FaUserCircle className='userIcon' />
            </div>
            <div className='username'>
              {(userVal.name || `${userVal.FirstName} ${userVal.LastName}`).toUpperCase()}
            </div>
          </div>
          <div className='dark-mode'>

          <div className='Dark'>
            <div>
          <CgDarkMode className='d1' />
          </div>
          <div>

          <p>Dark Mode </p>
          </div>
          </div>
          <div>
        <Switch
          checked={theme === 'dark'}
          className='switch'
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        </div>
        </div>



        <br />

        <Menu
          className='dark'
          theme={theme === 'dark' ? 'dark' : 'light'}
          onClick={onClick}
          // style={{ width: 256 }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />

      </div>
    </div>
    </div>
  );
}

export default LeftSideBar;


