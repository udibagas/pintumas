'use client';

import { Typography, Space, Divider, Image, List } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { PostWithRelations } from '@/types';
import { getItems } from '@/lib/api-client';
import Link from 'next/link';
import moment from 'moment';
const { Text } = Typography;

export default function RelatedPost({ postId }: { postId: number }) {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);

  useEffect(() => {
    getItems<PostWithRelations[]>(`/api/posts/related/${postId}`)
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching featured posts:", error);
      });
  }, [postId]);

  return (
    <>
      <Divider orientation="left">
        <Space>
          <LinkOutlined />
          <Text strong>Berita Terkait</Text>
        </Space>
      </Divider>

      <List
        itemLayout="vertical"
        size="small"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            extra={<Image
              preview={false}
              width={150}
              alt={post.title}
              src={post.PostMedia?.[0].media.url}
              fallback={`https://picsum.photos/150/150?random=${post.id}`}
              className="rounded object-cover"
            />}
          >
            <List.Item.Meta
              title={<Link href={`/posts/${post.slug}`} className="line-clamp-1">{post.title}</Link>}
              description={(
                <>
                  {moment(post.publishedAt).format('DD-MMM-YY HH:mm')}
                </>
              )}
            />
            <div className="line-clamp-2">
              {post.excerpt}
            </div>
          </List.Item>
        )}
      />
    </>
  )
}