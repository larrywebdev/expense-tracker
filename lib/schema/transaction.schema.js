import { z } from "zod";

export const addTransactionSchema = z.object({
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
  payment_method: z.enum(["Bank Transfer", "Auto-pay", "Card", "Cash"], {
    error: "Please select a valid payment method",
  }),
  category: z.enum(
    [
      "Entertainment",
      "Food & Dining",
      "Health",
      "Housing",
      "Income",
      "Shopping",
      "Transportation",
      "Utilities",
    ],
    { error: "Please select a valid category" },
  ),

  type: z.enum(["Income", "Expense"], { error: "Please select a valid type" }),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(new Date(val)), "Invalid date"),
  status: z.enum(["Completed", "Pending", "Failed"], {
    error: "Please select a valid status",
  }),
});

export const editTransactionSchema = addTransactionSchema.extend({
  id: z.number().min(1, "Transaction ID is required"),
});
