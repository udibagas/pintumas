"use client";

import PageHeader from "@/components/PageHeader";
import { Card } from "antd";
import PostForm from "../../PostForm";
import { getItem } from "@/lib/api-client";
import { Media, Post, PostMedia } from "@prisma/client";
import { useEffect, useState } from "react";

interface PostWithMedia extends Post {
  PostMedia: (PostMedia & { media: Media })[];
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<PostWithMedia | null>(null);

  useEffect(() => {
    const fetchPost = (async () => {
      const postId = await params.then(p => p.id);
      const fetchedPost = await getItem<PostWithMedia>(`/api/posts`, postId);
      if (fetchedPost) {
        setPost(fetchedPost);
      }
    });

    fetchPost();
  }, [params]);

  return (
    <>
      <PageHeader
        title="Edit Postingan"
        subtitle="Perbarui detail postingan Anda di sini."
      >
      </PageHeader>

      <Card>
        {post ? <PostForm values={post} /> : 'Loading...'}
      </Card>
    </>
  );
}