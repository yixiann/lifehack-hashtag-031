import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const SiderBar = ({ ...props }) => {
  
  return (
    <Menu
      mode="inline"
    >
      <Menu.Item key={'home'}>
        <Link to={`/${window.localStorage.getItem('role')}/dashboard`}>
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key={'chat'}>
        <Link to={`/${window.localStorage.getItem('role')}/chat`}>
          Chat
        </Link>
      </Menu.Item>
      <Menu.Item key={'about'}>
        <Link to={`/${window.localStorage.getItem('role')}/about`}>
          About
        </Link>
      </Menu.Item>
      <Menu.Item key={'lessondata'}>
        <Link to={'/lessondata'}>
          Lesson Data Dashboard
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default SiderBar
