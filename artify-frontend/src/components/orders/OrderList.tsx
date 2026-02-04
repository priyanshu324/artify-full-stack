"use client";
import React, { useMemo, useState } from "react";
import type { Order } from "@/src/types/order";
import OrderCard from "./OrderCard";
import OrderFilters from "./OrderFilters";

export default function OrdersList({ initialOrders }: { initialOrders: Order[] }) {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<"all" | string>("all");
    const [sort, setSort] = useState<"newest" | "oldest">("newest");
    const [page, setPage] = useState(1);
    const perPage = 8;

    const filtered = useMemo(() => {
        let res = [...initialOrders];
        if (status !== "all") res = res.filter((o) => o.status === status);
        if (query) res = res.filter((o) => o.orderId.includes(query) || o.items.some(it => it.name.toLowerCase().includes(query.toLowerCase())));
        res.sort((a, b) => sort === "newest" ? +new Date(b.placedAt) - +new Date(a.placedAt) : +new Date(a.placedAt) - +new Date(b.placedAt));
        return res;
    }, [initialOrders, query, status, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const visible = filtered.slice((page - 1) * perPage, page * perPage);

    return (
      <div className="space-y-6">
          <OrderFilters
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
              sort={sort}
              setSort={setSort}
          />
          <div className="space-y-4">
              {visible.map((o) => <OrderCard key={o.orderId} order={o} />)}
          </div>

          {/* pagination */}
          <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
              <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                  <div className="px-3 py-1 border rounded">{page}/{totalPages}</div>
                  <button className="px-3 py-1 border rounded" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
              </div>
          </div>
      </div>
  );
}
