import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const SiderBar = ({ ...props }) => {
  
  return (
    <Menu
      mode="inline"
    >
      <Menu.Item key={'home'}>
        <Link to={'/home'}>
          Home Page
        </Link>
      </Menu.Item>
      <Menu.Item key={'chat'}>
        <Link to={'/chat'}>
          Chat Page
        </Link>
      </Menu.Item>
      <Menu.Item key={'about'}>
        <Link to={'/about'}>
          About Page
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
