import z from "zod";

export const settingsSchema = z.object({
  currency: z.enum(
    [
      "USD",
      "EUR",
      "GBP",
      "NGN",
      "CAD",
      "AUD",
      "JPY",
      "CNY",
      "INR",
      "ZAR",
      "CHF",
      "SEK",
      "NZD",
      "SGD",
      "HKD",
    ],
    {
      error: "Please select a valid currency.",
    },
  ),
  date_format: z.enum(
    [
      "MM/DD/YYYY",
      "DD/MM/YYYY",
      "YYYY-MM-DD",
      "DD MMM YYYY",
      "MMM DD, YYYY",
      "MMMM DD, YYYY",
      "DD MMMM YYYY",
      "ddd, MMM DD, YYYY",
      "dddd, MMMM DD, YYYY",
      "YYYY/MM/DD",
    ],
    {
      error: "Please select a valid date format.",
    },
  ),
  theme_color: z.enum(
    [
      "#6366F1",
      "#000080",
      "#10B981",
      "#22C55E",
      "#EAB308",
      "#F97316",
      "#EF4444",
      "#EC4899",
      "#A855F7",
      "#14B8A6",
      "#0EA5E9",
      "#84CC16",
      "#F43F5E",
      "#64748B",
    ],
    {
      error: "Please select a valid theme.",
    },
  ),
});
