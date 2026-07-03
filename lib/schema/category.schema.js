import { z } from "zod";

export const addCategorySchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Input a category")
    .max(20, "Maximum of 20 characters allowed"),
  color: z.enum(
    [
      "#A855F7",
      "#E11D48",
      "#22C55E",
      "#1D4ED8",
      "#F97316",
      "#0D9488",
      "#EAB308",
      "#EC4899",
      "#8B5CF6",
      "#14B8A6",
      "#84CC16",
      "#F43F5E",
      "#6366F1",
      "#64748B",
      "#374151",
      "#111827",
      "#F1F5F9",
      "#D946EF",
      "#0EA5E9",
      "#10B981",
      "#FB7185",
    ],
    { error: "Please select a valid color" },
  ),
});

export const editCategorySchema = addCategorySchema.extend({
  id: z.number().min(1, "Category ID is required"),
});
