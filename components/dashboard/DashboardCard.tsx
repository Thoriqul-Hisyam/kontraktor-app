"use client";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="container-auto flex items-center p-4 rounded shadow border border-gray-300 bg-white w-full min-h-[80px]">
      {icon && <div className="text-2xl mr-4 text-gray-800">{icon}</div>}
      <div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className="text-xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
};
