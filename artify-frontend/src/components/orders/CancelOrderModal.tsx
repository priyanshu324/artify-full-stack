"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface CancelOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderId: string;
}

export default function CancelOrderModal({ isOpen, onClose, onConfirm, orderId }: CancelOrderModalProps) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Confirm Cancellation</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                      <XMarkIcon className="w-6 h-6" />
                  </button>
              </div>
              <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel order <strong>#{orderId}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                  <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">
                      Nevermind
                  </button>
                  <button
                      onClick={() => {
                          onConfirm();
                          onClose();
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                      Yes, Cancel Order
                  </button>
              </div>
          </div>
      </div>
  );
}