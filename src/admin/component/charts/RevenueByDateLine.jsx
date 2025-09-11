import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RevenueByDateLine({ data }) {
  // data: [{ date: "2025-08-24", revenue: 620 }]
  const fmtINR = (v) =>
    typeof v === "number" ? v.toLocaleString(undefined, { style: "currency", currency: "INR" }) : v;

  return (
  <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
    <h3 className="font-semibold mb-2 text-gray-800">Revenue by Date</h3>
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" /> {/* light grid */}
          <XAxis dataKey="date" stroke="#374151" /> {/* dark gray axis text */}
          <YAxis tickFormatter={fmtINR} stroke="#374151" />
          <Tooltip
            formatter={(v) => fmtINR(v)}
            contentStyle={{
              backgroundColor: "#F9FAFB", // light tooltip
              border: "1px solid #D1D5DB",
              color: "#111827",
            }}
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366F1"  // Indigo (softer violet for light mode)
            strokeWidth={2}
            dot={{ fill: "#818CF8", r: 4 }} // lighter indigo dots
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}
