"use client";
import { useState } from "react";
import { AddEditDialog } from "../../components/AddEditDialog";
import { DataTable } from "./data-table";
export default function UserTableClient({ data }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <DataTable
        data={data}
        onEdit={(row) => {
          setSelectedRow(row);
          setOpen(true);
        }}
      />
      <AddEditDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedRow(null);
          }
          setOpen(isOpen);
        }}
        data={selectedRow}
      />
    </>
  );
}
