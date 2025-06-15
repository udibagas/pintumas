'use client';

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentForm from "./comment-form";
import moment from "moment";
import { useEffect, useState } from "react";
import { getItems } from "@/lib/api-client";
import { CommentWithAuthor } from "@/types";

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    moment.locale('id-id');
    getItems<CommentWithAuthor[]>(`/api/posts/${postId}/comments`)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [postId]);


  return (
    <div className="mt-8">
      <CommentForm postId={postId} onCommentAdded={(comment) => setComments((prev) => [...prev, comment])} />

      <div className="mt-4">
        {isPending ? <p className="text-muted-foreground">Memuat komentar...</p> : <CommentList comments={comments} />}
      </div>
    </div>
  )
}

function CommentList({ comments }: { comments: CommentWithAuthor[] }) {
  moment.locale('id-id');

  if (comments.length === 0) {
    return <p className="text-muted-foreground">Belum ada komentar.</p>
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="bg-slate-200 p-4 rounded-lg my-2">
          <div className="flex gap-2 items-center">
            <Avatar className="size-6">
              <AvatarImage src="https://avatar.iran.liara.run/public" />
              <AvatarFallback>{comment.author?.name[0] ?? 'A'}</AvatarFallback>
            </Avatar>
            <div className="font-bold">{comment.author?.name ?? 'Anonim'}</div>
            <div className="text-xs text-muted-foreground"> {moment(comment.createdAt).fromNow()}</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
            {comment.content}
          </p>
        </li>
      ))}
    </ul>
  )
}