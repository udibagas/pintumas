"use client";

import React from "react";
import { Modal, Form, Input, Select } from "antd";
import CancelButton from "@/components/buttons/CancelButton";
import SaveButton from "@/components/buttons/SaveButton";
import { CustomFormProps } from "@/types";
import { Department, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/lib/api-client";

const CategoryForm: React.FC<CustomFormProps<User>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const data = await getItems<Department[]>("/api/departments", { paginated: false });
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Modal
      width={450}
      title={isEditing ? "Edit User" : "Tambah User"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <CancelButton label="Batal" onCancel={onCancel} key='back' />,
        <SaveButton label="Simpan" key='submit' />,
      ]}
    >
      <Form
        variant="filled"
        form={form}
        id="form"
        onFinish={onOk}
        requiredMark={false}
        labelCol={{ span: 8 }}
        labelAlign="left"
        colon={false}
        style={{ marginTop: '1.5rem' }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nama"
          name="name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.join(", ")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.join(", ")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role?.join(", ")}
        >
          <Select>
            {
              ["READER", "REPORTER", "EDITOR", "ADMIN"].map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Departemen"
          name="departmentId"
          validateStatus={errors.departmentId ? "error" : ""}
          help={errors.departmentId?.join(", ")}
        >
          <Select>
            {
              departments.map((d) => (
                <Select.Option key={d.id} value={d.name}>
                  {d.name}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.join(", ")}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;