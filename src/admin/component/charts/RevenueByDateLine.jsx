import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RevenueByDateLine({ data }) {
  // data: [{ date: "2025-08-24", revenue: 620 }]
  const fmtINR = (v) =>
    typeof v === "number" ? v.toLocaleString(undefined, { style: "currency", currency: "INR" }) : v;

  return (
   <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-[#09122C]">
  <h3 className="font-semibold mb-2 text-yellow-500">Revenue by Date</h3>
  <div style={{ width: "100%", height: 320 }}>
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid stroke="#E9D5FF" strokeDasharray="3 3" /> 
        <XAxis dataKey="date" stroke="#6B7280" />
        <YAxis tickFormatter={fmtINR} stroke="#6B7280" />
        <Tooltip 
          formatter={(v) => fmtINR(v)} 
          contentStyle={{ backgroundColor: "#F5F3FF", borderColor: "#C4B5FD" }} 
        />
        <Legend wrapperStyle={{ color: "#6D28D9" }} />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#7C3AED"   // violet line
          strokeWidth={2} 
          dot={{ fill: "#A78BFA", r: 4 }} // small violet dots
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

  );
}
