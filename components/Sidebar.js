import Nav from "./Nav";
export default function Sidebar() {
  return (
    <aside className="bg-[#000080] min-h-screen fixed px-7">
      <h1 className="text-2xl font-medium text-center py-5 text-white">
        Expense Tracker
      </h1>
      <Nav />
    </aside>
  );
}
