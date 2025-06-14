"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Input, message, Row, Select, Switch } from "antd";
import { Category, Department, Post } from "@prisma/client";
import { SaveOutlined } from "@ant-design/icons";
import { PaginatedData, ServerErrorResponse } from "@/types";
import { createItem, getItems, updateItem } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function PostForm({ values }: { values: Post }) {
  const [form] = Form.useForm<Post>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const router = useRouter();

  const onOk = async (values: Post) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const post = values.id
        ? await updateItem<Post>('/api/posts', values.id, values)
        : await createItem<Post>('/api/posts', values);

      console.log('Post saved:', post);
      message.success('Postingan berhasil disimpan!');
      setIsSubmitting(false);

      if (!values.id) {
        console.log('Redirecting to edit page for new post:', post.id);
        router.push(`/admin/posts/${post.id}/edit`);
      }
    } catch (error: unknown) {
      const axiosError = error as ServerErrorResponse;
      if (axiosError.code == 'ERR_BAD_REQUEST') {
        const errors = axiosError.response.data.errors ?? {};
        setErrors(errors);
      }
    }
  };

  useEffect(() => {
    getItems<PaginatedData<Category>>('/api/categories', { pageSize: 1000 })
      .then(data => setCategories(data.rows));

    getItems<PaginatedData<Department>>('/api/departments', { pageSize: 1000 })
      .then(data => setDepartments(data.rows));
  }, [])

  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [values, form]);

  return (
    <Form
      variant="filled"
      form={form}
      id="form"
      onFinish={onOk}
      requiredMark={false}
      colon={false}
      layout="vertical"
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      <Row gutter={40}>
        <Col span={16}>
          <Form.Item
            label="Judul"
            name="title"
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.join(", ")}
          >
            <Input placeholder="Judul Postingan Anda" />
          </Form.Item>

          <Form.Item
            label="Keterangan"
            name="content"
            validateStatus={errors.content ? "error" : ""}
            help={errors.content?.join(", ")}
          >
            <Input.TextArea placeholder="Tulis postingan Anda di sini" rows={20} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Image src="https://picsum.photos/600/400" alt="Foto" preview={false} className="rounded-lg mb-8" />
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                label="Kategori"
                name="categoryId"
                validateStatus={errors.categoryId ? "error" : ""}
                help={errors.categoryId?.join(", ")}
              >
                <Select placeholder="Pilih kategori">
                  {
                    categories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
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
                <Select placeholder="Pilih Departemen">
                  {
                    departments.map((department) => (
                      <Select.Option key={department.id} value={department.name}>
                        {department.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Unggulan"
                name="featured"
                validateStatus={errors.featured ? "error" : ""}
                help={errors.featured?.join(", ")}
              >
                <Switch defaultChecked={false} />
              </Form.Item>

              <Form.Item
                label="Terbitkan"
                name="published"
                validateStatus={errors.published ? "error" : ""}
                help={errors.published?.join(", ")}
              >
                <Switch defaultChecked={false} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button color="default" variant="solid" htmlType="submit" className="w-full" loading={isSubmitting}>
              {!isSubmitting && <SaveOutlined />}
              {isSubmitting ? 'Menyimpan data...' : 'Simpan'}
            </Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  );
};