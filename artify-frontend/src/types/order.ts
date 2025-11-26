// src/types/order.ts
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export type OrderItem = {
  id: number;
  name: string;
  slug?: string;
  img: string;
  price: number; // in rupees
  qty: number;
};

export type Order = {
  id: string; // order id like "ORD-123456"
  createdAt: string; // ISO date
  status: OrderStatus;
  items: OrderItem[];
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  subtotal: number;
  shippingCost: number;
  discount?: number;
  total: number;
  tracking?: {
    courier: string;
    trackingId?: string;
    history?: { date: string; location?: string; status: OrderStatus; note?: string }[];
  };
  payment: {
    method: string;
    status: "pending" | "paid" | "failed" | "cod";
  };
};
