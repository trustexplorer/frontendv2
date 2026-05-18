import { Sidebar } from "@/components/dashboard/sidebar";
import React, { useState } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden pt-4">
      {/* Sidebar for md and up */}
      <div className="hidden md:block w-64 h-full">
        <Sidebar isAdmin={false} />
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 md:hidden z-50 bg-primary text-white px-2 py-1 rounded"
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar for small screens */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="fixed top-0 left-0 w-64 h-full  shadow-lg">
            <Sidebar isAdmin={false} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
