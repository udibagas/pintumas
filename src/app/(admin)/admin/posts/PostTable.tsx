'use client';

import React from "react";
import { Avatar, Card, Divider, Image, Input, Switch, Tag } from "antd";
import { ApartmentOutlined, ClockCircleOutlined, CommentOutlined, EyeOutlined, LikeOutlined, ReloadOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import ActionButton from "@/components/buttons/ActionButton";
import { Category, Department, Media, Post, PostMedia, User } from "@prisma/client";
import Link from "next/link";
import moment from "moment";
import DataTable from "@/components/DataTable";
import { useDataTableContext } from "@/hooks/useDataTable";
import { redirect } from "next/navigation";
import { updateItem } from "@/lib/api-client";

interface PostWithRelations extends Post {
  author?: User;
  category?: Category;
  department?: Department;
  PostMedia?: (PostMedia & { media: Media })[];
}

export default function PostTable() {
  const {
    refreshData,
    handleDelete,
    setSearch,
    setCurrentPage,
  } = useDataTableContext()

  const columns = [
    {
      title: "Konten",
      key: "title",
      render: (_text: string, record: PostWithRelations) => <PostDetail {...record} />,
    },
    {
      title: "Unggulan",
      key: "featured",
      align: "center" as const,
      width: 100,
      render: (_text: string, record: Post) => (
        <Switch defaultValue={record.featured} size={'small'} onChange={async (c) => {
          await updateItem<Post>(`/api/posts`, record.id, { ...record, featured: c });
          refreshData();
        }} />
      )
    },
    {
      title: "Diterbitkan",
      key: "published",
      align: "center" as const,
      width: 100,
      render: (_text: string, record: Post) => (
        <Switch defaultValue={record.published} size={'small'} onChange={async (c) => {
          await updateItem<Post>(`/api/posts`, record.id, { ...record, published: c });
          refreshData();
        }} />
      )
    },
    {
      title: <ReloadOutlined onClick={refreshData} />,
      key: "action",
      width: 80,
      align: "center" as const,
      render: (_text: string, record: Post) => (
        <ActionButton onEdit={() => redirect(`/admin/posts/${record.id}/edit`)} onDelete={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <Card title={
      <div className="py-3">
        <h3 className="text-xl">Kelola Post</h3>
        <div className="text-gray-600 text-xs">Kelola kontent untuk aplikasi Anda.</div>
      </div>
    } extra={
      <Input.Search
        placeholder="Cari post..."
        className="w-64"
        allowClear
        onSearch={(value) => {
          setCurrentPage(1)
          setSearch(value)
        }} />}>
      <DataTable<Post> columns={columns} />
    </Card>
  );
};

function PostDetail(props: PostWithRelations) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <Image
          width={200}
          height={150}
          className="rounded-md object-cover mb-2"
          src={props.PostMedia?.[0]?.media.url ?? `https://picsum.photos/600/400?random=${props.id}`}
          alt={props.title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg">
          <Link href={`/admin/posts/${props.id}/edit`}>
            {props.published ? props.title : <span className="text-gray-500">{props.title} (Draft)</span>}
          </Link>
        </div>
        <div>
          {props.department && <Tag color="default">
            <ApartmentOutlined /> {" "}
            {props.department.name}
          </Tag >}
          <Tag color="default">
            <TagsOutlined /> {" "}
            {props.category?.name || "Uncategorized"}
          </Tag >
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