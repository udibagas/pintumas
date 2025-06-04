'use client';

import { Post } from "@/types";
import { Eye, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function PostAction({ post, setShowComments, showComments }: { post: Post, setShowComments: (show: boolean) => void, showComments: boolean }) {
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);
  const [liked, setLiked] = useState(false);

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

  const handleLike = async () => {
    if (liked) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menyukai post');
      }

      setLikeCount((prevCount) => prevCount + 1);
      setLiked(true);
    } catch (error: unknown) {
      console.error("Error liking post:", error);
      alert("Gagal menyukai post");
    }
  };

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted mb-4 py-2 px-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Eye className="text-blue-400 size-4" />
        <span>{post.viewCount ?? '0'}x</span>
      </div>

      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComments(!showComments)}>
        <MessageCircle className="text-blue-400 size-4" />
        <span>{post.commentCount ?? 0}</span>
      </div>

      <div className="flex items-center gap-2">
        <ThumbsUp className="cursor-pointer text-blue-400 size-4" onClick={handleLike} />
        <span>{likeCount}</span>
      </div>

      <div className="flex items-center gap-2" >
        <Share2 className="cursor-pointer text-blue-400 size-4" onClick={handleShare} />
      </div>
    </div>
  )
}