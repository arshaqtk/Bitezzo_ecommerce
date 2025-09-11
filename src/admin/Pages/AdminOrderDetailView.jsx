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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-600">Loading order details...</p>
    </div>
  )
}

return (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h2>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Name:</span> {order.shippingAddress.name}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Address:</span> {order.shippingAddress.address}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">City:</span> {order.shippingAddress.city}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Pincode:</span> {order.shippingAddress.pincode}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Phone:</span> {order.shippingAddress.phone}</p>
      </div>

      {/* Order Info */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h2>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Order ID:</span> {order.id}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Payment ID:</span> {order.payment}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Date:</span> {order.date}</p>
        <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Subtotal:</span> ₹{order.subTotal}</p>

        {/* Status Dropdown */}
        <div className="mt-4">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value, order.userId)}
            className={`ml-2 px-3 py-1 rounded-md text-sm font-medium border shadow-sm
              ${
                order.status === "Pending"
                  ? "text-amber-700 border-amber-300 bg-amber-50"
                  : order.status === "Canceled"
                  ? "text-rose-700 border-rose-300 bg-rose-50"
                  : order.status === "Confirmed"
                  ? "text-emerald-700 border-emerald-300 bg-emerald-50"
                  : "text-sky-700 border-sky-300 bg-sky-50"
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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {order.products.map((product) => (
          <div
            key={product.productId}
            className="border border-gray-200 bg-white rounded-xl p-4 hover:shadow-md transition"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-200"
            />
            <h3 className="text-md font-medium text-gray-900">{product.productName}</h3>
            <p className="text-sm text-gray-600">Price: ₹{product.productPrice}</p>
            <p className="text-sm text-gray-600">Quantity: {product.productQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

}

export default AdminOrderDetailView
