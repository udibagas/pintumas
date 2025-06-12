'use client';

import { Post } from "@/types";
import { Eye, MessageCircle } from "lucide-react";
import LikeButton from "./like-button";
import ShareButton from "./share-button";

export default function PostAction({ post, setShowComments, showComments }: { post: Post, setShowComments: (show: boolean) => void, showComments: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Eye className="text-orange-300 hover:text-orange-400 size-4" />
        <span>{post.viewCount ?? '0'}x</span>
      </div>

      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComments(!showComments)}>
        <MessageCircle className="text-orange-300 hover:text-orange-400 size-4" />
        <span>{post.commentCount ?? 0}</span>
      </div>

      <div className="flex items-center gap-2">
        <LikeButton post={post} />
      </div>

      <div className="flex items-center gap-2" >
        <ShareButton post={post} />
      </div>
    </div>
  )
}