"use client";

import React from "react";

interface IconButtonProps {
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    ariaLabel: string;
}

const CompareButton: React.FC<IconButtonProps> = ({ onClick, children, ariaLabel }) => {
    return (
        <button
            aria-label={ariaLabel}
            onClick={(e) => onClick && onClick(e)}
            className="
        w-8 h-8 rounded-md bg-white
        flex items-center justify-center
        shadow-sm border border-gray-200
        hover:border-[#B88E2F] hover:shadow-md
        transition-all
      "
        >
            {children}
        </button>
    );
};

export default CompareButton;