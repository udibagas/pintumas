"use client";

import PageHeader from "@/components/PageHeader";
import { Card } from "antd";
import PostForm from "../PostForm";
import { PostWithMedia } from "@/types";

export default function CreatePostPage() {
  return (
    <>
      <PageHeader
        title="Buat Postingan Baru"
        subtitle="Isi detail postingan baru Anda di sini."
      >
      </PageHeader>

      <Card>
        <PostForm values={{} as PostWithMedia} />
      </Card>
    </>
  );
}