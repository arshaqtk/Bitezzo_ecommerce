import React, { useContext, useEffect, useState } from 'react'
import Axios_instance from '../../api/axiosConfig'
import { AuthContext } from '../../context/AuthContext'
import Nav from '../../components/NavBar/Nav'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cartpage() {

    const {  removeItem, updateQuantity, cartItems, cartItemCount, subTotal} = useContext(CartContext);
    const navigate=useNavigate()
    
    return (
        <>
            <Nav />
            <div className="bg-gray-100 min-h-screen p-6  mt-17 bg-[#FAF1E6]">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold">{item.productName}</h2>
                                                <p className="text-gray-600">₹{item.productPrice}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-4 md:mt-0 space-x-4">
                                            {/* Quantity Controls */}

                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-200"
                                                    onClick={() => updateQuantity(item.productId, "decrease")}
                                                >
                                                    −
                                                </button>
                                                <span className="px-4">{cartItemCount.find((cartItem) => cartItem.id === item.productId)?.count ?? 1}</span>  {/* optional chaining */}
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-200"
                                                    onClick={() => updateQuantity(item.productId, "increase")}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => removeItem(item.productId)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Section */}
                            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
                                <div className="text-lg font-semibold">
                                    Subtotal: <span className="text-green-600">₹{subTotal}</span>
                                </div>
                                <button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                                onClick={()=>navigate("/checkout")}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div></>
    )
}

export default Cartpage