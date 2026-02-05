// src/components/orders/InvoiceDownload.tsx
"use client";

import React, { useRef } from "react";
import type { Order } from "@/src/types/order";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoiceDownload({ order }: { order: Order }) {
    const invoiceRef = useRef<HTMLDivElement | null>(null);

    const handleDownload = async () => {
        if (!invoiceRef.current) return;
        try {
            const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgProps = (pdf as any).getImageProperties(imgData);
            const imgRatio = imgProps.width / imgProps.height;
            const imgHeight = pageWidth / imgRatio;
            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
            pdf.save(`${order.orderId}_invoice.pdf`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div style={{ position: "absolute", left: -9999, top: -9999 }}>
                <div ref={invoiceRef} style={{ width: 794, padding: 20, background: "#fff", color: "#000" }}>
                    <h2>ArtMart — Invoice</h2>
                    <p>Order: {order.orderId}</p>
                    <p>Date: {order.placedAt}</p>
                    <hr />
                    {order.items.map((it) => (
                        <div key={it.id} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
                            <div>
                                <div style={{ fontWeight: 600 }}>{it.name}</div>
                                <div>Qty: {it.quantity}</div>
                            </div>
                            <div>Rs. {(it.price * it.quantity).toLocaleString("en-IN")}</div>
                        </div>
                    ))}
                    <hr />
                    <div style={{ textAlign: "right", fontWeight: 700 }}>Total: Rs. {order.totalAmount.toLocaleString("en-IN")}</div>
                </div>
            </div>

            <button onClick={handleDownload} className="px-4 py-2 border rounded bg-white hover:bg-gray-50">
                Download Invoice (PDF)
            </button>
        </>
    );
}