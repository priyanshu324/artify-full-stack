// src/components/ui/Toast.tsx
"use client";
import React, { useEffect } from "react";

interface Props { message: string }

const Toast: React.FC<Props> = ({ message }) => {
  useEffect(() => {
    const t = setTimeout(() => { }, 1200);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black/90 text-white px-4 py-2 rounded-md shadow">
        {message}
      </div>
    </div>
  );
};

export default Toast;