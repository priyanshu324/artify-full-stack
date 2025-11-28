"use client";
import React from "react";
import type { TrackingStep } from "@/src/types/order";

export default function TrackShipment({ data }: any) {
    // data: { trackingId, carrier, label, steps: TrackingStep[], eta }
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Tracking — {data.id}</h2>
            <p className="text-sm text-gray-500">Carrier: {data.carrier} • ETA: {data.eta}</p>

            <div className="mt-6 space-y-4">
                {data.steps.map((s: TrackingStep, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className="mt-1">
                            <div className={`w-3 h-3 rounded-full ${s.completed ? "bg-[#B88E2F]" : "bg-gray-300"}`} />
                            {idx < data.steps.length - 1 && <div className="w-px h-10 bg-gray-200 mx-auto mt-1" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="font-medium">{s.status}</div>
                                <div className="text-xs text-gray-400">{s.date}</div>
                            </div>
                            {s.note && <div className="text-sm text-gray-500 mt-1">{s.note}</div>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <a className="text-sm text-indigo-600" href={data.trackingUrl} target="_blank" rel="noreferrer">Open carrier tracking page</a>
            </div>
        </div>
    );
}
