"use client";

import PageHeader from "@/components/PageHeader";
import { Card } from "antd";
import PostForm from "../../PostForm";
import { getItem } from "@/lib/api-client";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<Post>({} as Post);

  useEffect(() => {
    const fetchPost = (async () => {
      const postId = await params.then(p => p.id);
      const fetchedPost = await getItem<Post>(`/api/posts`, postId);
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
        <PostForm values={post} />
      </Card>
    </>
  );
}