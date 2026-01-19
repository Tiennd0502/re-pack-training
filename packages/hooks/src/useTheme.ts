import { useColorScheme } from "react-native";

// Stores
import { useThemeStore } from "@repo/stores/theme";

// Interfaces
import { Theme } from "@repo/interfaces/style";

// Themes
import { lightThemes, darkThemes } from "@repo/ui/themes";

export const useTheme = (): {
  theme: Theme;
  isDark: boolean;
  colorScheme: "light" | "dark" | "system";
  setColorScheme: (scheme: "light" | "dark" | "system") => Promise<void>;
  toggleTheme: () => Promise<void>;
} => {
  const systemColorScheme = useColorScheme();
  const { isDark, colorScheme, setColorScheme, toggleTheme } = useThemeStore();

  const actualIsDark =
    colorScheme === "system" ? systemColorScheme === "dark" : isDark;

  const theme = actualIsDark ? darkThemes : lightThemes;

  return {
    theme,
    isDark: actualIsDark,
    colorScheme,
    setColorScheme,
    toggleTheme,
  };
};
