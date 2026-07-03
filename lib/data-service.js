"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Transactions
export async function getTransactions() {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("expense-tracker-transactions")
    .select(
      "id, type, category, amount, status, payment_method, description, date",
    );
  if (error) throw new Error("Error fetching transactions");
  return { transactions };
}

export async function addTransaction(transactions) {
  const supabase = await createClient();
  const { error, ...rest } = await supabase
    .from("expense-tracker-transactions")
    .insert([transactions])
    .select();
  if (error) throw new Error("Error adding transaction, please try again");
  revalidatePath("/transactions");
  return { rest };
}

export async function updateTransaction(transaction) {
  const { id, ...tranObj } = transaction;
  const supabase = await createClient();
  const { error } = await supabase
    .from("expense-tracker-transactions")
    .update(tranObj)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Error updating transaction, please try again");
  }

  revalidatePath("/transactions");
}

export async function deleteTransaction(transactionId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expense-tracker-transactions")
    .delete()
    .eq("id", `${transactionId}`);
  if (error) throw new Error("Error deleting transaction, please try again");
  revalidatePath("/transactions");
}

// Categories
export async function getCategories() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("expense-tracker-categories")
    .select("id, user_id, label, color");
  if (error) throw new Error("Error fetching categories");
  return { categories };
}

export async function createCategory(category) {
  const supabase = await createClient();
  const { error, success } = await supabase
    .from("expense-tracker-categories")
    .insert([category])
    .select();
  if (error) throw new Error("An error occurred, please try again");
  revalidatePath("/categories");
  return { success };
}

export async function updateCategory(category) {
  const { id, ...categoriesObj } = category;
  const supabase = await createClient();
  const { error } = await supabase
    .from("expense-tracker-categories")
    .update(categoriesObj)
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("Error updating category, please try again");
  }
  revalidatePath("/categories");
}

export async function deleteCategory(categoryId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expense-tracker-categories")
    .delete()
    .eq("id", `${categoryId}`);
  if (error) throw new Error("Error deleting category, please try again");
  revalidatePath("/categories");
}

// User Settings
export async function getUserSettings() {
  const supabase = await createClient();
  const { data: settings, error } = await supabase
    .from("expense-tracker-user-settings")
    .select("*");
  if (error) throw new Error("Error getting user settings");
  return { settings };
}

export async function updateUserSetting(value) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user.id;
  const { error, success } = await supabase
    .from("expense-tracker-user-settings")
    .update(value)
    .eq("user_id", user_id);
  if (error) {
    throw new Error("Something went wrong");
  }
  revalidatePath("/settings");
  return { success };
}
