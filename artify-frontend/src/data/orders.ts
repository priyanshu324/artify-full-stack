// src/data/orders.ts
// TODO (Backend): Replace mock data with API response

import { Order } from "@/src/types/order";

export const orders: Order[] = [
  {
    orderId: "ORD-1001",
    placedAt: "2025-01-14",
    totalAmount: 12500,
    status: "Shipped",
    shippingAddress: "123 Street, Jaipur, Rajasthan",
    paymentMethod: "UPI (Google Pay)",
    items: [
      {
        id: 1,
        name: "Syltherine Chair",
        img: "/home/products/product1.svg",
        price: 3500,
        quantity: 2,
      },
      {
        id: 2,
        name: "Luxury Sofa",
        img: "/home/products/product1.svg",
        price: 5500,
        quantity: 1,
      },
    ],
    tracking: [
      { status: "Order Placed", date: "12 Jan", completed: true },
      { status: "Packed", date: "13 Jan", completed: true },
      { status: "Shipped", date: "14 Jan", completed: true },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false },
    ],
  },
  {
    orderId: "ORD-1002",
    placedAt: "2025-01-09",
    totalAmount: 7600,
    status: "Delivered",
    shippingAddress: "Sector 21, Gurugram, Haryana",
    paymentMethod: "Cash on Delivery",
    items: [
      {
        id: 3,
        name: "Modern Lamp",
        img: "/home/products/product1.svg",
        price: 2600,
        quantity: 2,
      },
    ],
    tracking: [
      { status: "Order Placed", date: "7 Jan", completed: true },
      { status: "Packed", date: "8 Jan", completed: true },
      { status: "Shipped", date: "9 Jan", completed: true },
      { status: "Out for Delivery", date: "10 Jan", completed: true },
      { status: "Delivered", date: "10 Jan", completed: true },
    ],
  },
];
