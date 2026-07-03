import { GoArrowDownRight } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
export default function IncomeExpense({ children, style, money }) {
  return (
    <div className={`${style} rounded-lg py-3 px-4 flex gap-1.5`}>
      {children === "Income" ? (
        <GoArrowDownRight
          className="text-white bg-green-400 rounded-md p-0.5 mt-1.5"
          size={30}
        />
      ) : (
        <GoArrowUpRight
          className="text-white bg-red-400 rounded-md p-0.5 mt-1.5"
          size={30}
        />
      )}
      <div>
        <span>{children}</span>
        <span className="text-xl font-medium block">{money}</span>
      </div>
    </div>
  );
}
