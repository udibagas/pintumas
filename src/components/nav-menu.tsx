'use client';

import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import {
  ApartmentOutlined,
  BarChartOutlined,
  CommentOutlined,
  FileDoneOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/admin">Dashboard</Link>, '/', <BarChartOutlined />),
  getItem(<Link href="/admin/posts">Post</Link>, '/admin/posts', <FileDoneOutlined />),
  getItem(<Link href="/admin/categories">Kategori</Link>, '/admin/categories', <TagsOutlined />),
  getItem(<Link href="/admin/comments">Komentar</Link>, '/admin/comments', <CommentOutlined />),
  getItem(<Link href="/admin/departments">Departemen</Link>, '/admin/departments', <ApartmentOutlined />),
  getItem(<Link href="/admin/users">Users</Link>, '/admin/users', <UserOutlined />),
];

export default function NavMenu() {
  const pathname = usePathname()
  const [selectedKey, setSelectedKeys] = useState(pathname);

  useEffect(() => {
    setSelectedKeys(pathname);
  }, [pathname]);

  return (
    <Menu
      theme="dark"
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
    />
  );
};