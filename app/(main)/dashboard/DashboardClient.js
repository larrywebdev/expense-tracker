import IncomeExpense from "@/components/IncomeExpense";
import PieActiveArc from "@/components/PieActiveArc";

export default async function DashboardClient({
  user_metadata,
  expensesObj,
  currency,
}) {
  const { first_name, last_name } = user_metadata;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  const { totalIncome, totalExpenses, balance, expenses } = expensesObj;

  return (
    <div>
      <span className="text-xl sm:text-2xl font-medium block mb-4">
        Welcome, {first_name} {last_name}
      </span>
      <span>Total Balance</span>
      <span className="text-xl sm:text-2xl font-medium block">
        {formatter.format(balance)}
      </span>
      <div className="flex flex-col sm:flex-row gap-2 mt-5">
        <IncomeExpense
          style="bg-green-100 flex-4 md:max-w-100"
          money={formatter.format(totalIncome)}
        >
          Income
        </IncomeExpense>
        <IncomeExpense
          style="bg-red-100 flex-2 md:max-w-80"
          money={formatter.format(totalExpenses)}
        >
          Expense
        </IncomeExpense>
      </div>
      <div className="max-w-90 mt-7">
        <PieActiveArc expenses={expenses} totalExpenses={totalExpenses} />
      </div>
    </div>
  );
}
