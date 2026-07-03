import { getUserSettings } from "@/lib/data-service";
import SettingsClient from "./SettingsClient";

export default async function Page() {
  const { settings } = await getUserSettings();
  const { currency, date_format, theme_color } = settings[0];

  return (
    <SettingsClient
      currency={currency}
      date_format={date_format}
      theme_color={theme_color}
    />
  );
}
