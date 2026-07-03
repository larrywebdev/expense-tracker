"use client";

import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ expenses, totalExpenses }) {
  const valueFormatter = (item) =>
    `${((item.value / totalExpenses) * 100).toFixed(0)}%`;

  return (
    <PieChart
      series={[
        {
          data: expenses,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter,
        },
      ]}
    />
  );
}
