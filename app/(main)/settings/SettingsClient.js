import { DropdownSelect } from "@/components/Dropdown";
import { ChevronRight, Download, Trash2 } from "lucide-react";

export default function SettingsClient({ currency, date_format, theme_color }) {
  return (
    <div className="border rounded-lg p-3 w-full mx-auto">
      <h2 className="text-lg font-medium mb-2">Currency & Locale</h2>
      <div className="grid bg-gray-100 border rounded-md">
        <div className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center border-b py-1.5 px-2">
          <span>Currency</span>
          <DropdownSelect
            name="currency"
            placeholder="Select Currency"
            label="Currency"
            defaultValue={currency}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center py-1.5 px-2">
          <span>Date Format</span>
          <DropdownSelect
            name="date_format"
            placeholder="Select Date Format"
            label="Date Format"
            defaultValue={date_format}
          />
        </div>
      </div>
      <h2 className="text-lg font-medium mt-7 mb-2">Appearance</h2>
      <div className="grid bg-gray-100 border rounded-md">
        <div className="flex justify-between items-center border-b py-3 px-2">
          <span>Dark Mode</span>
          <span className="text-gray-500 sm:pr-10">Coming Soon...</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 justify-between items-start sm:items-center py-1.5 px-2">
          <span>Theme Color</span>
          <DropdownSelect
            name="theme_color"
            placeholder="Select Theme"
            label="Theme Color"
            defaultValue={theme_color}
          />
        </div>
      </div>
      <h2 className="text-lg font-medium mt-7 mb-2">Account Settings</h2>
      <div className="grid rounded-md bg-gray-100 border">
        <button className="flex items-center w-full border-b p-2">
          <Download />
          <div className="grid py-1.5 px-2 text-start">
            <span>Export Data</span>
            <span className="text-xs text-gray-400">
              Download all your expenses as CSV
            </span>
          </div>
        </button>
        <button className="flex items-center w-full p-2">
          <Trash2 />
          <div className="flex justify-between items-center w-full">
            <div className="grid py-1.5 px-2 text-start">
              <span>Delete All Data</span>
              <span className="text-xs text-gray-400">
                Permanently delete all transactions
              </span>
            </div>
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
}
