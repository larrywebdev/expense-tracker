"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Div } from "./AddEditTransaction";

export function DateSelector({ error, form }) {
  const [open, setOpen] = useState(false);
  return (
    <form.Field name="date">
      {(field) => (
        <div className="grid">
          <Label htmlFor={field.name} className="px-1 mb-1">
            Date
          </Label>
          <Div>
            <div className="relative flex gap-2">
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={field.state.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (!date) return;
                      field.handleChange(
                        date.toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }),
                      );
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {error(field)}
          </Div>
        </div>
      )}
    </form.Field>
  );
}
