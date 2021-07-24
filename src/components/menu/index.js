import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const SiderBar = ({ ...props }) => {
  
  return (
    <Menu
      mode="inline"
    >
      {window.localStorage.getItem('role') == 'student' &&
      <Menu.Item key={'home'}>
        <Link to={`/${window.localStorage.getItem('role')}/dashboard`}>
          Dashboard
        </Link>
      </Menu.Item>
      }
      <Menu.Item key={'about'}>
        <Link to={`/${window.localStorage.getItem('role')}/schedule`}>
          Schedule
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
