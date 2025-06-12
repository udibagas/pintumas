'use client';

import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import UserForm from "./UserForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import { User } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import DataTable from "@/components/DataTable";

export default function UserTable() {
  const {
    showForm,
    isEditing,
    errors,
    form,
    handleModalClose,
    handleSubmit,
    refreshData,
    handleEdit,
    handleDelete,
    handleAdd,
  } = useDataTableContext()

  const columns = [
    {
      title: "No.",
      width: 60,
      render: (_: string, __: User, index: number) => index + 1
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      align: "center" as const,
      width: 80,
      render: (_: string, record: User) => (
        <ActionButton
          onEdit={() => handleEdit(record)}
          onDelete={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola User"
        subtitle="Kelola user"
      >
        <AddButton label="Tambah User" onClick={handleAdd} />
      </PageHeader>

      <DataTable columns={columns} />

      <UserForm
        visible={showForm}
        isEditing={isEditing}
        onCancel={handleModalClose}
        onOk={handleSubmit}
        errors={errors}
        form={form}
      />
    </>
  );
};