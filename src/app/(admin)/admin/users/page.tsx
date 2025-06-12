'use client';

import React from "react";
import { Post } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import UserTable from "./UserTable";

export default function AdminPostPage() {
  return (
    <DataTableProvider<Post> url="/api/users">
      <UserTable />
    </DataTableProvider>
  );
};