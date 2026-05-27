import type { APIRoute } from "astro";

import { prisma } from "@/lib/prisma";

import { supplierSchema } from "@/lib/validators";

export const GET: APIRoute = async ({ params }) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!supplier) {
      return new Response("Supplier not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(supplier));
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch supplier", {
      status: 500,
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const body = await request.json();

    const validatedData = supplierSchema.parse(body);

    const supplier = await prisma.supplier.update({
      where: {
        id: params.id,
      },

      data: validatedData,
    });

    return new Response(JSON.stringify(supplier));
  } catch (error) {
    console.error(error);

    return new Response("Failed to update supplier", {
      status: 400,
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await prisma.supplier.delete({
      where: {
        id: params.id,
      },
    });

    return new Response("Supplier deleted");
  } catch (error) {
    console.error(error);

    return new Response("Failed to delete supplier", {
      status: 400,
    });
  }
};
