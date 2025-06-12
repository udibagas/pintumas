'use client';

import PageHeader from "@/components/PageHeader";
import { Post } from "@prisma/client";
import { Button, Card, Col, Form, Input, Row, Switch } from "antd";
import { useState } from "react";
import { SaveOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { createItem } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { ServerErrorResponse } from "@/types";

export default function CreatePostPage() {
  const router = useRouter();
  const [form] = Form.useForm<Post>();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onOk = async (values: Post) => {
    try {
      setIsSubmitting(true);
      setErrors({});
      await createItem<Post>('/api/posts', values);
      router.push('/admin/posts');
    } catch (error: unknown) {
      const axiosError = error as ServerErrorResponse;
      if (axiosError.code == 'ERR_BAD_REQUEST') {
        const errors = axiosError.response.data.errors ?? {};
        setErrors(errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Buat Postingan Baru"
        subtitle="Isi detail postingan baru Anda di sini."
      >
      </PageHeader>

      <Card>
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
            <Button color="default" variant="solid" htmlType="submit" className="mr-4">
              {isSubmitting ? <LoadingOutlined /> : <SaveOutlined />}
              {isSubmitting ? 'Menyimpan data...' : 'Simpan'}
            </Button>
            <Button onClick={() => form.resetFields()}>
              <CloseCircleOutlined />
              Batal
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}