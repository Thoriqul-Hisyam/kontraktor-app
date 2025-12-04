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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Project {
  id: number;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  status: "Planning" | "Ongoing" | "Completed";
  budget: number;
  progress: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([
    {
      id: 1,
      name: "Office Building",
      client: "PT. ABC",
      startDate: "2025-01-01",
      endDate: "2025-06-01",
      status: "Ongoing",
      budget: 50000000,
      progress: 40,
    },
    {
      id: 2,
      name: "Warehouse",
      client: "CV. XYZ",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
      status: "Planning",
      budget: 30000000,
      progress: 0,
    },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Project | null>(null);
  const [form, setForm] = React.useState({
    name: "",
    client: "",
    startDate: "",
    endDate: "",
    status: "Planning" as "Planning" | "Ongoing" | "Completed",
    budget: "",
    progress: "",
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      status: "Planning",
      budget: "",
      progress: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditing(project);
    setForm({
      name: project.name,
      client: project.client,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      budget: String(project.budget),
      progress: String(project.progress),
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                ...form,
                status: form.status as "Planning" | "Ongoing" | "Completed",
                budget: Number(form.budget),
                progress: Number(form.progress),
              }
            : p
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...form,
          status: form.status as "Planning" | "Ongoing" | "Completed",
          budget: Number(form.budget),
          progress: Number(form.progress),
        },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        <Button onClick={openAddModal}>Add Project</Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="border border-gray-300 bg-white shadow-sm rounded">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p, idx) => (
              <TableRow key={p.id} className="hover:bg-gray-50">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.client}</TableCell>
                <TableCell>{p.startDate}</TableCell>
                <TableCell>{p.endDate}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.budget.toLocaleString()}</TableCell>
                <TableCell>{p.progress}%</TableCell>
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
                      setProjects((prev) => prev.filter((x) => x.id !== p.id))
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
              {editing ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Project Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Client"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
            />
            <Input
              placeholder="Start Date"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            <Input
              placeholder="End Date"
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  status: value as "Planning" | "Ongoing" | "Completed",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Budget"
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
            <Input
              placeholder="Progress (%)"
              type="number"
              value={form.progress}
              onChange={(e) => setForm({ ...form, progress: e.target.value })}
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
