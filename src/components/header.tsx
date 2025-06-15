'use client';

import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";

export default function Header() {
  return (
    <header className="bg-gray-900 shadow text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-yellow-600">
          <Image src='/pintumas.png' alt="Logo" width={20} height={20} className="inline-block mr-2" />
          PINTUMAS
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-yellow-600">Beranda</Link>
          <Link href="/categories" className="hover:text-yellow-600">Kategori</Link>
          <Link href="/about" className="hover:text-yellow-600">Tentang Kami</Link>
          <Link href="/contact" className="hover:text-yellow-600">Hubungi Kami</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Input.Search placeholder="Cari..." />
          <Link href="/login" className="text-sm hover:text-yellow-600">Login</Link>
        </div>
      </div>
    </header>
  );
}