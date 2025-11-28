"use client";
import React from "react";
import { orders } from "@/src/data/orders";

export default function AdminOrdersTable() {
    return (
        <div className="bg-white p-4 rounded">
            <h2 className="font-semibold mb-4">Admin — Orders</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th>Order</th><th>User</th><th>Amount</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.orderId} className="border-t">
                                <td>{o.orderId}</td>
                                <td>{o.shippingAddress.split(",")[0]}</td>
                                <td>Rp {o.totalAmount.toLocaleString("en-IN")}</td>
                                <td>{o.status}</td>
                                <td>
                                    <button className="px-3 py-1 border rounded mr-2">Update</button>
                                    <button className="px-3 py-1 border rounded">Refund</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
