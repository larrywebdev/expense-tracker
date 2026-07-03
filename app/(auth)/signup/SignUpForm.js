"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signUpSchema } from "@/lib/schema/signup.schema";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.verifyPassword)
        throw new Error("Passwords do not match");
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
        options: {
          data: {
            username: value.username,
            first_name: value.firstName,
            last_name: value.lastName,
          },
        },
      });
      if (error) {
        toast.error("Error Signin user up");
        return;
      }

      await supabase.auth.signOut();
      toast.success("Signup Successful");
      router.push("/login");
    },
  });

  return (
    <div className="grid gap-3 w-75 sm:w-120 border p-5 sm:p-8 rounded-2xl bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-3 sm:gap-5">
          <div className="grid gap-1 mb-3">
            <span className="font-semibold text-2xl">Sign Up</span>
            <span className="text-sm text-[#475569]">
              Please fill in this form to create an account
            </span>
          </div>
          <div className="grid sm:flex sm:items-center gap-3">
            <form.Field name="firstName">
              {(field) => (
                <InputField
                  field={field}
                  type="text"
                  placeholder="First Name"
                  className="flex-1"
                />
              )}
            </form.Field>
            <form.Field name="lastName">
              {(field) => (
                <InputField
                  field={field}
                  type="text"
                  placeholder="Last Name"
                  className="flex-1"
                />
              )}
            </form.Field>
          </div>
          <form.Field name="email">
            {(field) => (
              <InputField
                field={field}
                type="email"
                placeholder="Email"
                className="w-full"
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <InputField
                field={field}
                type="password"
                placeholder="Password"
                className="w-full"
              />
            )}
          </form.Field>
          <form.Field name="verifyPassword">
            {(field) => (
              <InputField
                field={field}
                type="password"
                placeholder="Confirm Password"
                className="w-full"
              />
            )}
          </form.Field>
          <SubmitButton label={"Sign Up"} form={form} />
        </div>
      </form>
      <span className="text-sm text-[#475569] justify-self-center">
        Already registered?{" "}
        <Link
          className="text-[#0000db] hover:text-[#0000ff] underline"
          href="/login"
        >
          Sign In
        </Link>
      </span>
    </div>
  );
}
export function InputField({ field, type, placeholder, className }) {
  return (
    <div className={className}>
      <Input
        type={type}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        required
      />
      {field.state.meta.errors?.map((err, index) => (
        <p key={index} className="text-red-500 text-sm">
          {err.message}
        </p>
      ))}
    </div>
  );
}
export function SubmitButton({ label, form }) {
  return (
    <form.Subscribe
      selector={(state) => [
        state.canSubmit,
        state.isSubmitting,
        state.isPristine,
      ]}
    >
      {([canSubmit, isSubmitting, isPristine]) => {
        return (
          <Button
            className="mt-5 bg-[#0000db] hover:bg-[#000080] w-full px-3 py-5 text-base"
            type="submit"
            disabled={isPristine || !canSubmit || isSubmitting}
          >
            <div className="flex gap-2 items-center">
              {isSubmitting && <Spinner className="size-6" />}
              <span>{label}</span>
            </div>
          </Button>
        );
      }}
    </form.Subscribe>
  );
}
