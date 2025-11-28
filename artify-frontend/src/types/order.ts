// src/types/order.ts

export interface OrderItem {
  id: number; // used everywhere in UI
  name: string;
  img: string;
  price: number;
  quantity: number;
}

export interface TrackingStep {
  id: number;
  title: string;
  status: string;
  date: string;
  completed: boolean;
  note: string;
}

export interface ReturnRequest {
  id: string;
  type: "return" | "replace";
  requestedAt: string;
  reason: string;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Return Requested"
  | "Replace Requested";

export interface Order {
  orderId: string;
  placedAt: string;
  deliveredAt?: string;

  status: OrderStatus;

  shippingAddress: string;
  shippingPhone?: string;

  items: OrderItem[];

  subtotal: number;
  shippingFee: number;
  discount?: number; // UI reads it => must exist
  totalAmount: number;

  paymentMethod?: string;

  tracking: TrackingStep[];

  returnRequest?: ReturnRequest;
}
