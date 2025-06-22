"use client";

import { Modal, Form, Input, Upload, Button } from "antd";
import CancelButton from "@/components/buttons/CancelButton";
import SaveButton from "@/components/buttons/SaveButton";
import { CustomFormProps, DepartmentWithMedia } from "@/types";
import { UploadOutlined } from "@ant-design/icons";
import client from "@/lib/api-client";

const DepartmentForm: React.FC<CustomFormProps<DepartmentWithMedia>> = ({ visible, isEditing, onCancel, onOk, errors, form }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0].response.file;
    }

    return e && e.fileList;
  };

  return (
    <Modal
      width={450}
      title={isEditing ? "Edit Departemen" : "Tambah Departemen"}
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

        <Form.Item name="mediaId" hidden>
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
          label="Keterangan"
          name="description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.join(", ")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Link"
          name="link"
          validateStatus={errors.link ? "error" : ""}
          help={errors.link?.join(", ")}
        >
          <Input />
        </Form.Item>

        <Form.Item name="file" label="Gambar" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            name="file"
            listType="picture"
            action='/api/media'
            accept="image/*"
            withCredentials
            defaultFileList={form.getFieldValue('media') ? [{
              uid: form.getFieldValue('media').id.toString(),
              name: form.getFieldValue('media').filename,
              status: 'done',
              url: form.getFieldValue('media').url,
              response: form.getFieldValue('media'),
            }] : []}
            onChange={({ file }) => {
              if (file.status === 'done') {
                console.log('File uploaded successfully:', file);
                form.setFieldValue('mediaId', file.response?.id || null);
              }
            }}
            onRemove={async (file) => {
              console.log('Removing file:', file);
              const id = file.response?.id;
              if (!id) return;
              await client.delete(`/api/media/${id}`);
              form.setFieldValue('mediaId', null);
            }}
          >
            <Button icon={<UploadOutlined />}>Pilih File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentForm;