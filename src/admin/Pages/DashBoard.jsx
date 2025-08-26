import { useContext, useEffect, useMemo, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import OrdersStatusPie from "../component/charts/OrdersStatusPie";
import OrdersPerUserBar from "../component/charts/OrdersPerUserBar";
import RevenueByDateLine from "../component/charts/RevenueByDateLine";
import TopProductsBar from "../component/charts/TopProductsBar";
import StatsCards from "../component/StatsCard";


import {
  flattenOrders,
  sumRevenue,
  countByStatus,
  countOrdersPerUser,
  revenueByDate,
  topProductsByCount,
} from "../utils/analytics";
import { ProductContext } from "../../context/ProductContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    const { products } = useContext(ProductContext);

  // 1) Fetch users (with nested orders) from JSON Server
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await Axios_instance.get("/users?role=user");
        if (mounted) setUsers(res.data || []);
      } catch (e) {
        console.error("Failed to load users", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // 2) Compute analytics for the dashboard
  const { orders, stats, byStatus, perUser, revByDate, topProducts } = useMemo(() => {
    const orders = flattenOrders(users);
    const totalUsers = users.length;
    const totalProducts=products.length
    const totalOrders = orders.length;
    const totalRevenue = sumRevenue(orders);
    // const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    return {
      orders,
      stats: { totalUsers, totalOrders, totalRevenue, totalProducts },
      byStatus: countByStatus(orders),
      perUser: countOrdersPerUser(orders),
      revByDate: revenueByDate(orders),
      topProducts: topProductsByCount(orders, 10),
    };
  }, [users]);

  if (loading) return <div className="p-6">Loading admin dashboard…</div>;

  return (
    <div className="p-6 space-y-6 bg-[#0B192C] min-h-screen">
      <h1 className="text-2xl font-bold text-violet-400">Admin Dashboard</h1>

      {/* KPI cards */}
      <StatsCards stats={stats} />

      {/* Charts grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <OrdersStatusPie data={byStatus} />
        <OrdersPerUserBar data={perUser} />
        <RevenueByDateLine data={revByDate} />
        <TopProductsBar data={topProducts} />
      </div>
    </div>
  );
}
