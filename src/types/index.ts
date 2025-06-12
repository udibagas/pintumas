import { FormInstance } from "antd";

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
