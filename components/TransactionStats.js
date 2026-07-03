import { getCategories, getTransactions } from "@/lib/data-service";

export async function getExpenses() {
  const { categories } = await getCategories();
  const { transactions } = await getTransactions();

  const expenses = Object.values(
    transactions.reduce((acc, { category, amount, type }) => {
      if (type !== "Expense") return acc;

      if (!acc[category]) {
        acc[category] = {
          label: category,
          value: 0,
          color: categories.find(({ label }) => label === category)?.color,
        };
      }
      acc[category].value += amount;

      return acc;
    }, {}),
  );
  const totalExpenses = expenses.reduce((acc, { value }) => acc + value, 0);
  const totalIncome = transactions.reduce((acc, { type, amount }) => {
    if (type !== "Income") return acc;
    return acc + amount;
  }, 0);

  const balance = totalIncome - totalExpenses;
  return { totalIncome, totalExpenses, balance, expenses };
}

// import { getData } from "@/lib/data-service";
// import { getCategories } from "@/lib/data-service";
// // export const example = [
// //   {
// //     label: "Windows",
// //     value: 72.72,
// //   },
// //   {
// //     label: "OS X",
// //     value: 16.38,
// //   },
// //   {
// //     label: "Linux",
// //     value: 3.83,
// //   },
// //   {
// //     label: "Chrome OS",
// //     value: 2.42,
// //   },
// //   {
// //     label: "Other",
// //     value: 4.65,
// //   },
// // ];
// const { expense_tracker_categories: categories } = await getCategories();

// const [transactions] = await getData();
// const totalExpense = [transactions].reduce(
//   (acc, { amount, type }) => acc + (type === "Expense" ? amount : 0),
//   0,
// );

// export const expenses = Object.values(
//   [transactions].reduce((acc, { category, amount, type }) => {
//     if (type !== "Expense") return acc;

//     if (!acc[category]) {
//       acc[category] = {
//         label: category,
//         value: 0,
//         color: categories.find(({ label }) => label === category)?.color,
//       };
//     }

//     acc[category].value += amount;

//     return acc;
//   }, {}),
// );

// export const valueFormatter = (item) =>
//   `${((item.value / totalExpense) * 100).toFixed(0)}%`;
