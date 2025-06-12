'use client';

import React from "react";
import { Post } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import CategoryTable from "./CategoryTable";

export default function AdminPostPage() {
  return (
    <DataTableProvider<Post> url="/api/categories">
      <CategoryTable />
    </DataTableProvider>
  );
};