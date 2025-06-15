'use client';

import { getItems } from "@/lib/api-client";
import { PostWithRelations } from "@/types";
import { Divider, Image, Space, Typography } from "antd";
import { useEffect, useState } from "react";
const { Text } = Typography;
import { ClockCircleOutlined } from "@ant-design/icons";

export default function LatestNews() {
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
    <section>
      <Divider orientation="left">
        <Space>
          <ClockCircleOutlined />
          <Text strong>Berita Terkini</Text>
        </Space>
      </Divider>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map(i => (
          <div key={i.id} className="bg-white rounded shadow p-4 flex gap-4">
            <Image
              src={i.PostMedia?.[0].media.url ?? `https://picsum.photos/600/400?random=${i.id}`}
              preview={false}
              alt={i.title}
              className="object-cover rounded"
            />
            <div>
              <h3 className="font-semibold line-clamp-1">{i.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{i.excerpt}</p>
              <a href={`/posts/${i.slug}`} className="text-yellow-600 text-xs hover:underline">Selengkapnya</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}