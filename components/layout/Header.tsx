"use client";

import { usePathname } from "next/navigation";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const pathname = usePathname();

  // konversi path ke title
  const pageTitle =
    pathname === "/"
      ? "Dashboard"
      : pathname.slice(1).replace(/^\w/, (c) => c.toUpperCase());

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger di mobile */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h2 className="text-xl font-semibold text-gray-900">{pageTitle}</h2>
      </div>
      <div>{/* optional actions */}</div>
    </header>
  );
};
