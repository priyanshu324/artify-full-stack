// src/data/productTabsData.ts

export interface ProductTabsContent {
    description: {
        paragraphs: string[];
        images: { src: string; alt: string }[];
    };
    info: {
        material: string;
        dimensions: string;
        weight: string;
        care: string;
    };
    reviews: {
        id: number;
        rating: number;
        text: string;
    }[];
}

// 🛋️ All Product Tabs Data by Product Slug
export const productTabsData: Record<string, ProductTabsContent> = {
    // ---------- Syltherine ----------
    syltherine: {
        description: {
            paragraphs: [
                "The Syltherine is a stylish cafe chair that blends modern design with comfort. Crafted from premium materials, it offers a timeless look suitable for any dining or workspace setup.",
                "Its lightweight frame makes it easy to move while maintaining strength and durability. Ideal for both home and commercial environments, the Syltherine adds a touch of elegance wherever it’s placed.",
            ],
            images: [
                { src: "/shop/products/product-1.svg", alt: "Syltherine chair front view" },
                { src: "/shop/products/product-1.svg", alt: "Syltherine chair side view" },
            ],
        },
        info: {
            material: "Oak Wood, Linen Fabric, Steel Legs",
            dimensions: "80 x 60 x 55 cm",
            weight: "5.5 kg",
            care: "Wipe clean with a soft dry cloth. Avoid strong cleaning agents.",
        },
        reviews: [
            { id: 1, rating: 5, text: "Beautiful chair with excellent craftsmanship!" },
            { id: 2, rating: 4, text: "Comfortable and fits perfectly in my workspace." },
        ],
    },

    // ---------- Leviosa ----------
    leviosa: {
        description: {
            paragraphs: [
                "Leviosa combines elegant form and modern functionality. Its curved design supports posture while providing all-day seating comfort.",
                "The chair is available in multiple finishes, making it a versatile choice for cafes, offices, or minimalist home setups.",
            ],
            images: [
                { src: "/shop/products/product-1.svg", alt: "Leviosa chair front view" },
                { src: "/shop/products/product-1.svg", alt: "Leviosa chair angled view" },
            ],
        },
        info: {
            material: "Ash Wood, PU Leather, Aluminum Base",
            dimensions: "75 x 58 x 52 cm",
            weight: "6.2 kg",
            care: "Clean with a damp cloth and mild soap. Avoid prolonged exposure to sunlight.",
        },
        reviews: [
            { id: 1, rating: 5, text: "Fantastic quality and comfortable seating!" },
            { id: 2, rating: 4, text: "Looks amazing in my office corner!" },
            { id: 3, rating: 5, text: "The design feels very premium!" },
        ],
    },

    // ---------- Lolito ----------
    lolito: {
        description: {
            paragraphs: [
                "The Lolito luxury sofa is designed for ultimate relaxation. Its plush cushions and spacious layout make it the centerpiece of your living area.",
                "Crafted with premium fabric and a durable frame, Lolito brings both comfort and style in equal measure.",
            ],
            images: [
                { src: "/shop/products/product-1.svg", alt: "Lolito sofa close-up" },
                { src: "/shop/products/product-1.svg", alt: "Lolito sofa full view" },
            ],
        },
        info: {
            material: "Solid Wood Frame, High-Density Foam, Premium Velvet Upholstery",
            dimensions: "210 x 90 x 100 cm",
            weight: "32 kg",
            care: "Vacuum regularly. Use a fabric cleaner for stains.",
        },
        reviews: [
            { id: 1, rating: 5, text: "Extremely comfortable and elegant!" },
            { id: 2, rating: 5, text: "Totally worth the price for the comfort level!" },
            { id: 3, rating: 4, text: "A bit large, but the quality is top-notch!" },
        ],
    },

    // ---------- Respira ----------
    respira: {
        description: {
            paragraphs: [
                "Respira outdoor furniture set is designed for those who love fresh air and comfort. With its minimalist design and durable materials, it’s perfect for patios and balconies.",
                "Built to withstand weather elements, Respira combines practicality with modern aesthetics.",
            ],
            images: [
                { src: "/shop/products/product-1.svg", alt: "Respira outdoor table and stools" },
                { src: "/shop/products/product-1.svg", alt: "Respira outdoor set on balcony" },
            ],
        },
        info: {
            material: "Aluminum Frame, Teak Wood Top, Weatherproof Cushions",
            dimensions: "150 x 75 x 100 cm",
            weight: "22 kg",
            care: "Cover when not in use. Clean with mild detergent and water.",
        },
        reviews: [
            { id: 1, rating: 5, text: "Perfect for outdoor evenings!" },
            { id: 2, rating: 4, text: "Great value and durable quality." },
        ],
    },
};
