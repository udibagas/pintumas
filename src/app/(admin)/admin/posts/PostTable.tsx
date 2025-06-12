'use client';

import React from "react";
import { Avatar, Divider, Image, Input, Switch, Tag } from "antd";
import { ApartmentOutlined, ClockCircleOutlined, CommentOutlined, EyeOutlined, LikeOutlined, ReloadOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import PostForm from "./PostForm";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import ActionButton from "@/components/buttons/ActionButton";
import { Category, Department, Media, Post, User } from "@prisma/client";
import Link from "next/link";
import moment from "moment";
import DataTable from "@/components/DataTable";
import { useDataTableContext } from "@/hooks/useDataTable";

export default function PostTable() {
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
    setSearch,
    setCurrentPage,
  } = useDataTableContext()

  const columns = [
    {
      title: "Konten",
      key: "title",
      render: (_text: string, record: Post & { author?: User, category?: Category, department?: Department, media?: Media[] }) => <PostDetail {...record} />,
    },
    {
      title: "Published",
      key: "published",
      align: "center" as const,
      width: 100,
      render: (_text: string, record: Post) => <Switch value={record.published} size={'small'} />
    },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_text: string, record: Post) => (
        <ActionButton onEdit={() => handleEdit(record)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Post"
        subtitle="Kelola kontent untuk aplikasi Anda."
      >
        <Input.Search
          placeholder="Cari post..."
          className="w-64"
          allowClear
          onSearch={(value) => {
            setCurrentPage(1)
            setSearch(value)
          }} />
        <AddButton label="Tambah Post" onClick={handleAdd} />
      </PageHeader>

      <DataTable<Post> columns={columns} />

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

function PostDetail(props: Post & { author?: User, category?: Category, department?: Department, media?: Media[] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <Image
          width={200}
          height={150}
          className="rounded-md"
          src={props.media?.[0]?.url}
          alt={props.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg">
          <Link href={`/posts/${props.slug}`} className="hover:underline text-black">
            {props.title}
          </Link>
        </div>
        <div>
          <Tag color="default">
            <TagsOutlined /> {" "}
            {props.category?.name || "Uncategorized"}
          </Tag >
          {props.department && <Tag color="default">
            <ApartmentOutlined /> {" "}
            {props.department.name}
          </Tag >}
        </div>
        <div className="text-sm text-gray-500 my-2">{props.excerpt}</div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Avatar size={'small'} alt="B" icon={<UserOutlined />} />
          {props.author?.name || "Admin"}
          <Divider type="vertical" />
          <ClockCircleOutlined />
          <span> {moment(props.createdAt).format('DD-MMM-YY HH:mm')} </span>
          <Divider type="vertical" />
          <EyeOutlined />
          <span>{props.viewCount || 0}</span>
          <Divider type="vertical" />
          <LikeOutlined />
          <span>{props.likeCount || 0}</span>
          <Divider type="vertical" />
          <CommentOutlined />
          <span>{props.commentCount || 0}</span>
        </div>
      </div>
    </div>
  )
}