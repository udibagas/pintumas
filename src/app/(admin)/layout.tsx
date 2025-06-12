"use client";

import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout, Modal, Space, theme, Typography } from 'antd';
import NavMenu from '@/components/nav-menu';
import client from '@/lib/api-client';
import { redirect } from 'next/navigation';

const { Text } = Typography;
const { Header, Content, Sider } = Layout;

export default function MainLayout({ children }: React.PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function logout() {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Are you sure you want to logout?',
      icon: <LogoutOutlined />,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        client.post('/auth/logout').then(() => {
          redirect('/login');
        });
      },
    })
  }

  const menuItems: MenuProps['items'] = [
    { key: "profile", label: 'Profile', icon: <UserOutlined />, onClick: () => redirect('/profile') },
    { key: "logout", label: 'Logout', icon: <LogoutOutlined />, onClick: logout },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{
          width: collapsed ? "40px" : "80px",
          height: collapsed ? "40px" : "80px",
          margin: "20px auto",
          backgroundColor: "aliceblue",
          borderRadius: "50%",
          textAlign: "center",
          lineHeight: collapsed ? "40px" : "80px",
          fontSize: collapsed ? "1.5rem" : "3rem",
          color: "black",
        }}>
          {/* {user?.name[0]} */}
          A
        </div>

        <NavMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 20px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, color: '#0C74B6', fontWeight: 'bold' }}>PINTUMAS</div>
          <Dropdown menu={{ items: menuItems }} placement="bottom" arrow>
            <Space>
              <Avatar style={{ backgroundColor: '#87d068' }} size={25} icon={<UserOutlined />} />
              <Text strong>Selamat Datang, {`Admin User`}!</Text>
            </Space>
          </Dropdown>
        </Header>

        <Content className='m-4'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};