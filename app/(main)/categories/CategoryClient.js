"use client";
import { AddEditCategory } from "@/components/AddEditCategory";
import { deleteCategory } from "@/lib/data-service";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { toast } from "sonner";

export default function CategoryClient({ categories }) {
  const [open, setOpen] = useState(false);
  const showConfirmToast = (categoryId) => {
    setOpen(true);
    toast("Are you sure you want to delete this?", {
      id: categoryId,
      duration: Infinity,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            toast.dismiss(categoryId);
            const promise = deleteCategory(categoryId);
            toast.promise(promise, {
              loading: "Deleting category...",
              success: "Category deleted",
              error: "Failed to delete category",
            });
            await promise;
            setOpen(false);
          } catch (error) {
            console.log(error);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(categoryId);
          setOpen(false);
        },
      },
    });
  };

  const { addCategory, editCategory } = useCategoryStore();

  return (
    <>
      <div className="border rounded-lg p-3">
        <h2 className="text-lg font-medium mb-2">Categories</h2>
        <button
          className="hidden sm:flex justify-self-end rounded-lg py-2 px-5 font-semibold text-base text-white bg-black gap-1 items-center"
          onClick={addCategory}
        >
          <Plus size={17} />
          Add Category
        </button>
        <BsPlusCircleFill
          className="sm:hidden cursor-pointer place-self-end"
          size={40}
          onClick={addCategory}
        />
        <div className="grid gap-2.5 mt-5">
          {categories
            .filter(({ label }) => label !== "Income")
            .map(({ id, user_id, label, color }) => (
              <div
                key={id}
                className="flex items-center justify-between bg-gray-100 rounded-lg p-2.5 pr-5 border min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="rounded-full w-4 h-4 shrink-0"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="truncate">{label}</span>
                </div>
                {user_id ? (
                  <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    <button onClick={() => editCategory({ id, label, color })}>
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setOpen(true);
                        showConfirmToast(id);
                      }}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
      {open && <div className="fixed inset-0 z-25 bg-black/40" />}

      <AddEditCategory />
    </>
  );
}
