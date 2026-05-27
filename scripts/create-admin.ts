import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("Admin123*", 10);

  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: "Admin",
      email: "admin@glosstrack.com",
      emailVerified: true,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: "email",
          providerId: "credential",
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });
  console.log("Admin created");
}
main();
