'use client';
import { Post } from "@prisma/client";
import { Button } from "antd";
import { useState } from "react";
import { ShareAltOutlined } from "@ant-design/icons";

export default function ShareButton({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);

  // Helper to get post URL
  const postUrl = typeof window !== "undefined"
    ? `${window.location.origin}/posts/${post.slug}`
    : `/posts/${post.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: postUrl,
        });
      } catch (err: unknown) {
        console.log("Gagal membagikan link:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
        setCopied(true);
        alert(copied);
        setTimeout(() => setCopied(false), 1500);
      } catch (err: unknown) {
        console.error("Gagal menyalin link:", err);
        alert("Gagal menyalin link");
      }
    }
  };

  return (
    <Button type="text" onClick={handleShare} title="Bagikan">
      <span className="text-2xl">
        <ShareAltOutlined onClick={handleShare} />
      </span>
    </Button>
  )
}