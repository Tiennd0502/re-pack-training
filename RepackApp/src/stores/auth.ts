import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

// Constants
import { STORAGE_KEYS } from '@/constants/storageKeys';

type States = {
  isAuthenticated?: boolean;
  authHydrated?: boolean;
};

type Actions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthHydrated: (hydrated: boolean) => void;
};

const INITIAL_STATE: States = {
  isAuthenticated: false,
  authHydrated: false,
};

export const useAuthStore = createWithEqualityFn<States & Actions>()(
  persist(
    set => ({
      ...INITIAL_STATE,
      setAuthHydrated: hydrated => set({ authHydrated: hydrated }),
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setAuthHydrated(true);
      },
      partialize: state => {
        return {
          isAuthenticated: state.isAuthenticated,
        };
      },
    },
  ),
  shallow,
);
