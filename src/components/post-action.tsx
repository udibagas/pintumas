'use client';

import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import LikeButton from "./like-button";
import ShareButton from "./share-button";
import { Post } from "@prisma/client";
import { Button, Divider } from "antd";

export default function PostAction({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2">
      <Button type="text">
        <span className="text-2xl">
          <EyeOutlined /> {post.viewCount ?? '0'}
        </span>
      </Button>

      <Divider type="vertical" />
      <Button type="text" title="Komentar">
        <span className="text-2xl">
          <CommentOutlined /> {post.commentCount ?? '0'}
        </span>
      </Button>

      <Divider type="vertical" />
      <LikeButton post={post} />

      <Divider type="vertical" />
      <ShareButton post={post} />
    </div>
  )
}