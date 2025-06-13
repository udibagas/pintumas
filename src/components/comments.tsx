'use client';

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentForm from "./comment-form";
import moment from "moment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment, User } from "@prisma/client";

export default function Comments({ postId }: { postId: number }) {
  const queryClient = useQueryClient();

  const { isPending, data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      return response.json();
    },
    staleTime: 1000 * 60, // 1 minutes
  });

  return (
    <div className="mt-8">
      <CommentForm postId={postId} onCommentAdded={() => queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      })} />

      <div className="mt-4">
        {isPending ? <p className="text-muted-foreground">Memuat komentar...</p> : <CommentList comments={comments} />}
      </div>
    </div>
  )
}

function CommentList({ comments }: { comments: (Comment & { author: User })[] }) {
  moment.locale('id-id');

  if (comments.length === 0) {
    return <p className="text-muted-foreground">Belum ada komentar.</p>
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="bg-slate-50 p-4 rounded-lg my-2">
          <div className="flex gap-2 items-center">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
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