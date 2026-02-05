"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReturnRequest } from "@/src/types/order";

interface ReturnRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: ReturnRequest) => void;
    orderId: string;
}

export default function ReturnRequestModal({ isOpen, onClose, onSubmit, orderId }: ReturnRequestModalProps) {
    const [type, setType] = useState<"return" | "replace">("return");
    const [reason, setReason] = useState("");
    const [comments, setComments] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
      if (!reason) {
          alert("Please select a reason.");
          return;
      }

      const newRequest: ReturnRequest = {
          id: `RET-${Date.now()}`,
          type: type,
          requestedAt: new Date().toISOString(),
          reason: `${reason} - ${comments}`,
      };

      onSubmit(newRequest);
      onClose();
  };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Request Return/Replacement</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                      <XMarkIcon className="w-6 h-6" />
                  </button>
              </div>

              <div className="space-y-4">
                  <p className="text-sm text-gray-600">For Order #{orderId}</p>
                  {/* Type Selection */}
                  <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                          <input type="radio" value="return" checked={type === 'return'} onChange={() => setType('return')} /> Return
                      </label>
                      <label className="flex items-center gap-2">
                          <input type="radio" value="replace" checked={type === 'replace'} onChange={() => setType('replace')} /> Replacement
                      </label>
                  </div>

                  {/* Reason Selection */}
                  <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for request</label>
                      <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 block w-full border p-2 rounded-md">
                          <option value="" disabled>Select a reason</option>
                          <option value="item_damaged">Artwork was damaged upon arrival</option>
                          <option value="wrong_item">Received the wrong artwork</option>
                          <option value="not_as_described">Not as described on the website</option>
                          <option value="changed_mind">Changed my mind</option>
                          <option value="other">Other</option>
                      </select>
                  </div>

                  {/* Comments */}
                  <div>
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments (Optional)</label>
                      <textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} rows={3} className="mt-1 block w-full border p-2 rounded-md"></textarea>
                  </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                  <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">
                      Cancel
                  </button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-[#B88E2F] text-white rounded-md">
                      Submit Request
                  </button>
              </div>
          </div>
      </div>
  );
}