import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (book) => {
        const exists = get().items.find((item) => item.bookId === book.bookId);
        if (exists) {
          set({
            items: get().items.map((item) =>
              item.bookId === book.bookId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { ...book, quantity: 1 }] });
        }
      },
      removeItem: (bookId) => {
        set({ items: get().items.filter((item) => item.bookId !== bookId) });
      },
      updateQuantity: (bookId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.bookId === bookId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
