"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiShoppingCart,
  FiBriefcase,
  FiUser,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const links = [
    { title: "Dashboard", href: "/", icon: <FiHome /> },
    { title: "Materials", href: "/materials", icon: <FiPackage /> },
    { title: "Vendors", href: "/vendors", icon: <FiUsers /> },
    { title: "Purchases", href: "/purchases", icon: <FiShoppingCart /> },
    { title: "Projects", href: "/projects", icon: <FiBriefcase /> },
    { title: "Team", href: "/team", icon: <FiUser /> },
    { title: "Reports", href: "/reports", icon: <FiBarChart2 /> },
    { title: "Settings", href: "/settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Backdrop overlay di mobile */}
      <div
        className={`fixed inset-0  bg-opacity-30 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 w-64 p-6 bg-white shadow-md z-50 transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kontraktor</h1>

          {/* Tombol X di mobile */}
          <button
            className="md:hidden text-gray-800 text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all
                  ${
                    active
                      ? "bg-gray-200 font-semibold text-gray-900"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
