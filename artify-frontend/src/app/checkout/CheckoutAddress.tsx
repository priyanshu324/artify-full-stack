"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

// (Keep your AddressShape type as is)
export type AddressShape = { fullName: string; phone: string; address: string; city: string; state: string; pincode: string; landmark?: string; };

// --- MOCK DATA: In production, this comes from a user API call ---
const savedAddresses: AddressShape[] = [
    { fullName: "Priya Sharma", phone: "9876543210", address: "123, Art Lane, Koramangala", city: "Bengaluru", state: "Karnataka", pincode: "560034" },
    { fullName: "Rohan Verma", phone: "9988776655", address: "A-45, Design Apartments, Malad West", city: "Mumbai", state: "Maharashtra", pincode: "400064" },
];

export default function CheckoutAddress({ onNext }: { onNext: (data: AddressShape) => void; }) {
    const { register, handleSubmit, setValue } = useForm<AddressShape>();
    const [showForm, setShowForm] = useState(savedAddresses.length === 0);

    const selectAddress = (addr: AddressShape) => {
        // Use setValue from react-hook-form to populate the form
        Object.keys(addr).forEach(key => {
            setValue(key as keyof AddressShape, addr[key as keyof AddressShape]);
        });
        // And directly submit this chosen address
        onNext(addr);
    };

    return (
        <div className="mt-6">
            {/* Saved Addresses List */}
            {!showForm && (
                <div className="space-y-4 mb-6">
                    {savedAddresses.map((addr, i) => (
                        <div key={i} onClick={() => selectAddress(addr)} className="border rounded-lg p-4 cursor-pointer hover:border-[#B88E2F]">
                            <p className="font-semibold">{addr.fullName}</p>
                            <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.pincode}</p>
                        </div>
                    ))}
                    <button onClick={() => setShowForm(true)} className="w-full text-center p-3 border-2 border-dashed rounded-lg hover:bg-gray-50">
                        + Add a New Address
                    </button>
                </div>
            )}

            {/* New Address Form */}
            {showForm && (
                <form onSubmit={handleSubmit(data => onNext(data))} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input {...register("fullName", { required: true })} placeholder="Full name" className="border p-3 rounded" />
                        <input {...register("phone", { required: true })} placeholder="Phone" className="border p-3 rounded" />
                        <input {...register("address", { required: true })} placeholder="Address (House, Street)" className="border p-3 rounded sm:col-span-2" />
                        <input {...register("city", { required: true })} placeholder="City" className="border p-3 rounded" />
                        <input {...register("state", { required: true })} placeholder="State" className="border p-3 rounded" />
                        <input {...register("pincode", { required: true })} placeholder="Pincode" className="border p-3 rounded" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        {savedAddresses.length > 0 && <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded">Cancel</button>}
                        <button type="submit" className="bg-[#B88E2F] text-white px-6 py-2 rounded font-medium">Save & Continue</button>
                    </div>
                </form>
            )}
        </div>
    );
}