"use client";

import useSidebarStore from "@/store/useSidebarStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Nav from "./Nav";

export default function Sidebar({ theme }) {
  const isSm = useMediaQuery("(min-width:640px)");
  const isMd = useMediaQuery("(min-width:768px)");

  const { collapsed, toggleCollapsed } = useSidebarStore();

  const sidebarWidth = collapsed
    ? isMd
      ? "4.5rem" // md:w-18
      : isSm
        ? "3.75rem" // sm:w-15
        : "3.125rem" // w-12.5
    : "16rem"; // w-64
  return (
    <>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleCollapsed}
            className="fixed inset-0 bg-black/40 z-10 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        layout
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed min-h-screen z-20 overflow-hidden shrink-0"
        style={{ backgroundColor: theme ?? "#000080" }}
      >
        <div className="sm:px-2 lg:px-4 px-1.5">
          {/* Header */}
          <motion.div
            className="flex items-center h-16"
            animate={{ justifyContent: collapsed ? "center" : "space-around" }}
          >
            <motion.h1
              animate={{
                opacity: collapsed ? 0 : 1,
                width: collapsed ? 0 : "max-content",
              }}
              transition={{ duration: 0.05 }}
              className="text-xl font-medium text-white whitespace-nowrap overflow-hidden"
            >
              Expense Tracker
            </motion.h1>

            <motion.button
              onClick={toggleCollapsed}
              className="text-white text-lg z-10"
              animate={{ rotate: collapsed ? -180 : 0 }}
            >
              <ArrowLeft />
            </motion.button>
          </motion.div>

          <Nav theme={theme} />
        </div>
      </motion.aside>
    </>
  );
}
