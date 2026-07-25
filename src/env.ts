import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://verstivo.com"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
});

export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://verstivo.com",
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
