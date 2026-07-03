import { AddEditTransaction } from "@/components/AddEditTransaction";
import {
  getCategories,
  getTransactions,
  getUserSettings,
} from "@/lib/data-service";
import { DataTable } from "./data-table";
export default async function DemoPage() {
  const { categories } = await getCategories();
  const { transactions } = await getTransactions();
  const { settings } = await getUserSettings();
  const { currency, date_format, theme_color } = settings[0];
  return (
    <div className="w-full pb-5">
      <DataTable
        transactions={transactions}
        categories={categories}
        currency={currency}
        dateFormat={date_format}
        theme={theme_color}
      />
      <AddEditTransaction categories={categories} />
    </div>
  );
}
