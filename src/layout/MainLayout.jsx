import React, { useState } from 'react';
import {Dropdown, Layout, Button, Select, Breadcrumb, Menu } from 'antd';
import { GlobalOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import SiderBar from '../components/menu'

const MainLayout = ({ children, ...props }) => {

  
  const [collapsed, setCollapsed] = useState(false)

  const { Header, Content, Footer, Sider } = Layout;

  const {Option} = Select;

  return (
    <Layout className="main-layout">
      <Header className='layout-header'>
        <Button onClick={()=> setCollapsed(!collapsed)}>
        { collapsed?
          <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
        }
        </Button>
        <Dropdown>
          <a className="ant-dropdown-link" style={{color: 'black', fontSize: '16px', marginRight: '20px'}} onClick={e => e.preventDefault()}>
            <UserOutlined style={{ marginRight: '5px', fontSize: '16px', color: 'black' }}/>
              {"BOBBY"}
          </a>
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