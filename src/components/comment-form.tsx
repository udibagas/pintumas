'use client';

import { Comment } from "@/types";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { LogIn, Send } from "lucide-react";
import { redirect } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentForm({
  postId,
  onCommentAdded,
}: {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
}) {
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    if (!content.trim()) return;

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const comment = await response.json();
      onCommentAdded(comment);

      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      });
      form.reset()
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        name="content"
        rows={3}
        className="w-full"
        placeholder="Tulis komentar Anda di sini!"
        required
      />

      <div>
        <Button type="submit" className="cursor-pointer bg-orange-400 hover:bg-orange-500 text-white">
          <Send />
          Kirim komentar
        </Button>


        <Button
          type="button"
          className="ml-2 cursor-pointer"
          variant={"outline"}
          onClick={() => {
            redirect("/login");
          }}
        >
          <LogIn />
          Login
        </Button>

        {/* <p className="text-sm text-muted-foreground mt-2">
          Komentar Anda akan ditampilkan setelah disetujui oleh moderator.
        </p> */}
      </div>
    </form>
  );
}