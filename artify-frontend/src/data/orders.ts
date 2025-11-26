// src/data/orders.ts
import type { Order } from "@/src/types/order";

export const orders: Order[] = [
  {
    id: "ORD-100001",
    createdAt: "2025-10-30T10:12:00.000Z",
    status: "shipped",
    items: [
      {
        id: 1,
        name: "Asgaard Sofa",
        slug: "asgaard-sofa",
        img: "/shop/products/thumb1.svg",
        price: 250000,
        qty: 1,
      },
      {
        id: 2,
        name: "Leviosa Chair",
        slug: "leviosa-chair",
        img: "/shop/products/thumb2.svg",
        price: 50000,
        qty: 2,
      },
    ],
    shipping: {
      name: "Priyanshu Saini",
      phone: "9999999999",
      address: "12 A, Craft Street",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
    subtotal: 350000,
    shippingCost: 150,
    discount: 1000,
    total: 349150,
    tracking: {
      courier: "Shiprocket",
      trackingId: "SHIP123456789",
      history: [
        { date: "2025-10-30T12:00:00.000Z", status: "placed", note: "Order placed" },
        { date: "2025-10-31T09:00:00.000Z", status: "confirmed", note: "Order confirmed" },
        { date: "2025-11-01T13:00:00.000Z", status: "packed", note: "Packed at warehouse" },
        { date: "2025-11-02T08:30:00.000Z", status: "shipped", note: "Handed to courier" },
      ],
    },
    payment: {
      method: "Razorpay - UPI",
      status: "paid",
    },
  },

  {
    id: "ORD-100002",
    createdAt: "2025-10-20T14:30:00.000Z",
    status: "delivered",
    items: [
      {
        id: 3,
        name: "Lolito Sofa",
        slug: "lolito-sofa",
        img: "/shop/products/thumb3.svg",
        price: 700000,
        qty: 1,
      },
    ],
    shipping: {
      name: "Anita Sharma",
      phone: "9888888888",
      address: "45 B, Market Lane",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    subtotal: 700000,
    shippingCost: 0,
    total: 700000,
    tracking: {
      courier: "Delhivery",
      trackingId: "DEL987654321",
      history: [
        { date: "2025-10-20T15:00:00.000Z", status: "placed", note: "Order placed" },
        { date: "2025-10-21T08:00:00.000Z", status: "confirmed" },
        { date: "2025-10-22T10:00:00.000Z", status: "packed" },
        { date: "2025-10-23T11:00:00.000Z", status: "shipped" },
        { date: "2025-10-25T16:30:00.000Z", status: "delivered", note: "Left at doorstep" },
      ],
    },
    payment: {
      method: "Cash On Delivery",
      status: "cod",
    },
  },

  // add more sample orders here...
];
