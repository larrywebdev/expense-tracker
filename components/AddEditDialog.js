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
import { categoryOptions } from "@/lib/data-service";
import { transactionSchema } from "@/lib/transactionSchema";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { DateSelector } from "./DateSelector";

export function AddEditDialog({ open, onOpenChange, data }) {
  const capitalize = (str) => {
    return str?.[0].toUpperCase() + str?.slice(1);
  };

  const form = useForm({
    defaultValues: {
      description: capitalize(data?.description) || "",
      amount: data?.amount || "",
      paymentMethod: data?.paymentMethod || "",
      category: data?.category || "",
      type: data?.type || "",
      date:
        data?.date ||
        new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      status: data?.status || "",
    },
    validators: {
      onSubmit: transactionSchema,
    },
    onSubmit: async ({ value }) => {
      const fd = new FormData();
      Object.entries(value).forEach(([key, value]) =>
        fd.append(key, String(value)),
      );

      console.log(Object.fromEntries(fd));
      toast.success("Expense saved successfully");
      form.reset();

      // if (result?.success) {
      //   form.reset();
      // } else {
      //   toast.error(result?.error || "Something went wrong");
      // }
    },
  });

  const errorMsg = (field) =>
    field.state.meta.errors?.map((err, index) => (
      <p key={index} className="text-red-500 text-[12px] absolute bottom-1">
        {err.message}
      </p>
    ));
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-max" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit();
            onOpenChange(false);
          }}
          className="grid"
        >
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

          <div className="flex gap-3">
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
            <form.Field name="paymentMethod">
              {(field) => (
                <div className="grid">
                  <Label className="mb-1">Payment Method</Label>
                  <Div>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="w-55">
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
          <div className="flex gap-3">
            <form.Field name="category">
              {(field) => (
                <div className="grid">
                  <Label className="mb-1">Category</Label>
                  <Div>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="w-55">
                        <SelectValue placeholder={field.state.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(({ label, value }) => (
                          <SelectItem
                            className="cursor-pointer"
                            value={value}
                            key={value}
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
          <div className="flex gap-3">
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
                      <SelectTrigger className="w-55">
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
              <Button variant="outline">Cancel</Button>
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
  return <div className="relative pb-6">{children}</div>;
}
