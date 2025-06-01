import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema } from "./commonSchemas.js";

// Registration schema

export const registrationSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

// Login schema

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

// Complete profile schema (country field will be updated to countryIdArraySchema after we'll add dropdown in a form)

export const completeProfileSchema = z
  .object({
    name: nameSchema,
    surname: nameSchema,
    country: nameSchema,
  })
  .strict();

// Email verification schema

export const verifyEmailSchema = z
  .object({
    token: z.string().min(1, "Verification token is required"),
  })
  .strict();

// Forgot password schema

export const forgotPasswordSchema = z
  .object({
    email: emailSchema,
  })
  .strict();

// Password reset schema

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
  })
  .strict();
