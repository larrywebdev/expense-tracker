"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

function getCurrencySymbol(symbol) {
  const parts = new Intl.NumberFormat("en", {
    style: "currency",
    currency: symbol,
  }).formatToParts(0);

  return parts.find((part) => part.type === "currency").value;
}

function formatDate(date, style) {
  const pad = (n) => String(n).padStart(2, "0");
  const loc = (opts) => new Intl.DateTimeFormat("en-US", opts).format(date);

  const tokens = {
    YYYY: date.getFullYear(),
    MMMM: loc({ month: "long" }),
    MMM: loc({ month: "short" }),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    dddd: loc({ weekday: "long" }),
    ddd: loc({ weekday: "short" }),
  };

  return style.replace(/YYYY|MMMM|MMM|MM|DD|dddd|ddd/g, (m) => tokens[m]);
}

export function getColumns({
  editTransactionMode,
  showConfirmToast,
  currency,
  dateFormat,
}) {
  return [
    {
      accessorKey: "date",
      accessorFn: (row) => new Date(row.date),
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            {formatDate(new Date(row.original.date), dateFormat)}
          </div>
        );
      },
      sortingFn: "datetime",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
      filterFn: (row, columnId, filterValues) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(columnId));
      },
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const t = row.getValue("type");
        const isIncome = String(t).toLowerCase() === "income";
        return (
          <div
            className={`${isIncome ? "text-green-500" : "text-red-500"} pl-3`}
          >
            {isIncome ? "+" : "-"}
            {getCurrencySymbol(currency)}
            {Number(row.getValue("amount")).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: (row, columnId, filterValues) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(columnId));
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: (row, columnId, filterValues) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(row.getValue(columnId));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => editTransactionMode(data)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => showConfirmToast(data.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
