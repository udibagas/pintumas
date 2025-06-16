'use client';

import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";

export default function Header() {
  return (
    <header className="bg-gray-900 shadow text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-[#E6DABA]">
          <Image src='/pintumas.png' alt="Logo" width={20} height={20} className="inline-block mr-2" />
          PINTUMAS
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-[#E6DABA]">Beranda</Link>
          <Link href="/categories" className="hover:text-[#E6DABA]">Kategori</Link>
          <Link href="/about" className="hover:text-[#E6DABA]">Tentang Kami</Link>
          <Link href="/contact" className="hover:text-[#E6DABA]">Hubungi Kami</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Input.Search placeholder="Cari..." />
          <Link href="/login" className="text-sm hover:text-[#E6DABA]">Login</Link>
        </div>
      </div>
    </header>
  );
}