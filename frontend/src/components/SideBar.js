import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  HomeOutlined,
  SearchOutlined,
  TableOutlined,
  LaptopOutlined,
  MessageOutlined,
  SmileOutlined,
  RightOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Drawer, Button, Layout } from 'antd'

const { Content } = Layout

const SideBar = ({ visible, onClose }) => {
  // Redux State
  const user = useSelector((state) => state.user)

  const location = useLocation()
  const selectedKeys = location.pathname.split('/').slice(1)
  //Drawer
  const [isDrawerVisible, setIsDrawerVisible] = useState(true)
  const handleCloseDrawer = () => {
    setIsDrawerVisible(false)
  }
  const showDrawer = () => {
    setIsDrawerVisible(true)
  }

  return (
    <>
      <div>
        {!isDrawerVisible && (
          <RightOutlined
            style={{
              position: 'fixed',
              zIndex: 99998,
              top: '50%',
              left: '0',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#fff',
              background: '#1890ff',
              padding: '0.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            }}
            onClick={showDrawer}
          />
        )}
      </div>
      <Drawer
        placement='left'
        width={300}
        closable={true}
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
        style={{ zIndex: 99999 }}
      >
        {/* First Stake Holder */}
        {user.role === 'user' && (
          <Content>
            <Menu
              mode='inline'
              selectedKeys={selectedKeys}
              defaultOpenKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item
                key='home'
                icon={<HomeOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user'>Home</Link>
              </Menu.Item>
              <Menu.Item
                key='jobs'
                icon={<SearchOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/jobs'>Jobs</Link>
              </Menu.Item>

              <Menu.Item
                key='alex'
                icon={<SmileOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/companies'>Companies</Link>
              </Menu.Item>
              <Menu.Item
                key='compare'
                icon={<TableOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/compare'>Compare</Link>
              </Menu.Item>

              <Menu.Item
                key='users'
                icon={<UsergroupAddOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/users'>Users</Link>
              </Menu.Item>
              <Menu.Item
                key='chat'
                icon={<MessageOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/chat'>Chat</Link>
              </Menu.Item>
              <Menu.Item
                key='logout'
                icon={<LaptopOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/logout'>Logout</Link>
              </Menu.Item>
            </Menu>
          </Content>
        )}

        {/* Second Stake Holder */}
        {user.role === 'company' && (
          <Content>
            <Menu
              mode='inline'
              selectedKeys={selectedKeys}
              defaultOpenKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item
                key='home'
                icon={<HomeOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user'>Home</Link>
              </Menu.Item>
              <Menu.Item
                key='jobs'
                icon={<SearchOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/company/postJob'>Post Jobs</Link>
              </Menu.Item>
              <Menu.Item
                key='users'
                icon={<UsergroupAddOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/users'>Users</Link>
              </Menu.Item>
              <Menu.Item
                key='chat'
                icon={<MessageOutlined />}
                onClick={handleCloseDrawer}
              >
                <Link to='/user/chat'>Chat</Link>
              </Menu.Item>
            </Menu>
          </Content>
        )}
      </Drawer>
    </>
  )
}

export default SideBar
