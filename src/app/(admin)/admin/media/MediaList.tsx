'use client';

import React from "react";
import PageHeader from "@/components/PageHeader";
import AddButton from "@/components/buttons/AddButton";
import { Media } from "@prisma/client";
import { useDataTableContext } from "@/hooks/useDataTable";
import { PaginatedData } from "@/types";
import { Image, Pagination } from "antd";

export default function MediaList() {
  const { handleAdd, useFetch, setCurrentPage, setPageSize, pageSize } = useDataTableContext()
  const { isPending, data } = useFetch<PaginatedData<Media>>();

  return (
    <>
      <PageHeader
        title="Kelola Media"
        subtitle="Kelola media untuk digunakan dalam postingan Anda."
      >
        <AddButton label="Upload Media" onClick={handleAdd} />
      </PageHeader>

      {/* <DataTable<Category> columns={columns} /> */}

      <div className="mt-6">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <>
            <div className="flex flex-wrap gap-6 mb-6">
              {data?.rows.map((media) => (
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
};