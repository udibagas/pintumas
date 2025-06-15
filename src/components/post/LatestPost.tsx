'use client';

import { Row, Col, Card, Typography, Space, Divider, Image } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { PostWithRelations } from '@/types';
import { getItems } from '@/lib/api-client';
import { redirect } from 'next/navigation';
import moment from 'moment';
const { Text } = Typography;

export default function LatestPost() {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);

  useEffect(() => {
    getItems<PostWithRelations[]>("/api/posts/latest")
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching featured posts:", error);
      });
  }, []);

  return (
    <>
      <Divider orientation="left">
        <Space>
          <ClockCircleOutlined />
          <Text strong>Berita Terkini</Text>
        </Space>
      </Divider>

      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={24} sm={12} md={12} key={post.id}>
            <Card hoverable onClick={() => redirect(`/posts/${post.slug}`)}>
              <Card.Meta
                avatar={
                  <Image
                    preview={false}
                    alt={post.title}
                    src={post.PostMedia?.[0]?.media?.url ?? `https://picsum.photos/150/150?random=${post.id}`}
                    width={150}
                    className='rounded object-cover'
                  />
                }
                title={<div className='line-clamp-1'>{post.title}</div>}
                description={<>
                  <div className='line-clamp-2'>{post.excerpt}</div>
                  <div className='text-xs mt-1'>
                    {post.category.name}
                    <Divider type='vertical' />
                    {moment(post.publishedAt).format('DD-MMM-YY HH:mm')}
                  </div>
                </>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}