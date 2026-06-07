import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Outlet } from "react-router-dom";

export function ThemeProvider() {
  return (
    <NextThemesProvider>
      {" "}
      <Outlet />
    </NextThemesProvider>
  );
}
