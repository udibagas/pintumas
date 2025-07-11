import {
  Category,
  Department,
  Media,
  Post,
  PostMedia,
  User,
  Comment,
} from "@prisma/client";
import { FormInstance } from "antd";
import { AxiosError } from "axios";

export type FileType = {
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  url: string;
  size: number;
};

export type AxiosErrorResponseType = {
  message: string;
  errors?: Record<string, string[]>;
};

export type RecursivePartial<T> = NonNullable<T> extends object
  ? {
      [P in keyof T]?: NonNullable<T[P]> extends (infer U)[]
        ? RecursivePartial<U>[]
        : NonNullable<T[P]> extends object
        ? RecursivePartial<T[P]>
        : T[P];
    }
  : T;

export type CustomFormProps<T> = {
  visible: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onOk: (values: T) => void;
  errors: { [key: string]: string[] };
  form: FormInstance<T>;
};

export type PaginatedData<T> = {
  from: number;
  to: number;
  page: number;
  rows: T[];
  total: number;
};

export type ServerErrorResponse = AxiosError & {
  status: number;
  code: string;
  response: {
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
};

export interface PostWithRelations extends Post {
  author: User;
  category: Category;
  department?: Department | null;
  PostMedia?: (PostMedia & { media: Media })[];
}

export interface CategoryWithRelations extends Category {
  posts?: PostWithRelations[];
}

export interface CommentWithAuthor extends Comment {
  author: User;
}

export interface PostWithMedia extends Post {
  PostMedia: (PostMedia & { media: Media })[];
}

export interface DepartmentWithMedia extends Department {
  media?: Media | null;
}
