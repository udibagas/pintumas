'use client';

import React from "react";
import { Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import DepartmentForm from "./DepartmentForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import useCrud from "@/hooks/useCrud";
import { Department } from "@prisma/client";

export default function AdminDepartmentsPage() {
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
  } = useCrud<Department>("/api/departments", "departments");

  const { isPending, data } = useFetch();

  const columns = [
    { title: "No.", key: "id", width: 60, render: (_: string, __: Department, index: number) => index + 1 },
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Keterangan", dataIndex: "description", key: "description" },
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

      <Table
        loading={isPending}
        size="small"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        onRow={(record: Department) => {
          return {
            onDoubleClick: () => handleEdit(record),
          };
        }}
      />

      <DepartmentForm
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