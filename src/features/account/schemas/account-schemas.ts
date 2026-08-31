import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name is required."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last Name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^(?:\+91\s?)?[6789]\d{9}$/, "Please enter a valid 10-digit phone number."),
});

export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current Password is required."),
    newPassword: z
      .string()
      .min(1, "New Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    confirmNewPassword: z
      .string()
      .min(1, "Confirm New Password is required."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm password does not match new password.",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const addressSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required."),
  lastName: z.string().trim().min(1, "Last Name is required."),
  address1: z.string().trim().min(1, "Address 1 is required."),
  address2: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required."),
  country: z.string().trim().min(1, "Country/region is required."),
  province: z.string().trim().min(1, "Province is required."),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal/ZIP code is required.")
    .regex(/^[0-9]{5,6}$/, "Please enter a valid Postal/ZIP code."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^(?:\+91\s?)?[6789]\d{9}$/, "Please enter a valid 10-digit phone number."),
  setAsDefault: z.boolean().optional(),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
