// src/app/orders/[orderId]/page.tsx
import { notFound } from "next/navigation";
import { orders } from "@/src/data/orders";
import OrderDetails from "@/src/components/orders/OrderDetails";

interface Props {
    params: Promise<{ orderId: string }>; // Next.js returns promise
}

export default async function OrderDetailPage({ params }: Props) {
    // 🔥 FIX: unwrap the promise
    const { orderId } = await params;

    // 🔥 FIX: perform lookup after awaiting params
    const order = orders.find((o) => o.orderId === orderId);

    if (!order) return notFound();

    return <OrderDetails order={order} />;
}
