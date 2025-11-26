import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    img: string;
    slug: string;
}

interface WishlistStore {
    items: WishlistItem[];

    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;

    // 🔥 Bulk features
    bulkMoveToCart: (cartAdd: (item: any) => void) => void;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToWishlist: (item) =>
                set((state) => {
                    if (state.items.some((i) => i.id === item.id)) return state;
                    return { items: [...state.items, item] };
                }),

            removeFromWishlist: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            isInWishlist: (id: number) =>
                get().items.some((i) => i.id === id),

            // 🔥 Move all wishlist items to cart
            bulkMoveToCart: (cartAdd) => {
                const state = get();

                state.items.forEach((item) => {
                    cartAdd({
                        id: item.id,
                        name: item.name,
                        img: item.img,
                        slug: item.slug,
                        price: item.price,
                        quantity: 1,
                    });
                });

                // 🧹 Clear wishlist afterwards
                set(() => ({ items: [] }));
            },

            // 🔥 Clear wishlist
            clearWishlist: () => set(() => ({ items: [] })),
        }),

        {
            name: "wishlist-storage", // localStorage key
        }
    )
);
