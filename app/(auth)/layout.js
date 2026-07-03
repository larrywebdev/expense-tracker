export default async function AuthLayout({ children }) {
  return (
    <div className="bg-[#0000c4] flex justify-center items-center h-screen">
      {children}
    </div>
  );
}
