// src/types/product.ts

// A new type to define the shape of a color object
export interface Color {
  name: string;
  code: string;
}

// The complete, unified Product type with all possible properties
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string; // The short description for grids/previews
  descriptionLong?: string; // The detailed description for the product page
  price: number;
  oldPrice?: number; // Optional: for sales
  category: string;
  img: string; // Main image for product cards
  images: string[]; // Array of images for the product detail gallery
  sizes: string[];
  colors: Color[];
  sku: string;
  rating: number; // e.g., 4 or 5
  reviews: number; // The number of reviews
  tags: string[]; // For filtering and metadata
  tag?: "new" | "discount"; // Optional: for badges on product cards
  discount?: string; // Optional: e.g., "-30%"
}

// CartItem can be a subset of Product, but it's important that it
// has properties consistent with what the cart needs.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string; // The specific image selected for the cart
  slug: string;
  quantity: number;
  // You might add selectedSize and selectedColor here if needed
}

// WishlistItem should be simple, as it's just a link to the full product
export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: string; // The main product image
  slug: string;
}