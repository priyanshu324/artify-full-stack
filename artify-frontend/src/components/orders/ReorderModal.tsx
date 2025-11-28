"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useCartStore } from "@/src/store/cartStore";

interface ReorderModalProps {
    open: boolean;
    onClose: () => void;
    item: any; // from order.items[]
}

export default function ReorderModal({ open, onClose, item }: ReorderModalProps) {
    const addToCart = useCartStore((s) => s.addToCart);

    const [quantity, setQuantity] = useState(1);

    if (!open) return null;

    const handleConfirm = () => {
        addToCart({
            id: item.productId,
            name: item.name,
            price: item.price,
            img: item.img,
            slug: item.slug,
            quantity,
        });

        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg animate-fadeIn">
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold">Reorder Item</h3>
                    <FiX className="cursor-pointer text-xl" onClick={onClose} />
                </div>

                <div className="p-4 space-y-4">
                    {/* Preview */}
                    <div className="flex gap-4">
                        <Image
                            src={item.img}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-md"
                        />

                        <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-gray-600 text-sm">
                                Rp {item.price.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Quantity:</span>
                        <div className="flex items-center gap-2">
                            <button
                                className="w-7 h-7 border rounded hover:bg-gray-100"
                                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                className="w-7 h-7 border rounded hover:bg-gray-100"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Confirm */}
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-[#B88E2F] text-white font-semibold py-3 rounded-md hover:bg-[#a67827] transition"
                    >
                        Confirm Reorder
                    </button>
                </div>
            </div>

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
}
