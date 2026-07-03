"use client";

import { useCategoryStore } from "@/store/useCategoryStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  addCategorySchema,
  editCategorySchema,
} from "@/lib/schema/category.schema";
import { useForm } from "@tanstack/react-form";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/lib/data-service";

const PRESET_COLORS = [
  "#A855F7",
  "#E11D48",
  "#22C55E",
  "#1D4ED8",
  "#F97316",
  "#0D9488",
  "#EAB308",
  "#EC4899",
  "#F43F5E",
  "#64748B",
  "#111827",
  "#F1F5F9",
  "#0EA5E9",
];

export function AddEditCategory() {
  const { isOpen, mode, selectedItem, close } = useCategoryStore();

  const getFormValues = (item) => ({
    ...(item?.id ? { id: item.id } : {}),
    label: item?.label || "",
    color: item?.color || "",
  });
  const form = useForm({
    defaultValues: getFormValues(selectedItem),
    validators: {
      onSubmit: mode === "Edit" ? editCategorySchema : addCategorySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (mode === "Add") {
          await createCategory(value);
          toast.success("Category added");
          form.reset();
          close();
        }
        if (mode === "Edit") {
          await updateCategory(value);
          toast.success("Updated successfully");
          form.reset();
          close();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  useEffect(() => {
    form.reset(getFormValues(selectedItem));
  }, [isOpen]);
  const errorMsg = (field) =>
    field.state.meta.errors?.map((err, index) => (
      <p key={index} className="text-red-500 text-[12px] absolute bottom-0">
        {err.message}
      </p>
    ));
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:w-max" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{mode} Category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid"
        >
          <form.Field name="label">
            {(field) => (
              <div className="grid">
                <Label htmlFor={field.name} className="mb-1">
                  Category
                </Label>
                <Div>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {errorMsg(field)}
                </Div>
              </div>
            )}
          </form.Field>
          <form.Field name="color">
            {(field) => (
              <RadioGroup
                value={field.state.value}
                onValueChange={field.handleChange}
                className="relative flex flex-wrap gap-3 pb-4"
              >
                {PRESET_COLORS.map((color, index) => {
                  const isSelected = field.state.value === color;

                  return (
                    <label key={index} className="cursor-pointer">
                      <RadioGroupItem
                        value={color}
                        className="sr-only focus-visible:ring-0 focus-visible:ring-offset-0"
                      />

                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition ${isSelected ? "border-2 border-gray-200" : "border border-transparent"}`}
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </label>
                  );
                })}
                {errorMsg(field)}
              </RadioGroup>
            )}
          </form.Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => close()}>
                Cancel
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
                state.isPristine,
              ]}
            >
              {([canSubmit, isSubmitting, isPristine]) => (
                <Button
                  type="submit"
                  disabled={isPristine || !canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Div({ children }) {
  return <div className="relative pb-4">{children}</div>;
}
