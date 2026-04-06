"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function MultiSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);

  // Helper to get selected items in the order of the `value` array (like MUI)
  const selectedItems = value
    .map((val) => options.find((o) => o.value === val))
    .filter(Boolean);

  // Helper to return className for menu items (mimic MUI font-weight change)
  const getItemClass = (val) =>
    value.includes(val) ? "font-medium" : "font-normal";

  const toggleValue = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const clearAll = () => {
    onChange([]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between min-h-9 cursor-pointer"
        >
          <div className="flex-1 min-w-0 text-left">
            <span className="block truncate">
              {selectedItems.length > 0
                ? selectedItems.map((s) => s.label).join(", ")
                : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full min-w-[200px]">
        <Command>
          <CommandList className="max-h-60 overflow-auto">
            {options.length === 0 ? (
              <CommandEmpty>No options available.</CommandEmpty>
            ) : (
              options.map((option) => (
                <CommandItem
                  key={option.label}
                  onSelect={() => toggleValue(option.label)}
                  className={`cursor-pointer ${getItemClass(option.label)}`}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value.includes(option.label) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {option.label}
                </CommandItem>
              ))
            )}
          </CommandList>
        </Command>

        {value.length > 0 && (
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
