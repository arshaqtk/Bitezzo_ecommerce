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

  // Filter orders by status
  const filterOrders = (status) => {
    const filtered = allOrder.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
    setOrders(filtered);
  };

  // Reset filter (show all orders)
  const resetFilter = () => {
    setOrders([]);
  };

  // Counts
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

  // Function to determine status badge colors
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "canceled":
        return "bg-rose-100 text-rose-700";
      case "delivered":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Orders Overview
      </h1>

      {/* Summary Section (Kept as is) */}
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

      {/* Reset Filter Button */}
      {orders.length > 0 && (
        <button
          onClick={resetFilter}
          className="mb-6 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
        >
          Show All Orders
        </button>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(orders.length > 0 ? orders : allOrder).map((order) => (
              <tr
                key={order.id}
                onClick={() => navigate(`/admin/order-detailview/${order.id}`)}
                className="cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.shippingAddress.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {order.products.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{order.subTotal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the row click from firing
                      navigate(`/admin/order-detailview/${order.id}`);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminViewOrder;