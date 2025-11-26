// src/types/product.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string;
  slug: string;
}
