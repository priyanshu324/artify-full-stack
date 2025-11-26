import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    img: string;
    slug: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];

    addToCart: (item: CartItem) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;

    totalItems: number;
    totalPrice: number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            // ✅ PREVENT DUPLICATES + INCREASE QTY IF EXISTS
            addToCart: (product) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === product.id);

                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === product.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                }),

            increaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                })),

            decreaseQty: (id) =>
                set((state) => ({
                    items: state.items
                        .map((i) =>
                            i.id === id
                                ? { ...i, quantity: Math.max(1, i.quantity - 1) }
                                : i
                        )
                        .filter((i) => i.quantity > 0),
                })),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            clearCart: () => set({ items: [] }),

            // Computed values
            get totalItems() {
                return get().items.reduce((sum, i) => sum + i.quantity, 0);
            },

            get totalPrice() {
                return get().items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );
            },
        }),

        {
            name: "cart-storage", // localStorage key
        }
    )
);
