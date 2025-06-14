"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Row, Switch } from "antd";
import { Post } from "@prisma/client";
import { SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import { ServerErrorResponse } from "@/types";
import { createItem, updateItem } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function PostForm({ values }: { values: Post }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<Post>();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
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
      size="large"
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      <Row gutter={20}>
        <Col span={12}>
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
            <Input.TextArea placeholder="Tulis postingan Anda di sini" rows={10} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Featured"
            name="featured"
            validateStatus={errors.featured ? "error" : ""}
            help={errors.featured?.join(", ")}
          >
            <Switch defaultChecked={false} />
          </Form.Item>

          <Form.Item
            label="Publish"
            name="published"
            validateStatus={errors.published ? "error" : ""}
            help={errors.published?.join(", ")}
          >
            <Switch defaultChecked={false} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button color="default" variant="solid" htmlType="submit" className="mr-4 w-40">
          {isSubmitting ? <LoadingOutlined /> : <SaveOutlined />}
          {isSubmitting ? 'Menyimpan data...' : 'Simpan'}
        </Button>
      </Form.Item>
    </Form>
  );
};