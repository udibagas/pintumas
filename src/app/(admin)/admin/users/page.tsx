'use client';

import React from "react";
import { Department, User } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import UserTable from "./UserTable";

export default function AdminUserPage() {
  return (
    <DataTableProvider<User & { department: Department }> url="/api/users">
      <UserTable />
    </DataTableProvider>
  );
};