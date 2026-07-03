import { getCategories } from "@/lib/data-service";
import CategoryClient from "./CategoryClient";

export default async function page() {
  const { categories } = await getCategories();

  return <CategoryClient categories={categories} />;
}
