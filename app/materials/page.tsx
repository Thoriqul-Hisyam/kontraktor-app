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

interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = React.useState<Material[]>([
    { id: 1, name: "Cement", quantity: 50, unit: "Bags" },
    { id: 2, name: "Bricks", quantity: 1000, unit: "Pcs" },
    { id: 3, name: "Sand", quantity: 20, unit: "m³" },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Material | null>(null);
  const [form, setForm] = React.useState({ name: "", quantity: "", unit: "" });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", quantity: "", unit: "" });
    setModalOpen(true);
  };

  const openEditModal = (row: Material) => {
    setEditing(row);
    setForm({ name: row.name, quantity: String(row.quantity), unit: row.unit });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === editing.id
            ? { ...m, ...form, quantity: Number(form.quantity) }
            : m
        )
      );
    } else {
      setMaterials((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: form.name,
          quantity: Number(form.quantity),
          unit: form.unit,
        },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Materials</h1>
        <Button onClick={openAddModal}>Add Material</Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="border border-gray-300 bg-white shadow-sm rounded">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((m, idx) => (
              <TableRow key={m.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.quantity}</TableCell>
                <TableCell>{m.unit}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(m)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setMaterials((prev) => prev.filter((x) => x.id !== m.id))
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

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Material" : "Add Material"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <Input
              placeholder="Unit"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
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
