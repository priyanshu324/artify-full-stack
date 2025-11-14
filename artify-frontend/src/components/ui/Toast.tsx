"use client";

import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
}

export default function Toast({ message }: ToastProps) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setShow(false), 2000);
        return () => clearTimeout(t);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm animate-slideUp z-[9999]">
            {message}

            <style>{`
        .animate-slideUp {
          animation: slideUp .25s ease-out;
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
