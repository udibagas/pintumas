'use client';

import React from "react";
import { Category } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import MediaList from "./MediaList";

export default function MediaPage() {
  return (
    <DataTableProvider<Category> url="/api/media">
      <MediaList />
    </DataTableProvider>
  );
};