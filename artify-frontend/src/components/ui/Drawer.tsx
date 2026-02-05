"use client";

import { motion } from "framer-motion";

export default function Drawer({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 transition-opacity z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* DRAWER PANEL */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="fixed top-0 right-0 w-[380px] h-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
            >
                {children}
            </motion.div>
        </>
    );
}