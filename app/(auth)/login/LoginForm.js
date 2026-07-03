"use client";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InputField, SubmitButton } from "../signup/SignUpForm";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Login Successful");

      router.push("/dashboard");
      router.refresh();
    },
  });

  return (
    <div className="grid gap-3 w-75 sm:w-120 border p-8 rounded-2xl bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-5">
          <div className="grid gap-1 mb-3">
            <span className="font-semibold text-2xl">Log In</span>
            <span className="text-sm text-[#475569]">
              Sign in to your account
            </span>
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
          <SubmitButton label="Log In" form={form} />
        </div>
      </form>
      <span className="text-sm text-[#475569] justify-self-center">
        Not yet registered?{" "}
        <Link
          className="text-[#0000db] hover:text-[#0000ff] underline"
          href="/signup"
        >
          Create an account
        </Link>
      </span>
    </div>
  );
}
