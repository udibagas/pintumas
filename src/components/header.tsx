"use client";

import { CircleX, MenuIcon } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  return (
    <SessionProvider>
      <nav className="bg-gray-950 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            <div className="md:hidden text-white">
              <MobileMenu />
            </div>
            <Link href="/" className="text-lg font-bold text-yellow-500">PINTUMAS</Link>
          </div>
          <div className="hidden md:flex space-x-2">
            <Nav />
          </div>
        </div>
      </nav>
    </SessionProvider>
  )
}

function Nav() {
  const { data: session } = useSession();
  return (
    <>
      <Link href="/" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Beranda</Link>
      <Link href="/about" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Tentang Kami</Link>
      <Link href="/contact" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Hubungi Kami</Link>
      {session ? (
        <Link href="/profile" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">
          {session.user?.name || "Profile"}
        </Link>
      ) : (
        <Link href="/login" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Login</Link>
      )}
      {session && session.user?.role === "ADMIN" && (
        <Link href="/admin" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Admin</Link>
      )}
      {session && (
        <Link href="/logout" className="text-gray-300 py-1 px-6 rounded-full hover:text-white hover:bg-yellow-500">Logout</Link>
      )}
    </>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="text-gray-300 hover:text-white focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <CircleX /> : <MenuIcon />}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setOpen(false)}
          />
          {/* Sidebar */}
          <div className="relative bg-gray-800 w-64 h-full shadow-lg flex flex-col space-y-2 p-6">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-8 flex flex-col space-y-4">
              <Nav />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}