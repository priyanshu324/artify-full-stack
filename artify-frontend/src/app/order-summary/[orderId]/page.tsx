// src/app/order-summary/[orderId]/page.tsx
import OrderSummary from "@/src/components/orders/OrderSummary";
import { orders } from "@/src/data/orders";

/**
 * Server component page for Order Summary.
 * Must be a server component so `params` is a plain object (not a Promise).
 */
export default function OrderSummaryPage({
    params,
}: {
    params: { orderId: string };
}) {
    // sync access to params is OK in a server component
    const order = orders.find((o) => o.orderId === params.orderId);

    if (!order) {
        return <div className="py-20 text-center">Not found</div>;
    }

    return <OrderSummary order={order} />;
}