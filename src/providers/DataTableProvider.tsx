import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, message, Modal } from "antd";
import { useCallback, useMemo, useState } from "react";
import { createItem, deleteItem, getItems, updateItem } from "@/lib/api-client";
import { RecursivePartial, ServerErrorResponse } from "../types";
import { Dayjs } from "dayjs";
import { DataTableContext } from "../context/DataTableContext";

interface DataTableProviderProps {
  url: string;
  children: React.ReactNode;
}

export function DataTableProvider<T extends { id: number | string }>({ url, children }: DataTableProviderProps) {
  // form related
  const [form] = Form.useForm<T>();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // pagination and filters
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const refreshData = useCallback(() => {
    setCurrentPage(1);
    setSearch("");
    setFilter({});
    queryClient.invalidateQueries({ queryKey: [url] });
  }, [queryClient, url]);

  const params = useMemo(
    () => ({ page: currentPage, pageSize, search, ...filter }),
    [currentPage, pageSize, search, filter]
  );

  function useFetch<D>() {
    const { isPending, data } = useQuery({
      queryKey: [url, params],
      queryFn: () => getItems<D>(url, params),
      staleTime: 60 * 1000 * 10, // 10 minutes
    });
    return { isPending, data };
  }

  const handleAdd = useCallback(() => {
    form.resetFields();
    setIsEditing(false);
    setShowForm(true);
  }, [form]);

  const handleEdit = useCallback(
    (
      data: RecursivePartial<T>,
      additionalData: Record<
        string,
        string | number | boolean | Dayjs | null | number[]
      > = {}
    ) => {
      form.setFieldsValue({ ...data, ...additionalData });
      setIsEditing(true);
      setShowForm(true);
    },
    [form]
  );

  const handleModalClose = useCallback(() => {
    setShowForm(false);
    form.resetFields();
    setErrors({});
  }, [form]);

  const handleSubmit = useCallback(
    async (values: T) => {
      try {
        const res = values.id
          ? await updateItem(url, values.id, values)
          : await createItem(url, values);
        console.log("Response:", res);
        message.success("Data berhasil disimpan");
        form.resetFields();
        setErrors({});
        setShowForm(false);
        refreshData();
      } catch (error) {
        const axiosError = error as ServerErrorResponse;
        if (axiosError.code === "ERR_BAD_REQUEST") {
          const errors = axiosError.response.data.errors ?? {};
          setErrors(errors);
        }

        message.error(axiosError.response.data.message);
      }
    },
    [url, form, refreshData]
  );

  const handleDelete = useCallback(
    (id: number | string) => {
      Modal.confirm({
        title: "Anda yakin akan menghapus data ini?",
        content: "Aksi ini tidak dapat dibatalkan.",
        centered: true,
        okText: "Ya",
        okType: "danger",
        cancelText: "Tidak",
        onOk: () => {
          deleteItem(url, id).then(() => {
            message.success("Data berhasil dihapus");
            refreshData();
          });
        },
      });
    },
    [url, refreshData]
  );


  return (
    <DataTableContext.Provider value={{
      handleAdd,
      handleModalClose,
      handleSubmit,
      handleEdit,
      handleDelete,
      refreshData,
      form,
      showForm,
      errors,
      isEditing,
      currentPage,
      pageSize,
      setCurrentPage,
      setPageSize,
      setSearch,
      setFilter,
      useFetch,
    }}>
      {children}
    </DataTableContext.Provider>
  )
}
