'use client';

import { Button, Divider, Input, Space, Typography } from "antd";
import Link from "next/link";
import { FacebookOutlined, HeartOutlined, InstagramOutlined, MailOutlined, TwitterOutlined } from "@ant-design/icons";
import PopularPost from "./post/PopularPost";
const { Text } = Typography;

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <PopularPost />
      </section>
      <section>
        <Divider orientation="left">
          <Space>
            <MailOutlined />
            <Text strong>Buletin</Text>
          </Space>
        </Divider>
        <div className="text-slate-500 text-sm mb-4">Dapatkan pemberitahuan jika ada konten baru</div>
        <form className="flex flex-col gap-2">
          <Input type="email" placeholder="Email Anda" />
          <Button color="default" variant="solid">Langganan</Button>
        </form>
      </section>
      <section>
        <Divider orientation="left">
          <Space>
            <HeartOutlined />
            <Text strong>Ikuti Kami</Text>
          </Space>
        </Divider>
        <div className="flex gap-2">
          <Link href="#">
            <FacebookOutlined className="text-4xl" />
          </Link>
          <Link href="#">
            <TwitterOutlined className="text-4xl" />
          </Link>
          <Link href="#">
            <InstagramOutlined className="text-4xl" />
          </Link>
        </div>
      </section>
      <section>
        {/* <h3 className="font-bold mb-2">Iklan</h3> */}
        <div className="bg-gray-200 h-200 rounded flex items-center justify-center text-gray-500">Ruang Iklan</div>
      </section>
    </div>
  );
}