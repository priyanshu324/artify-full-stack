"use client";

import React from "react";
import { useForm } from "react-hook-form";

export type AddressShape = {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    saveAs?: string; // e.g., "Home", "Office"
};

export default function CheckoutAddress({
    initial,
    onNext,
}: {
    initial?: AddressShape;
    onNext: (data: AddressShape) => void;
}) {
    const { register, handleSubmit, formState } = useForm<AddressShape>({
        defaultValues: initial ?? {
            fullName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            landmark: "",
            saveAs: "",
        },
    });

    return (
        <form
            onSubmit={handleSubmit((data) => onNext(data))}
            className="space-y-6"
        >
            <h2 className="text-xl font-semibold">Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input {...register("fullName", { required: true })} placeholder="Full name" className="border p-3 rounded" />
                <input {...register("phone", { required: true })} placeholder="Phone" className="border p-3 rounded" />
                <input {...register("address", { required: true })} placeholder="Address (House, Street)" className="border p-3 rounded sm:col-span-2" />
                <input {...register("city", { required: true })} placeholder="City" className="border p-3 rounded" />
                <input {...register("state", { required: true })} placeholder="State" className="border p-3 rounded" />
                <input {...register("pincode", { required: true })} placeholder="Pincode" className="border p-3 rounded" />
                <input {...register("landmark")} placeholder="Landmark (optional)" className="border p-3 rounded sm:col-span-2" />
                <input {...register("saveAs")} placeholder="Label (Home / Office)" className="border p-3 rounded sm:col-span-2" />
            </div>

            <div className="flex justify-end gap-4">
                <button type="submit" className="bg-[#B88E2F] text-white px-6 py-2 rounded font-medium">
                    Save & Continue
                </button>
            </div>
        </form>
    );
}
