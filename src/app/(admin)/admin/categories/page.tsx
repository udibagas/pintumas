'use client';

import React from "react";
import { Category } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import CategoryTable from "./CategoryTable";

export default function AdminCategoryPage() {
  return (
    <DataTableProvider<Category> url="/api/categories">
      <CategoryTable />
    </DataTableProvider>
  );
};