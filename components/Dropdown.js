"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserSetting } from "@/lib/data-service";
import { settingsSchema } from "@/lib/schema/settings.schema";
import { toast } from "sonner";

export function DropdownSelect({ name, placeholder, label, defaultValue }) {
  let data;
  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "NGN", label: "Nigerian Naira (₦)" },
    { value: "CAD", label: "Canadian Dollar ($)" },
    { value: "AUD", label: "Australian Dollar ($)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CNY", label: "Chinese Yuan (¥)" },
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "ZAR", label: "South African Rand (R)" },
    { value: "CHF", label: "Swiss Franc (CHF)" },
    { value: "SEK", label: "Swedish Krona (kr)" },
    { value: "NZD", label: "New Zealand Dollar ($)" },
    { value: "SGD", label: "Singapore Dollar ($)" },
    { value: "HKD", label: "Hong Kong Dollar ($)" },
  ];

  const themeColors = [
    { value: "#6366F1", label: "🟣 Indigo" },
    { value: "#000080", label: "🔵 NavyBlue" },
    { value: "#10B981", label: "🟢 Emerald" },
    { value: "#22C55E", label: "🟩 Green" },
    { value: "#EAB308", label: "🟡 Yellow" },
    { value: "#F97316", label: "🟠 Orange" },
    { value: "#EF4444", label: "🔴 Red" },
    { value: "#EC4899", label: "🌸 Pink" },
    { value: "#A855F7", label: "🟪 Purple" },
    { value: "#14B8A6", label: "🌊 Teal" },
    { value: "#0EA5E9", label: "💧 Sky" },
    { value: "#84CC16", label: "🌿 Lime" },
    { value: "#F43F5E", label: "🌹 Rose" },
    { value: "#64748B", label: "⚙️ Slate" },
  ];

  const dateFormats = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    { value: "DD MMM YYYY", label: "DD MMM YYYY" },
    { value: "MMM DD, YYYY", label: "MMM DD, YYYY" },
    { value: "MMMM DD, YYYY", label: "MMMM DD, YYYY" },
    { value: "DD MMMM YYYY", label: "DD MMMM YYYY" },
    { value: "ddd, MMM DD, YYYY", label: "ddd, MMM DD, YYYY" },
    { value: "dddd, MMMM DD, YYYY", label: "dddd, MMMM DD, YYYY" },
    { value: "YYYY/MM/DD", label: "YYYY/MM/DD" },
  ];
  if (name === "currency") {
    data = currencies;
  } else if (name === "date_format") {
    data = dateFormats;
  } else if (name === "theme_color") {
    data = themeColors;
  }
  const changeSetting = async (value) => {
    const result = settingsSchema.shape[Object.keys(value)[0]].safeParse(
      Object.values(value)[0],
    );
    if (result.success)
      try {
        const response = await updateUserSetting(value);
        if (response?.success) {
          toast.success("Setting saved");
        }
      } catch (error) {
        toast.error(error.message);
      }
  };
  return (
    <Select
      value={defaultValue}
      onValueChange={(value) => {
        changeSetting({ [name]: value });
      }}
    >
      <SelectTrigger className="w-full sm:max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
