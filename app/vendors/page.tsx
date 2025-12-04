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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Vendor {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = React.useState<Vendor[]>([
    { id: 1, name: "PT. ABC", phone: "08123456789", email: "abc@mail.com" },
    { id: 2, name: "CV. XYZ", phone: "08234567890", email: "xyz@mail.com" },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Vendor | null>(null);
  const [form, setForm] = React.useState({ name: "", phone: "", email: "" });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", phone: "", email: "" });
    setModalOpen(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditing(vendor);
    setForm({ name: vendor.name, phone: vendor.phone, email: vendor.email });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setVendors((prev) =>
        prev.map((v) => (v.id === editing.id ? { ...v, ...form } : v))
      );
    } else {
      setVendors((prev) => [...prev, { id: prev.length + 1, ...form }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Vendors</h1>
        <Button onClick={openAddModal}>Add Vendor</Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="border border-gray-300 bg-white shadow-sm rounded">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((v, idx) => (
              <TableRow key={v.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.phone}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(v)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setVendors((prev) => prev.filter((x) => x.id !== v.id))
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Vendor" : "Add Vendor"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{editing ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
