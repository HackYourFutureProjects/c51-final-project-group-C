// 👇 This file is for schemas that we use in multiple places (email, password, name, etc.)

import { z } from "zod";

// Email schema
export const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(5, "Email must be at least 5 characters")
  .max(255, "Email must not exceed 255 characters");

// Password schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

// Name schema (we can use it both for name, surname, trip name, etc)
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .regex(
    /^[a-zA-Z\s-]+$/,
    "Name can only contain letters, spaces, and hyphens",
  );

// Mongo ObjectId schema (needed for countrySchema, we'll use for select in CreateTripModal)
export const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

// Country schema (for createTripModalSchema, later we will add it to CompleteProfileSchema as well)
export const countryIdArraySchema = z
  .array(objectIdSchema)
  .min(1, "At least one country must be selected");

// URL schema (now unused, later we will use it for image urls (avatar, event photos, etc)
export const urlSchema = z
  .string()
  .url("Invalid URL format")
  .max(2048, "URL must not exceed 2048 characters");

// Title schema (for trip title, activity name, etc)
export const titleSchema = z
  .string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  })
  .trim()
  .min(3, "Title must be at least 3 characters")
  .max(80, "Title must not exceed 80 characters");
