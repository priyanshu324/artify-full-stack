"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FiShare2, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { products } from "@/src/data/products";
import type { Product } from "@/src/types/product";

import Toast from "@/src/components/ui/Toast";

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/src/store/redux/zWishlist/zWishlistSlice";

interface FilterProps {
    filters: {
        layout: "grid" | "list";
        sort: string;
        category: string;
        priceRange: string;
    };
}

export default function ShopProducts({ filters }: FilterProps) {
    const router = useRouter();
    const dispatch = useZDispatch();

    const wishlistItems = useZSelector((s) => s.zWishlist.items);

    const [toast, setToast] = useState<string | null>(null);
    const [adding, setAdding] = useState<Record<number, boolean>>({});
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 12;

    // ---------------- FILTERING ----------------
    const filteredProducts = useMemo(() => {
      let list = [...products];

      if (filters.category !== "all") {
        list = list.filter((p) => p.category === filters.category);
    }

      if (filters.priceRange !== "all") {
        list = list.filter((p) => {
            if (filters.priceRange === "low") return p.price < 100000;
            if (filters.priceRange === "mid") return p.price >= 100000 && p.price <= 500000;
            if (filters.priceRange === "high") return p.price > 500000;
            return true;
        });
    }

      if (filters.sort === "lowToHigh") list.sort((a, b) => a.price - b.price);
      if (filters.sort === "highToLow") list.sort((a, b) => b.price - a.price);

      return list;
  }, [filters]);

    // ---------------- PAGINATION ----------------
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayed = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // ---------------- HELPERS ----------------
    const isWishlisted = (id: number) =>
        wishlistItems.some((item) => item.id === id);

    // ---------------- HANDLERS ----------------
    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement>,
        product: Product
    ) => {
        e.stopPropagation();

      dispatch(
        addToCart({
          ...product,
          quantity: 1,
      })
    );

      setAdding((prev) => ({ ...prev, [product.id]: true }));
      setToast(`${product.name} added to cart`);

      setTimeout(() => setAdding((p) => ({ ...p, [product.id]: false })), 1000);
      setTimeout(() => setToast(null), 1400);
  };

    const handleWishlist = (
        e: React.MouseEvent<HTMLDivElement>,
        product: Product
    ) => {
        e.stopPropagation();

      if (isWishlisted(product.id)) {
          dispatch(removeFromWishlist(product.id));
          setToast("Removed from wishlist");
      } else {
        dispatch(addToWishlist(product));
        setToast("Added to wishlist");
    }

      setTimeout(() => setToast(null), 1400);
  };

    const handleShare = async (
        e: React.MouseEvent<HTMLDivElement>,
        product: Product
    ) => {
        e.stopPropagation();
      const url = `${window.location.origin}/shop/${product.slug}`;

      if (navigator.share) {
          await navigator.share({
              title: product.name,
              text: product.description,
              url,
      });
    } else {
        await navigator.clipboard.writeText(url);
        setToast("Link copied");
        setTimeout(() => setToast(null), 1200);
    }
  };

    const HeartIcon = ({ active }: { active: boolean }) => (
        <svg
            className={`w-4 h-4 transition-all ${active
                    ? "fill-red-500 stroke-red-500 scale-110"
                    : "fill-transparent stroke-gray-700"
                }`}
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="M12 21s-6-4.4-10-9.5S2 2 7 2s5 4 5 4 2-4 7-4 5 4 5 9.5S12 21 12 21z" />
        </svg>
    );

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div
                  className={`grid ${filters.layout === "grid"
                          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                          : "grid-cols-1"
                      } gap-6`}
              >
                  {displayed.map((product) => (
                      <div
                          key={product.id}
                  onClick={() => router.push(`/shop/${product.slug}`)}
                  className="group cursor-pointer bg-white shadow-sm hover:shadow-md transition rounded"
              >
                  <div className="relative overflow-hidden">
                      <Image
                          src={product.img}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-[350px] object-cover group-hover:scale-105 transition"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                          <button
                              onClick={(e) => handleAddToCart(e, product)}
                              className={`px-6 py-2 rounded font-semibold transition ${adding[product.id]
                                      ? "bg-green-600 text-white"
                                      : "bg-white text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
                                  }`}
                          >
                              {adding[product.id] ? "Added ✓" : "Add to Cart"}
                          </button>

                          <div className="flex gap-3">
                              <div
                                  onClick={(e) => handleShare(e, product)}
                                  className="p-2 bg-white rounded-full cursor-pointer"
                              >
                                  <FiShare2 className="text-gray-700" />
                              </div>

                              <div
                                  onClick={(e) => handleWishlist(e, product)}
                                  className="p-2 bg-white rounded-full cursor-pointer"
                              >
                                  <HeartIcon active={isWishlisted(product.id)} />
                              </div>

                              <div className="p-2 bg-white rounded-full">
                                  <FiShoppingCart className="text-gray-700" />
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="p-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <p className="mt-2 font-bold">
                          Rs. {product.price.toLocaleString("en-IN")}
                      </p>
                  </div>
              </div>
          ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-3 mt-10">
                  <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded"
                  >
                      Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                      <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-[#B88E2F] text-white" : ""
                      }`}
              >
                  {i + 1}
              </button>
          ))}

                  <button
                      onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded"
                  >
                      Next
                  </button>
              </div>
          </div>

          {toast && <Toast message={toast} />}
      </section>
  );
}
