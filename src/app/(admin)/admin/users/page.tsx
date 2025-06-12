'use client';

import React from "react";
import { Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import UserForm from "./UserForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import useCrud from "@/hooks/useCrud";
import { User } from "@prisma/client";

export default function AdminUsersPage() {
  const {
    useFetch,
    refreshData,
    handleEdit,
    handleDelete,
    handleAdd,
    handleModalClose,
    handleSubmit,
    form,
    showForm,
    errors,
    isEditing
  } = useCrud<User>("/api/users", "users");

  const { isPending, data } = useFetch();

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

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: User) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

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