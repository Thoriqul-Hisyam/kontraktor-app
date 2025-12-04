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
import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "@/actions/material";

interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = React.useState<Material[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Material | null>(null);
  const [form, setForm] = React.useState({ name: "", quantity: "", unit: "" });

  // Load materials on mount
  React.useEffect(() => {
    (async () => {
      const data = await getMaterials();
      setMaterials(data);
    })();
  }, []);

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

  const handleSave = async () => {
    const quantity = Number(form.quantity);

    if (editing) {
      const updated = await updateMaterial(editing.id, {
        name: form.name,
        quantity,
        unit: form.unit,
      });
      setMaterials((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
    } else {
      const created = await createMaterial({
        name: form.name,
        quantity,
        unit: form.unit,
      });
      setMaterials((prev) => [...prev, created]);
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteMaterial(id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
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
                    onClick={() => handleDelete(m.id)}
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
