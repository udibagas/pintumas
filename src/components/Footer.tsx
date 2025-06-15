'use client';

import Link from "next/link";
import { FacebookOutlined, InstagramOutlined, TwitterSquareFilled } from "@ant-design/icons"
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="font-bold text-2xl mb-2 text-yellow-200">
            <Image src='/pintumas.png' alt="Logo" width={15} height={15} className="inline-block mr-2" />
            PINTUMAS
          </div>
          <div className="mt-1 mb-4 text-slate-500">Pusat Informasi Terpadu Pelabuhan Tanjung Mas</div>
          <div className="text-xs">&copy; {new Date().getFullYear()} News Portal. All rights reserved.</div>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <a href="/about" className="hover:underline">About</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="#" className="hover:text-yellow-500">
            <FacebookOutlined className="text-3xl" />
          </Link>
          <Link href="#" className="hover:text-yellow-500">
            <TwitterSquareFilled className="text-3xl" />
          </Link>
          <Link href="#" className="hover:text-yellow-500">
            <InstagramOutlined className="text-3xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}