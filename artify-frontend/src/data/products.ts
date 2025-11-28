// src/data/products.ts

// export interface Product {
//   id: number;
//   slug: string;
//   name: string;
//   description: string;
//   descriptionLong: string;
//   price: number;
//   oldPrice?: number;
//   tag?: "new" | "discount";
//   discount?: string;
//   category: string;
//   img: string; // shop card image
//   images: string[]; // detail page gallery
//   sizes: string[];
//   colors: { name: string; code: string }[];
//   sku: string;
//   rating: number;
//   reviews: number;
//   tags: string[];
// }

export const products = [
  {
    id: 1,
    slug: "syltherine",
    name: "Syltherine",
    description: "Stylish cafe chair",
    descriptionLong:
      "The Syltherine chair combines comfort and elegance with its modern curves and durable frame. Designed for cafes and cozy home corners, it elevates your seating experience with style and function.",
    price: 2500000,
    oldPrice: 3500000,
    tag: "discount",
    discount: "-30%",
    category: "chair",
    img: "/home/products/product1.svg",
    images: [
      "/shop/products/thumb1.svg",
      "/shop/products/thumb2.svg",
      "/shop/products/thumb3.svg",
      "/shop/products/thumb4.svg",
    ],
    sizes: ["L", "XL", "XS"],
    colors: [
      { name: "purple", code: "#816DFA" },
      { name: "black", code: "#000000" },
      { name: "gold", code: "#B88E2F" },
    ],
    sku: "CH001",
    rating: 5,
    reviews: 5,
    tags: ["Chair", "Furniture", "Home", "Shop"],
  },
  {
    id: 2,
    slug: "leviosa",
    name: "Leviosa",
    description: "Stylish cafe chair",
    descriptionLong:
      "Leviosa redefines lightweight elegance with its smooth design and sturdy build. Crafted with precision to complement modern interiors while offering top-notch comfort.",
    price: 2500000,
    category: "chair",
    img: "/home/products/product2.svg",
    images: [
      "/shop/products/thumb1.svg",
      "/shop/products/thumb2.svg",
      "/shop/products/thumb3.svg",
      "/shop/products/thumb4.svg",
    ],
    sizes: ["L", "XL", "XS"],
    colors: [
      { name: "purple", code: "#816DFA" },
      { name: "black", code: "#000000" },
      { name: "gold", code: "#B88E2F" },
    ],
    sku: "CH002",
    rating: 4,
    reviews: 8,
    tags: ["Chair", "Office", "Modern", "Shop"],
  },
  {
    id: 3,
    slug: "lolito",
    name: "Lolito",
    description: "Luxury big sofa",
    descriptionLong:
      "The Lolito sofa is built for those who value luxury and space. Its plush cushioning and elegant texture make it the perfect centerpiece for a contemporary living room.",
    price: 7000000,
    oldPrice: 14000000,
    tag: "discount",
    discount: "-50%",
    category: "sofa",
    img: "/home/products/product3.svg",
    images: [
      "/shop/products/thumb1.svg",
      "/shop/products/thumb2.svg",
      "/shop/products/thumb3.svg",
      "/shop/products/thumb4.svg",
    ],
    sizes: ["L", "XL", "XS"],
    colors: [
      { name: "purple", code: "#816DFA" },
      { name: "black", code: "#000000" },
      { name: "gold", code: "#B88E2F" },
    ],
    sku: "SF001",
    rating: 5,
    reviews: 10,
    tags: ["Sofa", "Living Room", "Luxury", "Home"],
  },
  {
    id: 4,
    slug: "respira",
    name: "Respira",
    description: "Outdoor bar table and stool",
    descriptionLong:
      "Respira brings outdoor elegance to life with its weather-resistant materials and sleek design. Ideal for patios and garden lounges where comfort meets durability.",
    price: 500000,
    tag: "new",
    category: "outdoor",
    img: "/home/products/product4.svg",
    images: [
      "/shop/products/thumb1.svg",
      "/shop/products/thumb2.svg",
      "/shop/products/thumb3.svg",
      "/shop/products/thumb4.svg",
    ],
    sizes: ["L", "XL", "XS"],
    colors: [
      { name: "purple", code: "#816DFA" },
      { name: "black", code: "#000000" },
      { name: "gold", code: "#B88E2F" },
    ],
    sku: "OD001",
    rating: 4,
    reviews: 6,
    tags: ["Outdoor", "Table", "Stool", "Furniture"],
  },
];
