"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReportRow {
  id: number;
  type: string;
  description: string;
  date: string;
  amount: string;
}

export default function ReportPage() {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");

  const [reports, setReports] = React.useState<ReportRow[]>([
    {
      id: 1,
      type: "Material",
      description: "Cement purchase",
      date: "2025-12-01",
      amount: "Rp 1.200.000",
    },
    {
      id: 2,
      type: "Vendor",
      description: "Payment to CV. XYZ",
      date: "2025-12-02",
      amount: "Rp 2.500.000",
    },
    {
      id: 3,
      type: "Project",
      description: "Site work expenses",
      date: "2025-12-03",
      amount: "Rp 3.000.000",
    },
  ]);

  const handleFilter = () => {
    alert(`Filtering from ${fromDate} to ${toDate} (dummy)`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Reports</h1>

      {/* Filter Card */}
      <div className="bg-white shadow-sm rounded border border-gray-300 p-4 mb-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From"
        />
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To"
        />
        <Button onClick={handleFilter}>Filter</Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded border border-gray-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((r, idx) => (
              <TableRow key={r.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.description}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
