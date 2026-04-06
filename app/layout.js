import { Geist } from "next/font/google";
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Toaster position="top-center" />
        <div>
          <Sidebar />
          <div className="p-6 ml-70">{children}</div>
        </div>
      </body>
    </html>
  );
}
