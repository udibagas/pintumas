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
    <Card key={post.id}>
      <CardHeader>
        <CardTitle className="text-3xl">
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

        <p className="bg-muted mb-4 p-4 rounded-lg whitespace-pre-line text-muted-foreground">
          {showDetail && post.content}
          {!showDetail && post.excerpt}
          {!showDetail && <div className="text-blue-500 cursor-pointer text-sm" onClick={() => setShowDetail(true)}>
            Baca Selengkapnya <ArrowRight className="inline size-4" />
          </div>}
        </p>

        <PostAction post={post} setShowComments={setShowComments} showComments={showComments} />

        {showComments && <Comments postId={post.id} />}
      </CardContent>
    </Card>
  )
}