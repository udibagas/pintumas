'use client';
import { Post } from "@/types";
import { Share2 } from "lucide-react";
import { useState } from "react";

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
        console.error("Gagal membagikan link:", err);
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
    <Share2 className="cursor-pointer text-orange-300 hover:text-orange-400 size-4" onClick={handleShare} />
  )
}