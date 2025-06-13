'use client';

import React from "react";
import { Comment } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import CommentTable from "./CommentTable";

export default function AdminCommentPage() {
  return (
    <DataTableProvider<Comment> url="/api/comments">
      <CommentTable />
    </DataTableProvider>
  );
};