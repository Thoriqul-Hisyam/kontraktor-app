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

interface TeamMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

export default function TeamPage() {
  const [team, setTeam] = React.useState<TeamMember[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      phone: "08123456789",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Site Engineer",
      phone: "08234567890",
      email: "jane@example.com",
    },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TeamMember | null>(null);
  const [form, setForm] = React.useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", role: "", phone: "", email: "" });
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditing(member);
    setForm({
      name: member.name,
      role: member.role,
      phone: member.phone,
      email: member.email,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setTeam((prev) =>
        prev.map((m) => (m.id === editing.id ? { ...m, ...form } : m))
      );
    } else {
      setTeam((prev) => [...prev, { id: prev.length + 1, ...form }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Team</h1>
        <Button onClick={openAddModal}>Add Team Member</Button>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded border border-gray-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m, idx) => (
              <TableRow key={m.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>{m.email}</TableCell>
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
                      setTeam((prev) => prev.filter((x) => x.id !== m.id))
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
              {editing ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
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
