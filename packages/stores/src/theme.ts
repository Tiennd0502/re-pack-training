import { create } from "zustand";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ColorScheme = "light" | "dark" | "system";

interface ThemeState {
  colorScheme: ColorScheme;
  isDark: boolean;
  isInitialized: boolean;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initializeTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = "@RepackApp:colorScheme";

const getSystemColorScheme = (): boolean => {
  const systemScheme = Appearance.getColorScheme();
  return systemScheme === "dark";
};

const saveThemeToStorage = async (scheme: ColorScheme): Promise<void> => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
  } catch (error) {
    console.warn("Failed to save theme to storage:", error);
  }
};

const loadThemeFromStorage = async (): Promise<ColorScheme | null> => {
  try {
    const scheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (scheme && ["light", "dark", "system"].includes(scheme)) {
      return scheme as ColorScheme;
    }
  } catch (error) {
    console.warn("Failed to load theme from storage:", error);
  }
  return null;
};

export const useThemeStore = create<ThemeState>((set, get) => {
  // Initialize with system preference
  const initialIsDark = getSystemColorScheme();

  return {
    colorScheme: "system",
    isDark: initialIsDark,
    isInitialized: false,
    initializeTheme: async () => {
      const savedScheme = await loadThemeFromStorage();
      const scheme: ColorScheme = savedScheme || "system";
      let isDark = false;
      if (scheme === "system") {
        isDark = getSystemColorScheme();
      } else {
        isDark = scheme === "dark";
      }
      set({ colorScheme: scheme, isDark, isInitialized: true });
    },
    setColorScheme: async (scheme: ColorScheme) => {
      let isDark = false;
      if (scheme === "system") {
        isDark = getSystemColorScheme();
      } else {
        isDark = scheme === "dark";
      }
      set({ colorScheme: scheme, isDark });
      await saveThemeToStorage(scheme);
    },
    toggleTheme: async () => {
      const current = get();
      let newScheme: ColorScheme;
      if (current.colorScheme === "system") {
        // If system, toggle to opposite of current system preference
        newScheme = current.isDark ? "light" : "dark";
      } else {
        // Toggle between light and dark
        newScheme = current.colorScheme === "light" ? "dark" : "light";
      }
      const isDark = newScheme === "dark";
      set({ colorScheme: newScheme, isDark });
      await saveThemeToStorage(newScheme);
    },
  };
});

// Listen to system theme changes
Appearance.addChangeListener(({ colorScheme }) => {
  const currentScheme = useThemeStore.getState().colorScheme;
  if (currentScheme === "system") {
    useThemeStore.setState({ isDark: colorScheme === "dark" });
  }
});
