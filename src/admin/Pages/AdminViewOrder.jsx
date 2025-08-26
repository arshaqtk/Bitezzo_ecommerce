import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

// Lucide Icons
import { Clock, CheckCircle2, Truck, XCircle } from "lucide-react";

function AdminViewOrder() {
  const { fetchAllOrderData, allOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrderData();
  }, []);

  // ✅ Filter orders by status
  const filterOrders = (status) => {
    const filtered = allOrder.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
    setOrders(filtered);
  };

  // ✅ Reset filter (show all orders)
  const resetFilter = () => {
    setOrders([]);
  };

  // ✅ Counts
  const pendingCount = allOrder.filter(
    (o) => o.status.toLowerCase() === "pending"
  ).length;
  const confirmedCount = allOrder.filter(
    (o) => o.status.toLowerCase() === "confirmed"
  ).length;
  const deliveredCount = allOrder.filter(
    (o) => o.status.toLowerCase() === "delivered"
  ).length;
  const canceledCount = allOrder.filter(
    (o) => o.status.toLowerCase() === "canceled"
  ).length;

  return (
    <div className="min-h-screen bg-[#0B192C] p-8">
      <h1 className="text-2xl font-bold text-violet-400 mb-6">
        Orders Overview
      </h1>

      {/* ✅ Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          onClick={() => filterOrders("pending")}
          className="flex items-center p-4 bg-yellow-50 rounded-xl shadow-sm cursor-pointer"
        >
          <Clock className="text-yellow-600 w-6 h-6 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-lg font-semibold text-yellow-700">
              {pendingCount}
            </p>
          </div>
        </div>

        <div
          onClick={() => filterOrders("confirmed")}
          className="flex items-center p-4 bg-green-50 rounded-xl shadow-sm cursor-pointer"
        >
          <CheckCircle2 className="text-green-600 w-6 h-6 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-lg font-semibold text-green-700">
              {confirmedCount}
            </p>
          </div>
        </div>

        <div
          onClick={() => filterOrders("delivered")}
          className="flex items-center p-4 bg-blue-50 rounded-xl shadow-sm cursor-pointer"
        >
          <Truck className="text-blue-600 w-6 h-6 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-lg font-semibold text-blue-700">
              {deliveredCount}
            </p>
          </div>
        </div>

        <div
          onClick={() => filterOrders("canceled")}
          className="flex items-center p-4 bg-red-50 rounded-xl shadow-sm cursor-pointer"
        >
          <XCircle className="text-red-600 w-6 h-6 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Canceled</p>
            <p className="text-lg font-semibold text-red-700">
              {canceledCount}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Reset Filter Button */}
      {orders.length > 0 && (
        <button
          onClick={resetFilter}
          className="mb-6 px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700"
        >
          Show All Orders
        </button>
      )}

      {/* ✅ Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(orders.length > 0 ? orders : allOrder).map((order) => (
          <div
            onClick={() => navigate(`/admin/order-detailview/${order.id}`)}
            key={order.id}
            className={`rounded-2xl shadow-md hover:shadow-lg transition p-6 cursor-pointer ${
              order.status.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status.toLowerCase() === "canceled"
                ? "bg-red-100 text-red-700"
                : order.status.toLowerCase() === "delivered"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            <p className="text-sm mb-1">
              <span className="font-medium">Item count :</span>{" "}
              {order.products.length}
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Order ID:</span> {order.id}
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Date:</span> {order.date}
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Amount:</span>{" "}
              <span className="text-green-600">₹{order.subTotal}</span>
            </p>

            <p className="text-sm mb-1">
              <span className="font-medium">Customer:</span>{" "}
              {order.shippingAddress.name}
            </p>

            <span className="inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium bg-white shadow-sm">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminViewOrder;
