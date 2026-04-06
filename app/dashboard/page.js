"use client";

import IncomeExpense from "../../components/IncomeExpense";
import PieActiveArc from "../../components/PieActiveArc";
export default function Page() {
  return (
    <div>
      <span>Total Balance</span>
      <span className="text-3xl font-medium block">$500.00</span>
      <div className="flex gap-2 mt-5">
        <IncomeExpense style="bg-green-100 flex-4 max-w-100" money={"5,000.00"}>
          Income
        </IncomeExpense>
        <IncomeExpense style="bg-red-100 flex-2 max-w-80" money={"4,500.00"}>
          Expense
        </IncomeExpense>
      </div>
      <div className="mt-10 ml-10 justify-items-start">
        <PieActiveArc />
      </div>
    </div>
  );
}
