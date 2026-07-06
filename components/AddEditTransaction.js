"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addTransactionSchema,
  editTransactionSchema,
} from "@/lib/schema/transaction.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { DateSelector } from "./DateSelector";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect } from "react";
import { addTransaction, updateTransaction } from "@/lib/data-service";

export function AddEditTransaction({ categories }) {
  const { isOpen, mode, selectedItem, close } = useTransactionStore();

  const getFormValues = (item) => ({
    ...(item?.id ? { id: item.id } : {}),
    description: item?.description || "",
    amount: item?.amount.toString() || "",
    payment_method: item?.payment_method || "",
    category: item?.category || "",
    type: item?.type || "",
    date:
      item?.date ||
      new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    status: item?.status || "",
  });

  const form = useForm({
    defaultValues: getFormValues(selectedItem),
    validators: {
      onSubmit: mode === "Edit" ? editTransactionSchema : addTransactionSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (mode === "Add") {
          await addTransaction(value);
          toast.success("Transaction saved");
          form.reset();
          close();
        }
        if (mode === "Edit") {
          await updateTransaction(value);
          toast.success("Transaction updated successfully");
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
  }, [selectedItem]);

  const errorMsg = (field) =>
    field.state.meta.errors?.map((err, index) => (
      <p key={index} className="text-red-500 text-[12px] absolute bottom-1">
        {err.message}
      </p>
    ));

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="sm:w-max h-[90%] max-h-150"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>{mode} transaction</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="overflow-y-auto"
        >
          <div className="grid px-1">
            <form.Field name="description">
              {(field) => (
                <div className="grid">
                  <Label htmlFor={field.name} className="mb-1">
                    Description
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

            <div className="grid sm:flex gap-3">
              <form.Field name="amount">
                {(field) => (
                  <div className="grid">
                    <Label htmlFor={field.name} className="mb-1">
                      Amount
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
              <form.Field name="payment_method">
                {(field) => (
                  <div className="grid">
                    <Label className="mb-1">Payment Method</Label>
                    <Div>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full sm:w-55">
                          <SelectValue placeholder={field.state.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {["Bank Transfer", "Auto-pay", "Card", "Cash"].map(
                            (value) => (
                              <SelectItem
                                className="cursor-pointer"
                                value={value}
                                key={value}
                              >
                                {value}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      {errorMsg(field)}
                    </Div>
                  </div>
                )}
              </form.Field>
            </div>
            <div className="grid sm:flex gap-3">
              <form.Field name="category">
                {(field) => (
                  <div className="grid">
                    <Label className="mb-1">Category</Label>
                    <Div>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full sm:w-55">
                          <SelectValue placeholder={field.state.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(({ label }) => (
                            <SelectItem
                              className="cursor-pointer"
                              value={label}
                              key={label}
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errorMsg(field)}
                    </Div>
                  </div>
                )}
              </form.Field>
              <form.Field name="type">
                {(field) => (
                  <div className="grid">
                    <Label className="mb-1">Type</Label>
                    <Div>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        className="flex"
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="Income" id="r1" />
                          <Label htmlFor="r1">Income</Label>
                        </div>
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="Expense" id="r2" />
                          <Label htmlFor="r2">Expense</Label>
                        </div>
                      </RadioGroup>
                      {errorMsg(field)}
                    </Div>
                  </div>
                )}
              </form.Field>
            </div>
            <div className="grid sm:flex gap-3">
              <DateSelector error={errorMsg} form={form} />

              <form.Field name="status">
                {(field) => (
                  <div className="grid">
                    <Label className="mb-1">Status</Label>
                    <Div>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger className="w-full sm:w-55">
                          <SelectValue placeholder={field.state.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {["Completed", "Pending", "Failed"].map((value) => (
                            <SelectItem
                              className="cursor-pointer"
                              value={value}
                              key={value}
                            >
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errorMsg(field)}
                    </Div>
                  </div>
                )}
              </form.Field>
            </div>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Div({ children }) {
  return <div className="relative pb-6">{children}</div>;
}
