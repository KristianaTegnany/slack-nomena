"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import { Navbar } from "@/components/ui/navbar";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ workspaceID: string }>;
};

const Layout = ({ children, params }: LayoutProps) => {
  const resolvedParams = React.use(params)
  const router = useRouter();
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto]">
      {/* Navbar */}
      <nav className="col-span-3 bg-gray-800 text-white">
        <Navbar />
      </nav>

      <Sidebar workspaceid={resolvedParams.workspaceID} />

      <main className="bg-white col-span-2">
        {children}
      </main>
    </div>
  );
};

export default Layout;