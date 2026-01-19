import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

// Interfaces
import { User } from "@repo/interfaces/user";

// Constants
import { STORAGE_KEYS } from "@repo/constants/storageKeys";

type States = {
  user: User | null;
};

type Actions = {
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const INITIAL_STATE: States = {
  user: null,
};

export const useUserStore = createWithEqualityFn<States & Actions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setUser: (user: User | null) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        return {
          user: state.user,
        };
      },
    },
  ),
  shallow,
);
