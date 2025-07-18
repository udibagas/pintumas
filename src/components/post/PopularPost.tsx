import { Divider, Space, Typography, List, Image } from "antd";
const { Text } = Typography;
import { CommentOutlined, EyeOutlined, FireOutlined, LikeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PostWithRelations } from "@/types";
import { getItems } from "@/lib/api-client";
import Link from "next/link";

export default function PopularPost() {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);

  useEffect(() => {
    getItems<PostWithRelations[]>("/api/posts/trending")
      .then((data) => { setPosts(data); })
      .catch((error) => { console.error("Error fetching trending posts:", error); });
  }, []);

  return (
    <>
      <Divider orientation="left">
        <Space>
          <FireOutlined />
          <Text strong>Trending</Text>
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
                  <EyeOutlined />
                  <span className="ml-2">{post.viewCount || 0}</span>
                  <Divider type="vertical" />
                  <LikeOutlined />
                  <span className="ml-2">{post.likeCount || 0}</span>
                  <Divider type="vertical" />
                  <CommentOutlined />
                  <span className="ml-2">{post.commentCount || 0}</span>
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
  );
}