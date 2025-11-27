// src/app/orders/[orderId]/page.tsx

import { orders } from "@/src/data/orders"; // TODO Backend
import OrderDetails from "@/src/components/orders/OrderDetails";

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
    const order = orders.find((o) => o.orderId === params.orderId);

    if (!order) {
        return (
            <div className="py-20 text-center text-gray-600">
                Order not found.
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <OrderDetails order={order} />
        </section>
    );
}
