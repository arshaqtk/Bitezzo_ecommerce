import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/NavBar/Nav'
import { OrderContext } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Axios_instance from '../../api/axiosConfig';
import toast from 'react-hot-toast';


function OrderPage() {
    const { orderDetails, fetchOrderData } = useContext(OrderContext);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const cancelOrder = async (orderId) => {
        try {
            const res = await Axios_instance.get(`/users/${user.id}`);
            const userData = res.data;

            const updatedOrders = userData.orders.map(order =>
                order.id === orderId ? { ...order, status: "Canceled" } : order
            );
            await Axios_instance.patch(`users/${user.id}`, { orders: updatedOrders });
            fetchOrderData();
            toast.success("Order has been canceled");
        } catch (e) {
            console.log(e);
            toast.error("Failed to cancel order");
        }
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12 mt-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">MY ORDERS</h1>

                    {orderDetails.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">You haven't placed any orders yet.</p>
                    ) : (
                        <div className="space-y-8">
                            {orderDetails.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                                >
                                    {/* Order Details Header */}
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                        <div className="mb-4 md:mb-0">
                                            <h2 className="text-xl font-bold text-gray-800">Order ID: #{item.id}</h2>
                                            <p className="text-gray-600 font-medium">Order Date: {item.date}</p>
                                            <p className="text-gray-900 font-bold text-xl mt-1">Total: ₹{item.subTotal}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${item.status === "pending" ? "bg-yellow-100 text-yellow-800" : item.status === "Canceled" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                                {item.status}
                                            </p>
                                            {item.status === "pending" && (
                                                <button
                                                    className="mt-2 text-sm text-red-600 font-semibold hover:text-red-800 transition-colors"
                                                    onClick={() => cancelOrder(item.id)}
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Shipping Address & Products */}
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Shipping Address */}
                                        <div className="bg-gray-50 rounded-lg p-4 flex-1">
                                            <h2 className="text-md font-bold text-gray-800 mb-2">Shipping Address:</h2>
                                            <p className="text-gray-600">{item.shippingAddress.name}</p>
                                            <p className="text-gray-600">{item.shippingAddress.address}, {item.shippingAddress.city}</p>
                                            <p className="text-gray-600">PIN: {item.shippingAddress.pincode}</p>
                                            <p className="text-gray-600">Phone: {item.shippingAddress.phone}</p>
                                        </div>

                                        {/* Products List */}
                                        <div className="flex-1 space-y-4">
                                            <h2 className="text-md font-bold text-gray-800">Products:</h2>
                                            {item.products.map((product) => (
                                                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-3" key={product.productId}>
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-800 truncate">{product.productName}</p>
                                                        <p className="text-sm text-gray-500">Quantity: {product.productQuantity}</p>
                                                        <p className="text-sm font-bold text-gray-900">₹{product.productPrice * product.productQuantity}</p>
                                                    </div>
                                                    <button
                                                        className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                                        onClick={() => navigate(`/productview/${product.productId}`)}
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrderPage;