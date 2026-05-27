import type { APIRoute } from "astro";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";

export const GET: APIRoute = async ({ params }) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return new Response("Product not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to fetch product", {
      status: 500,
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const body = await request.json();

    const validatedData = productSchema.parse(body);

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },

      data: {
        ...validatedData,

        supplierId: validatedData.supplierId || null,
      },
    });

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to update product", {
      status: 400,
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return new Response("Product deleted", {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to delete product", {
      status: 400,
    });
  }
};
