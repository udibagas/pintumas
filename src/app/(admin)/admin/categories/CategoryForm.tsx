"use client";

import React from "react";
import { Modal, Form, Input } from "antd";
import CancelButton from "@/components/buttons/CancelButton";
import SaveButton from "@/components/buttons/SaveButton";
import { CustomFormProps } from "@/types";
import { Category } from "@prisma/client";

const CategoryForm: React.FC<CustomFormProps<Category>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {
  return (
    <Modal
      width={450}
      title={isEditing ? "Edit Kategori" : "Tambah Kategori"}
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
      </Form>
    </Modal>
  );
};

export default CategoryForm;