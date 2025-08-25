import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function OrdersPerUserBar({ data }) {
  // data: [{ name, orders }]
  return (
<div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
  <h3 className="font-semibold mb-2 text-violet-700">Orders per User</h3>
  <div style={{ width: "100%", height: 320 }}>
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" />
        <XAxis 
          dataKey="name" 
          interval={0} 
          angle={-15} 
          textAnchor="end" 
          height={60} 
          stroke="#6B7280"
        />
        <YAxis allowDecimals={false} stroke="#6B7280" />
        <Tooltip contentStyle={{ backgroundColor: "#EDE9FE", border: "1px solid #8B5CF6" }} />
        <Legend wrapperStyle={{ color: "#6B7280" }} />
        
        {/* Violet Theme Bars */}
        <Bar dataKey="orders" fill="#6D28D9" radius={[6, 6, 0, 0]} label={{ position: "top", fill: "#6B7280" }} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


  );
}
