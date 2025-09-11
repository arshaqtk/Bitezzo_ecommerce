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
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Orders Overview
    </h1>

    {/* ✅ Summary Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        onClick={() => filterOrders("pending")}
        className="flex items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-200"
      >
        <Clock className="text-amber-600 w-6 h-6 mr-3" />
        <div>
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-lg font-semibold text-gray-900">{pendingCount}</p>
        </div>
      </div>

      <div
        onClick={() => filterOrders("confirmed")}
        className="flex items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-200"
      >
        <CheckCircle2 className="text-emerald-600 w-6 h-6 mr-3" />
        <div>
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-lg font-semibold text-gray-900">{confirmedCount}</p>
        </div>
      </div>

      <div
        onClick={() => filterOrders("delivered")}
        className="flex items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-200"
      >
        <Truck className="text-sky-600 w-6 h-6 mr-3" />
        <div>
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-lg font-semibold text-gray-900">{deliveredCount}</p>
        </div>
      </div>

      <div
        onClick={() => filterOrders("canceled")}
        className="flex items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer border border-gray-200"
      >
        <XCircle className="text-rose-600 w-6 h-6 mr-3" />
        <div>
          <p className="text-sm text-gray-600">Canceled</p>
          <p className="text-lg font-semibold text-gray-900">{canceledCount}</p>
        </div>
      </div>
    </div>

    {/* ✅ Reset Filter Button */}
    {orders.length > 0 && (
      <button
        onClick={resetFilter}
        className="mb-6 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
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
          className="rounded-2xl shadow-md hover:shadow-lg transition p-6 cursor-pointer bg-white border border-gray-200"
        >
          <p className="text-sm mb-1">
            <span className="font-medium text-gray-900">Item count :</span>{" "}
            {order.products.length}
          </p>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-900">Order ID:</span> {order.id}
          </p>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-900">Date:</span> {order.date}
          </p>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-900">Amount:</span>{" "}
            <span className="text-gray-900">₹{order.subTotal}</span>
          </p>

          <p className="text-sm mb-1">
            <span className="font-medium text-gray-900">Customer:</span>{" "}
            {order.shippingAddress.name}
          </p>

          {/* Status badge */}
          <span
            className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium shadow-sm
              ${
                order.status.toLowerCase() === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : order.status.toLowerCase() === "canceled"
                  ? "bg-rose-100 text-rose-700"
                  : order.status.toLowerCase() === "delivered"
                  ? "bg-sky-100 text-sky-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
          >
            {order.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

}

export default AdminViewOrder;
