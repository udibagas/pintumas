'use client';

import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import PageHeader from "@/components/PageHeader";
import ActionButton from "@/components/buttons/ActionButton";
import { Comment } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import DataTable from "@/components/DataTable";

export default function CommentTable() {
  const { refreshData, handleEdit, handleDelete, } = useDataTableContext()

  const columns = [
    { title: "Komentar", key: "id", render: (_: string, record: Comment) => <CommentDetail comment={record} /> },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_: string, record: Comment) => (
        <ActionButton onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Komentar"
        subtitle="Kelola komentar untuk mengelola interaksi pengguna."
      >
      </PageHeader>

      <DataTable<Comment> columns={columns} />
    </>
  );
};

function CommentDetail({ comment }: { comment: Comment }) {
  return (
    <div>
      {comment.content}
    </div>
  );
}