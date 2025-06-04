'use client';

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Post } from "@/types";

export default function PostForm({ onSuccess }: { onSuccess?: (post: Post) => void }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const postData = {
      title,
      content,
    };

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created successfully:", data);
        onSuccess?.(data);
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">Buat Postingan Baru</CardTitle>
        <CardDescription>
          Isi formulir di bawah ini untuk membuat postingan baru. Pastikan untuk mengisi semua kolom yang diperlukan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Label htmlFor="title">Judul</Label>
            <Input type="text" id="title" name="title" required placeholder="Tulis judul postingan Anda" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="content">Konten</Label>
            <Textarea id="content" name="content" rows={4} required placeholder="Tulis isi postingan Anda"></Textarea>
          </div>

          <Button type="submit" className="w-40 cursor-pointer">
            <Send />
            Kirim
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}