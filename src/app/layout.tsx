"use client";

import '@ant-design/v5-patch-for-react-19';
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient()

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>PINTUMAS - Pusat Informasi Terpadu Pelabuhan Tanjung Mas</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
