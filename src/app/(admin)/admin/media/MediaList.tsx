'use client';

import React from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import { PaginatedData } from "@/types";
import { Image, Pagination, Radio } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

export default function MediaList() {
  return (
    <>
      <PageHeader
        title="Kelola Media"
        subtitle="Kelola media untuk digunakan dalam postingan Anda."
      >
        <Radio.Group
          block
          defaultValue="grid"
          optionType="button"
          options={[
            { label: <AppstoreOutlined />, value: 'grid' },
            { label: <UnorderedListOutlined />, value: 'list' },
          ]}
        />
      </PageHeader>

      <GridView />

    </>
  );
};

function GridView() {
  const { useFetch, setCurrentPage, setPageSize, pageSize } = useDataTableContext()
  const { isPending, data }: { isPending: boolean, data: PaginatedData<Media> } = useFetch<PaginatedData<Media>>();

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

function ListView({ media }: { media: Media[] }) {
  return (
    <div className="space-y-4">
      {media.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <Image
            src={item.url}
            alt={item.filename}
            width={100}
            height={100}
            className="object-cover rounded-lg"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{item.filename}</span>
            <span className="text-sm text-gray-500">{item.size} bytes</span>
          </div>
        </div>
      ))}
    </div>
  );
}