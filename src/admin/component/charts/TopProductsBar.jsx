import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TopProductsBar({ data }) {
  // data: [{ name, count }]
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-[#09122C]">
      <h3 className="font-semibold mb-2 text-yellow-500">Top Products (by quantity)</h3>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
            <XAxis dataKey="name" interval={0} angle={-90} textAnchor="end" height={70} stroke="#6B7280" />
            <YAxis allowDecimals={false} stroke="#6B7280" />
            <Tooltip  contentStyle={{ backgroundColor: "#F5F3FF", border: "1px solid #C4B5FD" }} 
              itemStyle={{ color: "#7C3AED" }} />
            <Legend wrapperStyle={{ color: "#7C3AED" }}/>
            <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
