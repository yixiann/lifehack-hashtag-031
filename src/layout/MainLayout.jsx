import React, { useState, useContext, useEffect} from 'react';
import {Dropdown, Layout, Button, Menu, Typography} from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import SiderBar from '../components/menu'

const MainLayout = ({ children, authContext, ...props }) => {

  const [collapsed, setCollapsed] = useState(false)

  const { Header, Content, Sider } = Layout;

  const { Text } = Typography

  const [ username, setUsername ] = useState("")

  const useAuth = () => {
    return useContext(authContext);
  }

  var history = useHistory();
  var auth = useAuth();

  useEffect(()=>{
    if(username!==auth.user){
      setUsername(auth.user)
    }
  },[username, auth])

  const handleLogout = () => {
    auth.signout(() => history.push("/login"))
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('username', '')
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" style={{textAlign:"center"}} icon={<LogoutOutlined />}>
        <Button onClick={handleLogout}>Sign Out</Button>
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
          <Text style={{color: 'white', fontSize:'16px'}}>
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