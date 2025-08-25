import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

function AdminViewOrder() {

    const { fetchAllOrderData, allOrder } = useContext(OrderContext)
   const navigate=useNavigate()
    useEffect(() => {
        fetchAllOrderData()
    }, [])



    return (
       <div className="min-h-screen bg-[#F5F7FA] p-8">
  <h1 className="text-2xl font-bold text-violet-900 mb-6">
    Orders Overview
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
    {allOrder.map((order) => (
      <div
      onClick={()=>navigate(`/admin/order-detailview/${order.id}`)}
        key={order.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 cursor-pointer"
      >
       
       
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-medium">Item count :</span> {order.products.length}
        </p>

        {/* Order ID */}
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Order ID:</span> {order.id}
        </p>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Date:</span> {order.date}
        </p>

        {/* Amount */}
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Amount:</span>{" "}
          <span className="text-green-600">₹{order.subTotal}</span>
        </p>

        {/* Customer Name */}
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Customer:</span>{" "}
          {order.shippingAddress.name}
        </p>

        {/* Status Badge */}
        <span
          className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium
            ${order.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : order.status === "Canceled"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
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

export default AdminViewOrder