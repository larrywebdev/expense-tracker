"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartPie, FaCog, FaList, FaMoneyBillWave } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();
  const dashboard = pathname === "/dashboard";
  const transactions = pathname === "/transactions";
  const categories = pathname === "/categories";
  const settings = pathname === "/settings";
  return (
    <nav className="flex flex-col items-center gap-7 mt-5 text-white">
      <Link
        className={`flex items-center gap-2 p-2.5 w-50  rounded-md font-medium ${
          dashboard ? "bg-blue-600" : ""
        }`}
        href="/dashboard"
      >
        <FaChartPie size={20} />
        Dashboard
      </Link>
      <Link
        className={`flex items-center gap-2 p-2.5 w-50  rounded-md font-medium ${
          transactions ? "bg-blue-600" : ""
        }`}
        href="/transactions"
      >
        <FaMoneyBillWave size={20} />
        Transactions
      </Link>
      <Link
        className={`flex items-center gap-2 p-2.5 w-50  rounded-md font-medium ${
          categories ? " bg-blue-600" : ""
        }`}
        href="/categories"
      >
        <FaList size={20} />
        Categories
      </Link>
      <Link
        className={`flex items-center gap-2 p-2.5 w-50  rounded-md font-medium ${
          settings ? " bg-blue-600" : ""
        }`}
        href="/settings"
      >
        <FaCog size={20} />
        Settings
      </Link>
    </nav>
  );
}
