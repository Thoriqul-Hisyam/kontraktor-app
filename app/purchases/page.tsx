"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  listPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "@/actions/purchase";
import { getMaterials } from "@/actions/material";
import { listVendors } from "@/actions/vendor";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Material {
  id: number;
  name: string;
  unit: string;
}

interface Vendor {
  id: number;
  name: string;
}

interface Purchase {
  id: number;
  material: Material;
  vendor: Vendor;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);
  const [materials, setMaterials] = React.useState<Material[]>([]);
  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Purchase | null>(null);
  const [form, setForm] = React.useState({
    materialId: 0,
    vendorId: 0,
    quantity: "",
    unit: "",
    price: "",
  });

  // Load initial data
  React.useEffect(() => {
    async function load() {
      const [p, m, v] = await Promise.all([
        listPurchases(),
        getMaterials(),
        listVendors(),
      ]);
      setPurchases(p);
      setMaterials(m);
      setVendors(v);
    }
    load();
  }, []);

  // Open add modal
  const openAddModal = () => {
    setEditing(null);
    setForm({ materialId: 0, vendorId: 0, quantity: "", unit: "", price: "" });
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (purchase: Purchase) => {
    setEditing(purchase);
    setForm({
      materialId: purchase.material.id,
      vendorId: purchase.vendor.id,
      quantity: String(purchase.quantity),
      unit: purchase.unit,
      price: String(purchase.price),
    });
    setModalOpen(true);
  };

  // Auto update unit when material changes
  React.useEffect(() => {
    const selectedMaterial = materials.find((m) => m.id === form.materialId);
    if (selectedMaterial) {
      setForm((prev) => ({ ...prev, unit: selectedMaterial.unit }));
    }
  }, [form.materialId, materials]);

  // Handle save
  const handleSave = async () => {
    const payload = {
      materialId: form.materialId,
      vendorId: form.vendorId,
      quantity: Number(form.quantity),
      unit: form.unit,
      price: Number(form.price),
    };

    if (editing) {
      await updatePurchase(editing.id, payload);
    } else {
      await createPurchase(payload);
    }

    const updated = await listPurchases();
    setPurchases(updated);
    setModalOpen(false);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    await deletePurchase(id);
    const updated = await listPurchases();
    setPurchases(updated);
  };

  // Live total preview
  const totalPreview = Number(form.quantity || 0) * Number(form.price || 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Purchases</h1>
        <Button onClick={openAddModal}>Add Purchase</Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="border border-gray-300 bg-white shadow-sm rounded">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((p, idx) => (
              <TableRow key={p.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.material.name}</TableCell>
                <TableCell>{p.vendor.name}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>{p.unit}</TableCell>
                <TableCell>{p.price.toLocaleString()}</TableCell>
                <TableCell>{p.total.toLocaleString()}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
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
              {editing ? "Edit Purchase" : "Add Purchase"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              value={form.materialId ? String(form.materialId) : ""}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, materialId: Number(val) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.vendorId ? String(form.vendorId) : ""}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, vendorId: Number(val) }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((v) => (
                  <SelectItem key={v.id} value={String(v.id)}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, quantity: e.target.value }))
              }
            />
            <Input placeholder="Unit" value={form.unit} readOnly />
            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <div className="text-right font-semibold">
              Total: {totalPreview.toLocaleString()}
            </div>
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
