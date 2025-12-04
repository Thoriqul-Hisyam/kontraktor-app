"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function listPurchases() {
  return prisma.purchase.findMany({
    orderBy: { createdAt: "desc" },
    include: { material: true, vendor: true }, // supaya bisa tampil nama
  });
}

export async function createPurchase(data: {
  materialId: number;
  vendorId: number;
  quantity: number;
  unit: string;
  price: number;
}) {
  const total = data.quantity * data.price;
  await prisma.purchase.create({
    data: {
      materialId: data.materialId,
      vendorId: data.vendorId,
      quantity: data.quantity,
      unit: data.unit,
      price: data.price,
      total,
    },
  });
  revalidatePath("/purchases");
}

export async function updatePurchase(
  id: number,
  data: {
    materialId: number;
    vendorId: number;
    quantity: number;
    unit: string;
    price: number;
  }
) {
  const total = data.quantity * data.price;
  await prisma.purchase.update({
    where: { id },
    data: {
      materialId: data.materialId,
      vendorId: data.vendorId,
      quantity: data.quantity,
      unit: data.unit,
      price: data.price,
      total,
    },
  });
  revalidatePath("/purchases");
}

export async function deletePurchase(id: number) {
  await prisma.purchase.delete({ where: { id } });
  revalidatePath("/purchases");
}
