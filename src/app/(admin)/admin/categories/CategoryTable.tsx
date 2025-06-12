'use client';

import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import CategoryForm from "./CategoryForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import { Category } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import DataTable from "@/components/DataTable";

export default function CategoryTable() {
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

      <DataTable<Category> columns={columns} />

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