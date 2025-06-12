'use client';

import React from "react";
import { Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import PostForm from "./PostForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import useCrud from "@/hooks/useCrud";
import { Post } from "@prisma/client";

export default function AdminPostPage() {
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
  } = useCrud<Post>("/api/posts", "posts");

  const { isPending, data } = useFetch();

  const columns = [
    { title: "No.", key: "id", width: 60, render: (_: string, __: Post, index: number) => index + 1 },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Keterangan", dataIndex: "description", key: "description" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_: string, record: Post) => (
        <ActionButton onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Post"
        subtitle="Kelola kontent post untuk aplikasi Anda."
      >
        <AddButton label="Tambah Post" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Post) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <PostForm
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