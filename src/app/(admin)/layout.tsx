"use client";

import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Image, Layout, Modal } from 'antd';
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
      <Header className='flex justify-between py-4 items-center shadow'>
        <div className='flex items-center gap-2 text-lg font-semibold'>
          <Image
            preview={false}
            src='/pintumas.png'
            alt='Logo'
            width={25}
          />
          <span className='text-[#E6DABA]'>PINTUMAS</span>
        </div>
        <Dropdown menu={{ items: menuItems }} placement="bottom" arrow>
          <Button type='text'>
            <Avatar size='small' icon={<UserOutlined />} style={{ background: '#E6DABA' }} />
            <span className='text-[#E6DABA]'>{`Admin User`}</span>
          </Button>
        </Dropdown>
      </Header>

      <Layout>
        <Sider
          theme='light'
          width={220}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <NavMenu />
        </Sider>
        <Content className='m-4'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};