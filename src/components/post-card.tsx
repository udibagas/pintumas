'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Post } from "@/types";
import Comments from "./comments";
import Link from "next/link";
import { Eye, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card key={post.id}>
      <CardHeader>
        <CardTitle className="text-3xl">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          {post.author.name} &bull; {post.category?.name || "Uncategorized"} &bull;
          {post.publishedAt && ` ${new Date(post.publishedAt).toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {(post.media?.length ?? 0) > 0 && <div className="mb-4">
          {post.media?.map((media) => (
            media.type === "IMAGE" && (
              <Image
                key={media.id}
                src={media.url}
                alt={post.title}
                className="w-full h-auto rounded-xl"
                width={media.width || 600}
                height={media.height || 400}
                loading="lazy"
                style={{ objectFit: "cover" }}
                placeholder="blur"
                blurDataURL={media.url} // Assuming media.url is a valid placeholder
                unoptimized={true} // Use this if you want to avoid Next.js image optimization
                quality={75} // Adjust quality as needed
              />
            )
          ))}
        </div>}

        <p className="mb-4 border border-slate-200 p-4 rounded-lg">{post.content}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted mb-4 py-4 px-8 rounded-lg">
          <div className="flex items-center gap-2">
            <Eye className="text-blue-400 size-4" />
            <span>{post.viewCount ?? '0'}x Dilihat</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className=" text-blue-400 size-4" />
            <span>{post.commentCount ?? 0} Komentar</span>
          </div>

          <div className="flex items-center gap-2">
            <ThumbsUp className="cursor-pointer text-blue-400 size-4" />
            <span>{post.likeCount ?? 0} Menyukai</span>
          </div>

          <div className="flex items-center gap-2">
            <Share2 className="cursor-pointer text-blue-400 size-4" />
            <span>Bagikan</span>
          </div>
        </div>

        {showComments && <Comments postId={post.id} />}
      </CardContent>
    </Card>
  )
}