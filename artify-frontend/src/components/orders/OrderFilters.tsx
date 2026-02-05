"use client";
import React from "react";

export default function OrderFilters({ query, setQuery, status, setStatus, sort, setSort }: {
    query: string, setQuery: (s: string) => void,
    status: string, setStatus: (s: string) => void,
    sort: "newest" | "oldest", setSort: (s: "newest" | "oldest") => void
}) {
    return (
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-1/2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order ID or product" className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="flex gap-3 items-center">
              <select className="px-3 py-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="all">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
              </select>

              <select className="px-3 py-2 border rounded" value={sort} onChange={(e) => setSort(e.target.value as any)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
              </select>
          </div>
      </div>
  );
}