// src/types/order.ts

export interface OrderItem {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
}

export interface OrderTrackingStep {
  status: string;
  date: string;
  completed: boolean;
}

export interface Order {
  orderId: string;
  placedAt: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
  tracking: OrderTrackingStep[];
}
