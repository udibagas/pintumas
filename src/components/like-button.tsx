'use client';

import { Post } from "@/types";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function LikeButton({ post }: { post: Post }) {
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);
  const [liked, setLiked] = useState(false);

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
    <>
      <ThumbsUp className="cursor-pointer text-blue-400 size-4" onClick={handleLike} />
      <span>{likeCount}</span>
    </>
  )
}