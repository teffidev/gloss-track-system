import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/products", "/suppliers", "/users", "/settings"];


export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return next();
  }

  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (!session) {
    return context.redirect("/login");
  }

  context.locals.user = session.user;

  return next();
});
