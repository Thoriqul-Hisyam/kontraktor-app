"use server";

import { prisma } from "@/lib/prisma";

export async function getMaterials() {
  return prisma.material.findMany({ orderBy: { id: "asc" } });
}

export async function createMaterial(data: {
  name: string;
  quantity: number;
  unit: string;
}) {
  return prisma.material.create({ data });
}

export async function updateMaterial(
  id: number,
  data: { name?: string; quantity?: number; unit?: string }
) {
  return prisma.material.update({ where: { id }, data });
}

export async function deleteMaterial(id: number) {
  return prisma.material.delete({ where: { id } });
}
