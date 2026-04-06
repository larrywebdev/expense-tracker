import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Input a description")
    .max(20, "Maximum of 20 characters allowed"),
  amount: z
    .string()
    .min(1, "Amount is required") // Ensures it isn't an empty string
    .refine((val) => !isNaN(Number(val)), "Please enter a number") // Blocks non-numbers
    .transform((val) => Number(val)) // Safely convert to a number
    .refine((val) => val > 0, "Enter a valid amount"),
  paymentMethod: z
    .string()
    .refine(
      (val) => ["Bank Transfer", "Auto-pay", "Card", "Cash"].includes(val),
      "Please select a valid payment method",
    ),
  category: z
    .string()
    .refine(
      (val) =>
        [
          "Entertainment",
          "Food & Dining",
          "Health",
          "Housing",
          "Income",
          "Shopping",
          "Transportation",
          "Utilities",
        ].includes(val),
      "Please select a valid category",
    ),

  type: z
    .string()
    .refine(
      (val) => ["Income", "Expense"].includes(val),
      "Please select a valid category",
    ),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(new Date(val)), "Invalid date"),
  status: z
    .string()
    .refine(
      (val) => ["Completed", "Pending", "Failed"].includes(val),
      "Please select a valid status",
    ),
});
