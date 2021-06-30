import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {Dropdown, Layout, Button, Menu, Typography} from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import SiderBar from '../components/menu'

const MainLayout = ({ children, ...props }) => {

  
  const [collapsed, setCollapsed] = useState(false)

  const { Header, Content, Sider } = Layout;

  const { Text } = Typography

  const username = "Bobby"

  const handleLogout = () => {
    console.log("LOGOUT")
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => handleLogout()} style={{textAlign:"center"}} icon={<LogoutOutlined />}>
        <Link to="login">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="main-layout">
      <Header 
        className='layout-header'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button onClick={()=> setCollapsed(!collapsed)}>
        { collapsed?
          <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
        }
        </Button>
        <Dropdown overlay={menu}>
          <Text style={{color: 'white'}}>
            <UserOutlined style={{ marginRight: '5px', fontSize: '16px', color: 'white' }}/>
            {username}
          </Text>
        </Dropdown>
      </Header>
      <Layout>
        <Sider className="sider-bar"
          width={256}
          collapsible
          collapsed={collapsed}
          trigger={null}
          collapsedWidth={0}
        >
          <SiderBar/>
        </Sider>
        <Content className='layout-content'>
            {children}
        </Content>
      </Layout>
    </Layout>
  )
};

export default MainLayout