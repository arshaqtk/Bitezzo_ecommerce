export default function StatsCards({ stats }) {
  // stats = { totalUsers, totalOrders, totalRevenue, avgOrderValue }
  const fmtCurrency = (n) =>
    typeof n === "number" ? n.toLocaleString(undefined, { style: "currency", currency: "INR" }) : n;

  const items = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Total Products", value: stats.totalProducts },
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Total Revenue", value: fmtCurrency(stats.totalRevenue) },
  ];

  return (
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {items.map((it) => (
    <div
      key={it.label}
      className="rounded-2xl border border-violet-200 p-4 shadow-sm bg-white hover:shadow-md transition"
    >
      <div className="text-sm text-violet-600 font-medium">{it.label}</div>
      <div className="text-2xl font-bold mt-1 text-violet-800">{it.value}</div>
    </div>
  ))}
</div>

  );
}
