import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  mode: "Add",
  selectedItem: null,
  isOpen: false,

  addCategory: () =>
    set({
      mode: "Add",
      selectedItem: null,
      isOpen: true,
    }),

  editCategory: (item) =>
    set({
      mode: "Edit",
      selectedItem: item,
      isOpen: true,
    }),
  deleteCategory: () =>
    set({
      mode: "Delete",
      isOpen: true,
    }),
  close: () =>
    set({
      isOpen: false,
      selectedItem: null,
      mode: "Add",
    }),
}));
