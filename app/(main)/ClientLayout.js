"use client";

import Sidebar from "@/components/Sidebar";
import useSidebarStore from "@/store/useSidebarStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
export default function ClientLayout({ children, theme_color }) {
  const { collapsed } = useSidebarStore();
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="flex">
      <Sidebar theme={theme_color} />
      <motion.main
        animate={{ paddingLeft: isDesktop ? (collapsed ? 90 : 265) : 60 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="py-5 px-2 sm:p-6 w-full max-w-360"
      >
        {children}
      </motion.main>
    </div>
  );
}
