'use client';

import { Layout } from 'antd';
import LatestPost from '@/components/post/LatestPost';
import FeaturedPost from '@/components/post/FeaturedPost';
import PopularPost from '@/components/post/PopularPost';
import Categories from '@/components/post/Categories';

const { Content } = Layout;

export default function HomePage() {
  return (
    <Content style={{ padding: '0 50px' }}>
      <div style={{ margin: '24px 0' }}>
        <FeaturedPost />
      </div>

      <LatestPost />
      <PopularPost />
      <Categories />
    </Content>
  );
}