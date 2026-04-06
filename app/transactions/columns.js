"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function getColumns({ onEdit } = {}) {
  const capitalize = (str) => {
    return str?.[0].toUpperCase() + str?.slice(1);
  };

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
        return <div className="pl-3">{row.original.date}</div>;
      },
      sortingFn: "datetime",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return <div>{capitalize(row.original.description)}</div>;
      },
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
      accessorKey: "paymentMethod",
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
            {isIncome ? "+" : "-"}${row.getValue("amount")}
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
                onClick={() => onEdit?.(data)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
