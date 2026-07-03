"use client";
import { BsPlusCircleFill } from "react-icons/bs";
import DebouncedInput from "@/components/DebouncedInput.js";
import FilterPopover from "@/components/FilterPopover";
import MultiSelect from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteTransaction } from "@/lib/data-service";
import { useTransactionStore } from "@/store/useTransactionStore";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./columns";

export function DataTable({
  transactions: data,
  categories,
  currency,
  dateFormat,
  theme,
}) {
  const { addTransactionMode, editTransactionMode } = useTransactionStore();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({ type: false });
  const [open, setOpen] = useState(false);

  const showConfirmToast = (transactionId) => {
    setOpen(true);

    const confirmId = `delete-${transactionId}`;

    toast("Are you sure you want to delete this?", {
      id: confirmId,
      duration: Infinity,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            toast.dismiss(confirmId);

            const promise = deleteTransaction(transactionId);

            toast.promise(promise, {
              loading: "Deleting transaction...",
              success: "Transaction deleted",
              error: "Failed to delete transaction",
            });

            await promise;
            setOpen(false);
          } catch (error) {
            console.error(error);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(confirmId);
          setOpen(false);
        },
      },
    });
  };

  const cols = useMemo(
    () =>
      getColumns({
        editTransactionMode,
        showConfirmToast,
        currency,
        dateFormat,
      }),
    [],
  );

  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const rawFilters = table.getState().columnFilters;
  const activeFilters = rawFilters
    .map(({ id, value }) => (value.length > 0 ? id : null))
    .filter(Boolean);

  const categoryCol = table.getColumn("category");
  // helper: read category filter from table, and setter to update column filter
  const categoriesValue = categoryCol?.getFilterValue() ?? [];
  const setCategories = (vals) =>
    categoryCol?.setFilterValue(vals && vals.length ? vals : undefined);

  const clearFilter = (filter) => {
    const column = table.getColumn(filter);
    if (!column) return;
    if (filter === "description") column.setFilterValue("");
    else column.setFilterValue([]);
  };
  return (
    <div className="w-full">
      {open && <div className="fixed inset-0 z-25 bg-black/40" />}
      <div className="grid gap-2 sm:gap-4 lg:gap-3 sm:grid-cols-2 lg:grid-cols-4 py-4">
        <DebouncedInput
          value={table.getColumn("description")?.getFilterValue() ?? ""}
          onChange={(val) =>
            table.getColumn("description")?.setFilterValue(val)
          }
          placeholder="Search description..."
        />
        <MultiSelect
          options={categories}
          value={categoriesValue}
          onChange={setCategories}
          placeholder="Select categories"
        />

        <FilterPopover table={table} />
        <button
          aria-label="Add"
          onClick={addTransactionMode}
          className="hidden sm:flex rounded-lg py-1.75 px-5 font-semibold text-sm text-white bg-black justify-self-end items-center gap-1"
        >
          <Plus size={17} />
          Add Transaction
        </button>
        <BsPlusCircleFill
          className="inline sm:hidden cursor-pointer place-self-end"
          size={40}
          onClick={addTransactionMode}
        />
      </div>
      {activeFilters.length > 0 && (
        <div className="flex gap-1 items-center text-sm mb-3">
          Active filters:{" "}
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="px-2 py-1 text-white rounded-sm capitalize flex gap-1 items-center"
              style={{ backgroundColor: theme }}
            >
              {filter}{" "}
              <button
                onClick={() => clearFilter(filter)}
                className="cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={cols.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
