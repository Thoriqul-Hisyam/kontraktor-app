"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function listVendors() {
  return prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createVendor(data: {
  name: string;
  phone: string;
  email: string;
}) {
  await prisma.vendor.create({ data });
  revalidatePath("/vendors");
}

export async function updateVendor(
  id: number,
  data: {
    name: string;
    phone: string;
    email: string;
  }
) {
  await prisma.vendor.update({
    where: { id },
    data,
  });

  revalidatePath("/vendors");
}

export async function deleteVendor(id: number) {
  await prisma.vendor.delete({
    where: { id },
  });

  revalidatePath("/vendors");
}
