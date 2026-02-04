// NO "use client"

import { notFound } from "next/navigation";
import { orders } from "@/src/data/orders";
import OrderTracking from "@/src/components/orders/OrderTracking";

interface Props {
    params: Promise<{ trackingId: string }>; // <-- important
}

export default async function TrackPage({ params }: Props) {
    const { trackingId } = await params; // <-- FIX

    const order = orders.find(o => o.orderId === trackingId);

    if (!order) return notFound();

    return (
        <section className="max-w-4xl mx-auto px-4 py-16 pt-20">
            <h1 className="text-2xl font-semibold mb-4">
                Track shipment — {order.orderId}
            </h1>

            <div className="bg-white p-6 rounded shadow-sm">
                <OrderTracking steps={order.tracking} />
            </div>
        </section>
    );
}
