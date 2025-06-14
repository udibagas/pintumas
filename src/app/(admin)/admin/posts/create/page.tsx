"use client";

import PageHeader from "@/components/PageHeader";
import { Post } from "@prisma/client";
import { Card } from "antd";
import PostForm from "../PostForm";

export default function CreatePostPage() {

  return (
    <>
      <PageHeader
        title="Buat Postingan Baru"
        subtitle="Isi detail postingan baru Anda di sini."
      >
      </PageHeader>

      <Card>
        <PostForm values={{} as Post} />
      </Card>
    </>
  );
}