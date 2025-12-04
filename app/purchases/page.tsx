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

interface Purchase {
  id: number;
  material: string;
  vendor: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = React.useState<Purchase[]>([
    {
      id: 1,
      material: "Cement",
      vendor: "PT. ABC",
      quantity: 20,
      unit: "Bags",
      price: 50000,
      total: 1000000,
    },
    {
      id: 2,
      material: "Bricks",
      vendor: "CV. XYZ",
      quantity: 500,
      unit: "Pcs",
      price: 2000,
      total: 1000000,
    },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Purchase | null>(null);
  const [form, setForm] = React.useState({
    material: "",
    vendor: "",
    quantity: "",
    unit: "",
    price: "",
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({ material: "", vendor: "", quantity: "", unit: "", price: "" });
    setModalOpen(true);
  };

  const openEditModal = (purchase: Purchase) => {
    setEditing(purchase);
    setForm({
      material: purchase.material,
      vendor: purchase.vendor,
      quantity: String(purchase.quantity),
      unit: purchase.unit,
      price: String(purchase.price),
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const quantityNum = Number(form.quantity);
    const priceNum = Number(form.price);
    const totalNum = quantityNum * priceNum;

    if (editing) {
      setPurchases((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                material: form.material,
                vendor: form.vendor,
                quantity: quantityNum,
                unit: form.unit,
                price: priceNum,
                total: totalNum,
              }
            : p
        )
      );
    } else {
      setPurchases((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          material: form.material,
          vendor: form.vendor,
          quantity: quantityNum,
          unit: form.unit,
          price: priceNum,
          total: totalNum,
        },
      ]);
    }

    setModalOpen(false);
  };

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
                <TableCell>{p.material}</TableCell>
                <TableCell>{p.vendor}</TableCell>
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
                    onClick={() =>
                      setPurchases((prev) => prev.filter((x) => x.id !== p.id))
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
              {editing ? "Edit Purchase" : "Add Purchase"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Material"
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
            />
            <Input
              placeholder="Vendor"
              value={form.vendor}
              onChange={(e) => setForm({ ...form, vendor: e.target.value })}
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
            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
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
