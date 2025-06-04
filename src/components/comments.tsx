'use client';

import { Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import CommentForm from "./comment-form";
import moment from "moment";

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      try {
        const response = await fetch(`/api/comments?postId=${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  return (
    <>
      <CommentForm postId={postId} onCommentAdded={(comment) => {
        setComments((prevComments) => [comment, ...prevComments]);
      }} />

      <div className="mt-4">
        {loading ? 'Memuat komentar...' : <CommentList comments={comments} />}
      </div>
    </>
  )
}

function CommentList({ comments }: { comments: Comment[] }) {
  moment.locale('id-id');

  if (comments.length === 0) {
    return <p className="text-muted-foreground">Belum ada komentar.</p>
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className="bg-muted p-4 my-4 rounded-lg">
          <div className="flex gap-2 items-center">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{comment.author?.name[0] ?? 'A'}</AvatarFallback>
            </Avatar>
            <div className="font-bold">{comment.author?.name ?? 'Anonim'}</div>
            <div className="text-xs text-muted-foreground"> {moment(comment.createdAt).fromNow()}</div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{comment.content}</p>
        </li>
      ))}
    </ul>
  )
}