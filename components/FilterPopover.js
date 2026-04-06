"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandList, CommandItem } from "./ui/command";

function MultiSelectFilter({ label, column, options }) {
  const [open, setOpen] = useState(false);
  const selected = column.getFilterValue() || [];

  const toggle = (value) => {
    if (selected.includes(value)) {
      column.setFilterValue(selected.filter((v) => v !== value));
    } else {
      column.setFilterValue([...selected, value]);
    }
  };

  const clearAll = () => {
    column.setFilterValue([]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{label}</Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full min-w-40">
        <Command>
          <CommandList className="max-h-60 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => toggle(option)}
                className={`cursor-pointer ${
                  selected.includes(option) ? "font-medium" : "font-normal"
                }`}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selected.includes(option) ? "opacity-100" : "opacity-0"
                  }`}
                />
                {option}
              </CommandItem>
            ))}
          </CommandList>
        </Command>

        {selected.length > 0 && (
          <div className="border-t">
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="w-full text-xs cursor-pointer"
            >
              Clear all
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default function FilterPopover({ table }) {
  const typeCol = table.getColumn("type");
  const statusCol = table.getColumn("status");

  return (
    <div className="flex gap-3">
      <MultiSelectFilter
        label="Type"
        column={typeCol}
        options={["Income", "Expense"]}
      />

      <MultiSelectFilter
        label="Status"
        column={statusCol}
        options={["Completed", "Pending", "Failed"]}
      />
    </div>
  );
}
