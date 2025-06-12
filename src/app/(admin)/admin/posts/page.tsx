'use client';

import React from "react";
import { Post } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import PostTable from "./PostTable";

export default function AdminPostPage() {
  return (
    <DataTableProvider<Post> url="/api/posts">
      <PostTable />
    </DataTableProvider>
  );
};