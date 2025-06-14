'use client';

import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import LikeButton from "./like-button";
import ShareButton from "./share-button";
import { Post } from "@prisma/client";
import { Button, Divider } from "antd";

export default function PostAction({ post, setShowComments, showComments }: { post: Post, setShowComments: (show: boolean) => void, showComments: boolean }) {
  return (
    <div>
      <Button type="text" >
        <EyeOutlined /> {post.viewCount ?? '0'}
      </Button>
      <Divider type="vertical" />
      <Button type="text" onClick={() => setShowComments(!showComments)} title="Komentar">
        <CommentOutlined /> {post.commentCount ?? '0'}
      </Button>
      <Divider type="vertical" />
      <LikeButton post={post} />
      <Divider type="vertical" />
      <ShareButton post={post} />
    </div>
  )
}