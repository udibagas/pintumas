'use client';

import React from "react";
import { Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import CategoryForm from "./CategoryForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import useCrud from "@/hooks/useCrud";
import { Category } from "@prisma/client";

export default function AdminCategoriesPage() {
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
  } = useCrud<Category>("/api/categories", "categories");

  const { isPending, data } = useFetch();

  const columns = [
    { title: "No.", key: "id", width: 60, render: (_: string, __: Category, index: number) => index + 1 },
    { title: "Nama", dataIndex: "name", key: "name" },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_: string, record: Category) => (
        <ActionButton onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Kategori"
        subtitle="Kelola kategori untuk mengelompokkan konten Anda."
      >
        <AddButton label="Tambah Kategori" onClick={handleAdd} />
      </PageHeader>

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Category) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <CategoryForm
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