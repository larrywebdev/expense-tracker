import IncomeExpense from "@/components/IncomeExpense";
import PieActiveArc from "@/components/PieActiveArc";
import { getExpenses } from "@/components/TransactionStats";
import { getUserSettings } from "@/lib/data-service";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function Page() {
  const supabase = await createClient();
  const { settings } = await getUserSettings();
  const { currency } = settings[0];
  const {
    data: {
      user: { user_metadata },
    },
  } = await supabase.auth.getUser();

  const expensesObj = await getExpenses();

  return (
    <DashboardClient
      user_metadata={user_metadata}
      currency={currency}
      expensesObj={expensesObj}
    />
  );
}
