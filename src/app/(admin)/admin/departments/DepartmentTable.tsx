'use client';

import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import DepartmentForm from "./DepartmentForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import { Department } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import { DepartmentWithMedia } from "@/types";

export default function DepartmentTable() {
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
    { title: "No.", key: "id", width: 60, render: (_: string, __: Department, index: number) => index + 1 },
    {
      title: "Logo",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      align: "center" as const,
      render: (_: string, record: DepartmentWithMedia) => {
        return record.media ? <Image src={record.media.url} alt="Logo" width={50} height={50} style={{ height: 'auto' }} /> : null;
      }
    },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Keterangan", dataIndex: "description", key: "description" },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: string) => link ? <a href={link} target="_blank" rel="noopener noreferrer">{link}</a> : '-'
    },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_: string, record: Department) => (
        <ActionButton onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Departemen"
        subtitle="Kelola departemen untuk mengelompokkan user."
      >
        <AddButton label="Tambah Departemen" onClick={handleAdd} />
      </PageHeader>

      <DataTable<DepartmentWithMedia> columns={columns} />

      {showForm && <DepartmentForm
        visible={showForm}
        isEditing={isEditing}
        onCancel={handleModalClose}
        onOk={handleSubmit}
        errors={errors}
        form={form}
      />}
    </>
  );
};