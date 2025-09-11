import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function OrdersPerUserBar({ data }) {
  // data: [{ name, orders }]
  return (
  <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
    <h3 className="font-semibold mb-2 text-gray-800">Orders per User</h3>
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> {/* light gray grid */}
          <XAxis 
            dataKey="name" 
            interval={0} 
            angle={-15} 
            textAnchor="end" 
            height={60} 
            stroke="#374151" /* darker gray for labels */
          />
          <YAxis allowDecimals={false} stroke="#374151" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#F9FAFB", 
              border: "1px solid #D1D5DB",
              color: "#111827"
            }} 
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          
          {/* Accent Bars (violet) */}
          <Bar 
            dataKey="orders" 
            fill="#6366F1" 
            radius={[6, 6, 0, 0]} 
            label={{ position: "top", fill: "#374151" }} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

}
