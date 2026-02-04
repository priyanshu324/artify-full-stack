// src/data/orders.ts
import type { Order } from "@/src/types/order";

export const orders: Order[] = [
  {
    orderId: "ORD-1001",
    placedAt: "2025-11-01",
    status: "Shipped",
    shippingAddress: "Priyanshu Saini, 123 MG Road, Jaipur, Rajasthan, India",
    shippingPhone: "+91-9000000000",
    items: [
      { id: 1, name: "Asgaard Sofa", img: "/shop/products/thumb1.svg", price: 250000, quantity: 1, slug: "asgaard-sofa" },
      { id: 3, name: "Leviosa", img: "/home/products/product2.svg", price: 120000, quantity: 2, slug: "leviosa" },
    ],
    subtotal: 490000,
    shippingFee: 150,
    totalAmount: 490150,
    tracking: [
      { id: 1, date: "2025-11-02", title: "Order confirmed", subtitle: "We have accepted your order", done: true },
      { id: 2, date: "2025-11-03", title: "Packed", subtitle: "Packed and ready", done: true },
      { id: 3, date: "2025-11-04", title: "Shipped", subtitle: "Handed to courier", done: true },
      { id: 4, date: "2025-11-05", title: "Out for Delivery", subtitle: "Courier out for delivery", done: false },
      { id: 5, date: "2025-11-06", title: "Delivered", subtitle: "Delivered to recipient", done: false },
    ],
  },
  {
    orderId: "ORD-1002",
    placedAt: "2025-10-20",
    status: "Delivered",
    shippingAddress: "Another Address, City, State",
    shippingPhone: "+91-9000000001",
    items: [
      { id: 4, name: "Lolito Sofa", img: "/home/products/product3.svg", price: 7000000, quantity: 1, slug: "lolito-sofa" },
    ],
    subtotal: 7000000,
    shippingFee: 300,
    totalAmount: 7000300,
    tracking: [
      { id: 1, date: "2025-10-21", title: "Order confirmed", done: true },
      { id: 2, date: "2025-10-22", title: "Packed", done: true },
      { id: 3, date: "2025-10-23", title: "Shipped", done: true },
      { id: 4, date: "2025-10-24", title: "Out for Delivery", done: true },
      { id: 5, date: "2025-10-24", title: "Delivered", done: true },
    ],
  },
];
