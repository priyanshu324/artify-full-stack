export const shipments = [
  {
    trackingId: "TRK-1001",
    carrier: "Delhivery",
    trackingUrl: "https://example.com/delhivery/TRK-1001",
    eta: "2025-11-26",
    steps: [
      { status: "Manifested", date: "2025-11-21", completed: true },
      { status: "In Transit", date: "2025-11-22", completed: true },
      { status: "Out for Delivery", date: "2025-11-24", completed: false },
    ],
  },
];
