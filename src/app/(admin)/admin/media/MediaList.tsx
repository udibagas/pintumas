'use client';

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import { PaginatedData } from "@/types";
import { Image, Pagination, Radio } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import DataTable from "@/components/DataTable";
import moment from "moment";
import { humanFileSize } from "@/lib/utils";

export default function MediaList() {
  const { useFetch, setCurrentPage, setPageSize, pageSize } = useDataTableContext()
  const { isPending, data }: { isPending: boolean, data: PaginatedData<Media> } = useFetch<PaginatedData<Media>>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <>
      <PageHeader
        title="Kelola Media"
        subtitle="Kelola media untuk digunakan dalam postingan Anda."
      >
        <Radio.Group
          block
          onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
          defaultValue="list"
          optionType="button"
          options={[
            { label: <UnorderedListOutlined />, value: 'list' },
            { label: <AppstoreOutlined />, value: 'grid' },
          ]}
        />
      </PageHeader>

      {viewMode == 'grid' ? <GridView
        isPending={isPending}
        data={data}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      /> : <ListView />}

    </>
  );
};

interface GridViewProps {
  isPending: boolean;
  data: PaginatedData<Media>;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

function GridView({ isPending, data, pageSize, setCurrentPage, setPageSize }: GridViewProps) {
  return (
    <>
      <div className="mt-6">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <>
            <div className="flex flex-wrap gap-6 mb-6">
              {data.rows.map((media) => (
                <div key={media.id} className="flex flex-col items-center">
                  <Image
                    src={media.url}
                    alt={media.filename}
                    width={200}
                    height={200}
                    className="object-cover mb-2 rounded-lg"
                  />
                </div>
              ))}
            </div>

            <Pagination
              size="small"
              className="mt-4"
              current={data?.page}
              total={data?.total}
              pageSize={pageSize}
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              }}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
          </>
        )}
      </div>
    </>
  );
}

function ListView() {
  const columns = [
    {
      title: "Media",
      key: "url",
      render: (_text: string, record: Media) => (
        <div className="flex items-center gap-4">
          <Image
            width={80}
            height={80}
            className="rounded-md object-cover"
            src={record.url}
            alt={record.filename}
          />
          <span>{record.filename}</span>
        </div>
      ),
    },
    {
      title: "Jenis",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: "Ukuran",
      dataIndex: "size",
      key: "size",
      width: 100,
      render: (text: string, record: Media) => (
        <span>{humanFileSize(record.size ?? 0)}</span>
      ),
    },
    {
      title: "Diupload",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text: string, record: Media) => (
        <span>{moment(record.createdAt).format('DD-MMM-YY HH:mm')}</span>
      ),
    },
  ];

  return (
    <DataTable<Media> columns={columns} />
  );
}