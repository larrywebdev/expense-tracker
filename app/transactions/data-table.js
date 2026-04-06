"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import DebouncedInput from "@/components/DebouncedInput.js";
import { X } from "lucide-react";
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
import { categoryOptions } from "@/lib/data-service";
import { getColumns } from "./columns";
export function DataTable({ data, onEdit }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({ type: false });
  const cols = useMemo(() => getColumns({ onEdit }), [onEdit]);
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
    <>
      <div className="flex items-center py-4">
        <DebouncedInput
          value={table.getColumn("description")?.getFilterValue() ?? ""}
          onChange={(val) =>
            table.getColumn("description")?.setFilterValue(val)
          }
          placeholder="Search description..."
          className="max-w-sm"
        />
        <div className="p-4 w-[300px]">
          <MultiSelect
            options={categoryOptions}
            value={categoriesValue}
            onChange={setCategories}
            placeholder="Select categories"
          />
        </div>
        <FilterPopover table={table} />
        <button
          aria-label="Add"
          onClick={() => onEdit()}
          className="rounded-lg py-1.75 px-7.5 font-bold text-sm text-white bg-black m-auto"
        >
          Add Transaction
        </button>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex gap-1 items-center text-sm mb-3">
          Active filters:{" "}
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="px-2 py-1 bg-blue-500 text-white rounded-sm capitalize flex gap-1 items-center"
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
                  data-state={row.getIsSelected() && "selected"}
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
    </>
  );
}
