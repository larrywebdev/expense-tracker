"use client";

import { createClient } from "@/lib/supabase/client";
import useSidebarStore from "@/store/useSidebarStore";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaChartPie, FaCog, FaList, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { NavIcon } from "./Loading";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", Icon: FaChartPie },
  { href: "/transactions", label: "Transactions", Icon: FaMoneyBillWave },
  { href: "/categories", label: "Categories", Icon: FaList },
  { href: "/settings", label: "Settings", Icon: FaCog },
];

export default function Nav({ theme }) {
  const [pending, setPending] = useState(false);
  const { collapsed, setCollapsed } = useSidebarStore(
    useShallow((s) => ({
      collapsed: s.collapsed,
      setCollapsed: s.setCollapsed,
    })),
  );
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    setPending(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      setPending(false);
      return;
    }

    toast.success("Logged out");
    router.push("/login");
  };

  return (
    <nav className="h-[calc(100vh-100px)] flex flex-col justify-between">
      <div className="space-y-2">
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center rounded-md p-1.5 sm:p-2 overflow-hidden ${isActive ? "bg-white hover:bg-white/90" : "hover:bg-white/30"}
              `}
              style={{
                color: isActive ? theme : "white",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? 0 : 10,
              }}
              onClick={() => {
                if (isActive) return;
                if (window.innerWidth < 768) setCollapsed(true);
              }}
            >
              <NavIcon
                Icon={Icon}
                className="w-4.5 h-4.5 sm:w-4.5 sm:h-4.5 md:h-5 md:w-5"
              />

              <motion.span
                animate={{
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto",
                }}
                transition={{
                  duration: 0.15,
                }}
                className="whitespace-nowrap overflow-hidden"
              >
                {label}
              </motion.span>
            </Link>
          );
        })}
      </div>

      <motion.button
        onClick={signOut}
        title={collapsed ? "Log Out" : undefined}
        className={`${collapsed ? "gap-0" : "gap-2.5"} justify-center flex items-center h-11 text-white`}
        whileTap={{ scale: collapsed ? 0.85 : 1 }}
        whileHover={{ scale: collapsed ? 1.1 : 1 }}
      >
        {pending ? (
          <span className="flex items-center justify-center gap-0.5 w-5 h-5">
            <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
          </span>
        ) : (
          <LogOut className="w-5 h-5" />
        )}
        <motion.span
          animate={{
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
          }}
          transition={{
            duration: 0.15,
          }}
          className="whitespace-nowrap overflow-hidden"
        >
          Log Out
        </motion.span>
      </motion.button>
    </nav>
  );
}
