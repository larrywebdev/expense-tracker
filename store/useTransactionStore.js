import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  mode: "Add",
  selectedItem: null,
  isOpen: false,

  addTransactionMode: () =>
    set({
      mode: "Add",
      selectedItem: null,
      isOpen: true,
    }),

  editTransactionMode: (item) =>
    set({
      mode: "Edit",
      selectedItem: item,
      isOpen: true,
    }),
  deleteTransactionMode: () =>
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
