import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shallow } from "zustand/shallow";

// Interfaces
import { Cart } from "@repo/types/cart";
import { STORAGE_KEYS } from "@repo/constants/storageKeys";

// Utils
import { calcTotalPrice } from "@repo/utils/common";

type States = {
  carts: Cart[] | [];
  totalPrice: string | number;
};

type Actions = {
  setCarts: (carts: Cart[]) => void;
  addNewCart: (cart: Cart) => void;
  updateCartItem: (cart: Cart) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
};

const INITIAL_STATE: States = {
  carts: [],
  totalPrice: 0,
};

export const useCartStore = createWithEqualityFn<States & Actions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setCarts: (carts: Cart[]) => set({ carts }),
      addNewCart: (cart: Cart) => {
        set((state) => {
          const indexItem = state?.carts?.findIndex(
            (item) => item.id === cart.id,
          );

          const carts =
            indexItem === -1
              ? [cart, ...state.carts]
              : state.carts.map((item, index) =>
                  index === indexItem
                    ? { ...item, quantity: item.quantity + cart.quantity }
                    : item,
                );

          return { carts: carts, totalPrice: calcTotalPrice(carts) };
        });
      },
      updateCartItem: ({ id, isChecked, quantity }) => {
        set((state) => {
          const carts = state.carts.map((item) =>
            item?.id === id ? { ...item, quantity, isChecked } : item,
          );

          return { carts, totalPrice: calcTotalPrice(carts) };
        });
      },
      removeCartItem: (id: string) =>
        set((state) => {
          const carts = state.carts.filter((c) => c.id !== id);
          return { carts, totalPrice: calcTotalPrice(carts) };
        }),
      clearCart: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: STORAGE_KEYS.CART,
      storage: createJSONStorage(() => AsyncStorage),

      // Ensure totalPrice is correct when data is restored
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.totalPrice = calcTotalPrice(state.carts);
        }
      },
    },
  ),
  shallow,
);
