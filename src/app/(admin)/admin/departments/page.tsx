'use client';

import React from "react";
import { Post } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import DepartmentTable from "./DepartmentTable";

export default function AdminPostPage() {
  return (
    <DataTableProvider<Post> url="/api/departments">
      <DepartmentTable />
    </DataTableProvider>
  );
};