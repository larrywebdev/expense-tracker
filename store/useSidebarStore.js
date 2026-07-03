import { create } from "zustand";

const useSidebarStore = create((set) => ({
  collapsed: true,

  setCollapsed: (collapsed) =>
    set({
      collapsed,
    }),

  toggleCollapsed: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));

export default useSidebarStore;
