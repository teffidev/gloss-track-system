import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await auth.api.signUpEmail({
      body: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    await prisma.user.update({
      where: {
        id: result.user.id,
      },

      data: {
        role: body.role,
      },
    });

    return new Response(JSON.stringify(result), {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to create user", {
      status: 500,
    });
  }
};
