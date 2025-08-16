import React, { useContext, useEffect, useState } from 'react'
import Axios_instance from '../../api/axiosConfig'
import { AuthContext } from '../../context/AuthContext'

function Cartpage() {
    const [cartItems,setCartItems]=useState([])
    const [cartItemCount,setCartItemsCount]=useState(0)
    const {user}=useContext(AuthContext)

    useEffect(()=>{
       async function fetchData(){
            try{
                console.log(user.id)
            const {data}=await Axios_instance.get(`/users?id=${user.id}`)
            const cartData=data[0].cart
            console.log("user",cartData)
        }catch{
            console.log("error found")
        }
        }
        fetchData()
        
    },[])
  return (
    <>
     <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0 space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        className="px-3 py-1 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, "decrease")}
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-3 py-1 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeItem(item.id)}
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
                Subtotal: <span className="text-green-600">${subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
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