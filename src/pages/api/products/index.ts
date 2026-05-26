import type { APIRoute } from "astro";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";

export const GET: APIRoute = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch products", {
      status: 500,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedData,
    });

    return new Response(JSON.stringify(product), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Invalid product data",
      }),
      {
        status: 400,
      }
    );
  }
};
