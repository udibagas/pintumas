"use client";

import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Modal } from 'antd';
import NavMenu from '@/components/nav-menu';
import client from '@/lib/api-client';
import { redirect } from 'next/navigation';

const { Header, Content, Sider } = Layout;

export default function MainLayout({ children }: React.PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);

  function logout() {
    Modal.confirm({
      title: 'Konfrimasi',
      content: 'Anda yakin akan keluar?',
      centered: true,
      icon: <LogoutOutlined />,
      okText: 'Ya',
      cancelText: 'Tidak',
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
            <Button type='text'>
              <Avatar size='small' icon={<UserOutlined />} />
              <span>{`Admin User`}</span>
            </Button>
          </Dropdown>
        </Header>

        <Content className='m-4'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};