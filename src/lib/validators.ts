import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  sku: z.string().min(3, "SKU is required"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  supplierId: z.string().nullable().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
