import type { APIRoute } from "astro";

import { prisma } from "@/lib/prisma";

import { supplierSchema } from "@/lib/validators";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const validatedData = supplierSchema.parse(body);

    const supplier = await prisma.supplier.create({
      data: validatedData,
    });

    return new Response(JSON.stringify(supplier), {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to create supplier", {
      status: 400,
    });
  }
};
