import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderContext } from '../../context/OrderContext'

function AdminOrderDetailView() {
  const { fetchAllOrderData, allOrder, editOrderStatus } = useContext(OrderContext)
  const [order, setOrder] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchAllOrderData()
  }, [])

  useEffect(() => {
    if (allOrder.length > 0) {
      const foundOrder = allOrder.find((o) => String(o.id) === String(id))
      setOrder(foundOrder || null)
    }
  }, [allOrder, id])

  const handleStatusChange = (orderId, newStatus, userId) => {
    setOrder((prev) => ({ ...prev, status: newStatus }))
    editOrderStatus(orderId, newStatus, userId)
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B192C]">
        <p className="text-gray-300">Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B192C] p-8">
      <h1 className="text-2xl font-bold text-violet-400 mb-6">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Shipping Address */}
        <div className="bg-[#1A2B4A] rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-violet-300 mb-4">Shipping Address</h2>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Name:</span> {order.shippingAddress.name}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Address:</span> {order.shippingAddress.address}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">City:</span> {order.shippingAddress.city}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Pincode:</span> {order.shippingAddress.pincode}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Phone:</span> {order.shippingAddress.phone}</p>
        </div>

        {/* Order Info */}
        <div className="bg-[#1A2B4A] rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-violet-300 mb-4">Order Information</h2>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Order ID:</span> {order.id}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Payment ID:</span> {order.payment}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Date:</span> {order.date}</p>
          <p className="text-sm text-gray-300"><span className="font-medium text-white">Subtotal:</span> ₹{order.subTotal}</p>

          {/* Status Dropdown */}
          <div className="mt-4">
            <label htmlFor="status" className="text-sm font-medium text-gray-300">Status:</label>
            <select
              id="status"
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value, order.userId)}
              className={`ml-2 px-3 py-1 rounded-md text-sm font-medium border bg-[#0B192C]
                ${order.status === "Pending"
                  ? "text-yellow-400 border-yellow-400"
                  : order.status === "Canceled"
                  ? "text-red-400 border-red-400"
                  : order.status === "Confirmed"
                  ? "text-blue-400 border-blue-400"
                  : "text-green-400 border-green-400"
                }`}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-[#1A2B4A] rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-violet-300 mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {order.products.map((product) => (
            <div
              key={product.productId}
              className="border border-gray-700 bg-[#0B192C] rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-md font-medium text-violet-200">{product.productName}</h3>
              <p className="text-sm text-gray-300">Price: ₹{product.productPrice}</p>
              <p className="text-sm text-gray-300">Quantity: {product.productQuantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailView
