'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Post } from "@/types";
import Comments from "./comments";
import Link from "next/link";
import { useState } from "react";
import PostAction from "./post-action";
import { ArrowRight } from "lucide-react";

export default function PostCard({ post, detail = false }: { post: Post, detail?: boolean }) {
  const [showComments, setShowComments] = useState(false);
  const [showDetail, setShowDetail] = useState(detail);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-400 hover:text-orange-500 transition-colors duration-200">
          {detail ? post.title : <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>}
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
                className="w-full h-auto rounded-lg"
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

        <div className="text-muted-foreground mb-8 whitespace-pre-line text-sm">
          {showDetail && post.content}
          {!showDetail && post.excerpt}
          {(!showDetail && (post.content?.length ?? 0 > 200)) && <div className="text-orange-300 hover:text-orange-400 cursor-pointer text-sm mt-4" onClick={() => setShowDetail(true)}>
            Baca Selengkapnya <ArrowRight className="inline size-4" />
          </div>}
        </div>

        <PostAction post={post} setShowComments={setShowComments} showComments={showComments} />

        {showComments && <Comments postId={post.id} />}
      </CardContent>
    </Card>
  )
}