"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  FiPackage,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiBriefcase,
  FiActivity,
  FiClipboard,
} from "react-icons/fi";

export default function DashboardPage() {
  const stats = [
    { title: "Materials Available", value: 120, icon: <FiPackage /> },
    { title: "Low Stock Materials", value: 5, icon: <FiPackage /> },
    { title: "Vendors Active", value: 8, icon: <FiUsers /> },
    {
      title: "Pending Payments",
      value: "Rp 10.000.000",
      icon: <FiDollarSign />,
    },
    { title: "Projects Ongoing", value: 3, icon: <FiBriefcase /> },
    { title: "Projects Completed", value: 2, icon: <FiBriefcase /> },
    { title: "Team Members", value: 15, icon: <FiUsers /> },
    { title: "Revenue", value: "Rp 120.000.000", icon: <FiDollarSign /> },
    { title: "Expenses", value: "Rp 75.000.000", icon: <FiActivity /> },
    { title: "Profit", value: "Rp 45.000.000", icon: <FiDollarSign /> },
  ];

  const projectsProgress = [
    { name: "Office Building", progress: 40 },
    { name: "Warehouse", progress: 0 },
    { name: "Residential Complex", progress: 70 },
    { name: "Mall Renovation", progress: 55 },
  ];

  return (
    <main className="p-4 w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Contractor Dashboard
        </h1>

        {/* General Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <DashboardCard key={idx} {...stat} />
          ))}
        </div>

        {/* Project Progress */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Project Progress Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsProgress.map((p, idx) => (
              <div
                key={idx}
                className="p-4 bg-white shadow rounded border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-gray-600">{p.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
