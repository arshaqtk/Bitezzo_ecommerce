import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PALETTE = ["#6366F1","#22C55E","#F59E0B","#EF4444","#06B6D4","#8B5CF6","#F97316","#84CC16","#E11D48"];

export default function OrdersStatusPie({ data }) {
  // data: [{ status, count }]
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm bg-white">
      <h3 className="font-semibold mb-2">Orders by Status</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={data} dataKey="count" nameKey="status" innerRadius={60} outerRadius={100} paddingAngle={2}>
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
