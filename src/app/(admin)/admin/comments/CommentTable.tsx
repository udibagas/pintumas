'use client';

import React from "react";
import { DeleteOutlined, ReloadOutlined, UserOutlined } from "@ant-design/icons";
import PageHeader from "@/components/PageHeader";
import { Comment, Post, User } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import DataTable from "@/components/DataTable";
import { Avatar, Button, Divider, Input } from "antd";
import moment from "moment";

interface CommentWithDetails extends Comment {
  author?: User;
  post: Post;
}

export default function CommentTable() {
  const { refreshData, handleDelete, setSearch, setCurrentPage } = useDataTableContext()

  const columns = [
    { title: "Komentar", key: "id", render: (_: string, record: CommentWithDetails) => <CommentDetail comment={record} /> },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_: string, record: CommentWithDetails) => (
        <Button color="default" variant="text" onClick={() => handleDelete(record.id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Komentar"
        subtitle="Kelola komentar untuk mengelola interaksi pengguna."
      >
        <Input.Search
          placeholder="Cari komentar..."
          allowClear
          className="w-40"
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1)
          }}
        />
      </PageHeader>

      <DataTable<CommentWithDetails> columns={columns} />
    </>
  );
};

function CommentDetail({ comment }: { comment: CommentWithDetails }) {
  return (
    <div className="p-2">
      <Avatar size="small" src={comment.author?.image} icon={<UserOutlined />} />
      <span className="ml-2 font-semibold">{comment.author?.name ?? 'Anonim'}</span>
      <span className="text-xs text-gray-500 ml-2">{moment(comment.createdAt).format('DD-MMM-YY HH:mm')}</span>
      <Divider type="vertical" />
      <span className="text-xs text-gray-500">{comment.post.title}</span>
      <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
        {comment.content}
      </div>
    </div>
  );
}