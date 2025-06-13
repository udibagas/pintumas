'use client';

import React from "react";
import { Department } from "@prisma/client";
import { DataTableProvider } from "@/providers/DataTableProvider";
import DepartmentTable from "./DepartmentTable";

export default function AdminDepartmentPage() {
  return (
    <DataTableProvider<Department> url="/api/departments">
      <DepartmentTable />
    </DataTableProvider>
  );
};