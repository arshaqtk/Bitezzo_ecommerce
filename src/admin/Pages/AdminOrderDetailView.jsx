import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderContext } from '../../context/OrderContext'

function AdminOrderDetailView() {
  const { fetchAllOrderData, allOrder,editOrderStatus } = useContext(OrderContext)
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

const handleStatusChange = (orderId, newStatus,userId) => {
    console.log(orderId,newStatus)
     setOrder((prev) => ({ ...prev, status: newStatus }));
  editOrderStatus(orderId, newStatus,userId)  
};


  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {order.shippingAddress.name}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {order.shippingAddress.address}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">City:</span> {order.shippingAddress.city}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Pincode:</span> {order.shippingAddress.pincode}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {order.shippingAddress.phone}</p>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h2>

  <p className="text-sm text-gray-600">
    <span className="font-medium">Order ID:</span> {order.id}
  </p>
  <p className="text-sm text-gray-600">
    <span className="font-medium">Payment ID:</span> {order.payment}
  </p>
  <p className="text-sm text-gray-600">
    <span className="font-medium">Date:</span> {order.Date}
  </p>
  <p className="text-sm text-gray-600">
    <span className="font-medium">Subtotal:</span> ₹{order.subTotal}
  </p>

  {/* Status Dropdown */}
  <div className="mt-4">
    <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
    <select
      id="status"
      value={order.status}
      onChange={(e) => handleStatusChange(order.id, e.target.value,order.userId)}
      className={`ml-2 px-3 py-1 rounded-md text-sm font-medium border 
        ${order.status === "Pending"
          ? "bg-yellow-100 text-yellow-600 border-yellow-300"
          : order.status === "Canceled"
          ? "bg-red-100 text-red-600 border-red-300"
          : order.status === "Confirmed"
          ? "bg-blue-100 text-blue-600 border-blue-300"
          : "bg-green-100 text-green-600 border-green-300"
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
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {order.products.map((product) => (
            <div key={product.productId} className="border rounded-xl p-4 hover:shadow-md transition">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-md font-medium text-gray-800">{product.productName}</h3>
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
