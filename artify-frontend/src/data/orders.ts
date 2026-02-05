import type { Order } from "@/src/types/order";

export const orders: Order[] = [
  {
    orderId: "ORD-1001",
    placedAt: "2025-11-01",
    status: "Shipped",
    shippingAddress:
      "Priyanshu Saini, 123 MG Road, Jaipur, Rajasthan, India",
    shippingPhone: "+91-9000000000",

    items: [
      {
        id: 1,
        name: "Asgaard Sofa",
        img: "/shop/products/thumb1.svg",
        price: 250000,
        quantity: 1,
        slug: "asgaard-sofa",
      },
      {
        id: 3,
        name: "Leviosa",
        img: "/home/products/product2.svg",
        price: 120000,
        quantity: 2,
        slug: "leviosa",
      },
    ],

    subtotal: 490000,
    shippingFee: 150,
    totalAmount: 490150,

    tracking: [
      {
        id: 1,
        title: "Order Confirmed",
        subtitle: "We have accepted your order",
        date: "2025-11-02",
        completed: true,
      },
      {
        id: 2,
        title: "Packed",
        subtitle: "Packed and ready for shipment",
        date: "2025-11-03",
        completed: true,
      },
      {
        id: 3,
        title: "Shipped",
        subtitle: "Handed over to courier",
        date: "2025-11-04",
        completed: true,
      },
      {
        id: 4,
        title: "Out for Delivery",
        subtitle: "Courier is out for delivery",
        date: "2025-11-05",
        completed: false,
      },
      {
        id: 5,
        title: "Delivered",
        subtitle: "Package will be delivered soon",
        date: "2025-11-06",
        completed: false,
      },
    ],
  },

  {
    orderId: "ORD-1002",
    placedAt: "2025-10-20",
    deliveredAt: "2025-10-24",
    status: "Delivered",
    shippingAddress: "Another Address, City, State",
    shippingPhone: "+91-9000000001",

    items: [
      {
        id: 4,
        name: "Lolito Sofa",
        img: "/home/products/product3.svg",
        price: 7000000,
        quantity: 1,
        slug: "lolito-sofa",
      },
    ],

    subtotal: 7000000,
    shippingFee: 300,
    totalAmount: 7000300,

    tracking: [
      {
        id: 1,
        title: "Order Confirmed",
        subtitle: "Order placed successfully",
        date: "2025-10-21",
        completed: true,
      },
      {
        id: 2,
        title: "Packed",
        subtitle: "Item packed",
        date: "2025-10-22",
        completed: true,
      },
      {
        id: 3,
        title: "Shipped",
        subtitle: "Courier received the package",
        date: "2025-10-23",
        completed: true,
      },
      {
        id: 4,
        title: "Out for Delivery",
        subtitle: "Courier out for delivery",
        date: "2025-10-24",
        completed: true,
      },
      {
        id: 5,
        title: "Delivered",
        subtitle: "Delivered successfully",
        date: "2025-10-24",
        completed: true,
      },
    ],
  },
];
