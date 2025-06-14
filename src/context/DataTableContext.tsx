/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecursivePartial } from "../types";
import { createContext } from "react";

interface DataTableContextProps {
    handleAdd: () => void;
    handleModalClose: () => void;
    handleSubmit: (values: any) => Promise<void>;
    handleEdit: (data: RecursivePartial<any>, additionalData?: Record<string, any>) => void;
    handleDelete: (id: number | string) => void;
    refreshData: () => void;
    form: any;
    showForm: boolean;
    errors: Record<string, string[]>;
    isEditing: boolean;
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSearch: (search: string) => void;
    setFilter: (filter: Record<string, string>) => void;
    useFetch: <D = any>() => {
        isPending: boolean;
        data: D | undefined;
    };
}

export const DataTableContext = createContext<DataTableContextProps | undefined>(undefined)