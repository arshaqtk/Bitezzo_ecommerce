import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TopProductsBar({ data }) {
  // data: [{ name, count }]
  return (
  <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
    <h3 className="font-semibold mb-2 text-gray-800">Top Products (by quantity)</h3>
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> {/* light gray grid */}
          <XAxis 
            dataKey="name" 
            interval={0} 
            angle={-90} 
            textAnchor="end" 
            height={70} 
            stroke="#374151" /* darker gray for labels */
          />
          <YAxis allowDecimals={false} stroke="#374151" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#F9FAFB", 
              border: "1px solid #D1D5DB", 
              color: "#111827" 
            }} 
            itemStyle={{ color: "#374151" }}
          />
          <Legend wrapperStyle={{ color: "#374151" }} />
          <Bar 
            dataKey="count" 
            fill="#6366F1"   /* Indigo bars */
            radius={[6, 6, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

}
