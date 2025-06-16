"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Row, Select, Switch, Upload, UploadFile } from "antd";
import { Category, Department, Media, Post } from "@prisma/client";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { PaginatedData, PostWithMedia, ServerErrorResponse } from "@/types";
import client, { createItem, getItems, updateItem } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function PostForm({ values }: { values: PostWithMedia }) {
  const [form] = Form.useForm<PostWithMedia>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const router = useRouter();

  const onOk = async (values: Post & { file?: UploadFile[] }) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const { file, ...rest } = values;
      console.log(file)

      const data = {
        ...rest,
        PostMedia: media.map(m => ({ mediaId: m.id })),
      }

      const post = values.id
        ? await updateItem<Post>('/api/posts', values.id, data)
        : await createItem<Post>('/api/posts', data);

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
      setMedia(values.PostMedia?.map(m => m.media) ?? []);
    } else {
      form.resetFields();
    }
  }, [values, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0].response.file;
    }

    return e && e.fileList;
  };

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
          <Form.Item name="file" label="Gambar" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              name="file"
              listType="picture"
              action='/api/media'
              accept="image/*, application/*"
              withCredentials
              onChange={({ file }) => {
                if (file.status === 'done') {
                  console.log('File uploaded successfully:', file);
                  setMedia((prev) => [...prev, file.response]);
                }
              }}
              onRemove={async (file) => {
                console.log('Removing file:', file);
                const id = file.response?.id;
                if (!id) return;
                await client.delete(`/api/media/${id}`);
                setMedia((prev) => prev.filter((m) => m.id !== id));
              }}
            >
              <Button icon={<UploadOutlined />}>Pilih File</Button>
            </Upload>
          </Form.Item>

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
                      <Select.Option key={department.id} value={department.id}>
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