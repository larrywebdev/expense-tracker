import { getUserSettings } from "@/lib/data-service";
import ClientLayout from "./ClientLayout";
export default async function AppLayout({ children }) {
  const { settings } = await getUserSettings();
  const { theme_color } = settings[0];
  return <ClientLayout theme_color={theme_color}>{children}</ClientLayout>;
}
