import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "PINTUMAS",
  description: "Pusat Informasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 flex">
        <aside className="w-64 hidden lg:block px-4 lg:px-8">
          <div className="bg-muted p-4 rounded-xl">
            Ini nanti sidebar
          </div>
          {/* Sidebar content can go here */}
        </aside>
        <div className="flex-1 px-4 lg:px-8">
          {/* Main content area */}
          <div className="grid gap-6">
            {children}
          </div>
        </div>
      </div>
      <footer className="bg-muted py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PINTUMAS. All rights reserved.
        </p>
      </footer>
    </>
  );
}
