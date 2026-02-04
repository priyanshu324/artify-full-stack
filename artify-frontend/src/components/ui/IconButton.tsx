"use client";
import React from "react";

interface IconButtonProps {
    onClick?: (e?: any) => void;
    children: React.ReactNode;
    ariaLabel?: string;
    className?: string;
}

export default function IconButton({ onClick, children, ariaLabel, className = "" }: IconButtonProps) {
    return (
        <button
            aria-label={ariaLabel}
            onClick={(e) => onClick && onClick(e)}
            className={`w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-sm border border-gray-200 hover:border-[#B88E2F] transition-all cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}
