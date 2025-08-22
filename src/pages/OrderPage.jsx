import React, { useContext } from 'react'
import Nav from '../components/NavBar/Nav'
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';



function OrderPage() {
    const { orderDetails } = useContext(OrderContext);
    const navigate = useNavigate()
    console.log(orderDetails)



    return (
        <> <Nav />    
            <div className="bg-gray-100 min-h-screen p-6 mt-17 ">
               
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
 <h1 className="text-2xl font-bold mb-6 text-center">MY ORDERS</h1>

                    {orderDetails.length === 0 ? (
                        <p className="text-gray-500">Your Orders is empty.</p>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {orderDetails.map((item) => (
                                    <div
                                        key={item.id}
                                        className=" border-b pb-4"
                                    > <div className='flex justify-between'><div>
                                            <h2 className="text-lg font-semibold">id:#{item.id}</h2>
                                            <p className="text-gray-600">₹{item.subTotal}</p>
                                            <p className="text-gray-600">Order Date:{item.Date}</p>
                                            <h2 className="text-lg font-semibold">Products :</h2>
                                        </div>
                                        <div> <h2 className="text-lg font-semibold">shippingAddress:</h2>
                                            <p className="text-gray-600">{item.shippingAddress.name},</p>
                                            <p className="text-gray-600">{item.shippingAddress.address}</p>
                                            <p className="text-gray-600">{item.shippingAddress.city}</p>
                                            <p className="text-gray-600">{item.shippingAddress.pincode}</p>
                                            <p className="text-gray-600">{item.shippingAddress.phone}</p>

                                        </div></div>
                                        {item.products.map((product) =>
                                            <div className="mt-5 border border-gray-100 flex justify-around" key={product.productId}>
                                                <img
                                                    src={product.productImage}
                                                    alt={product.productName}
                                                    className="w-20 h-20 object-cover rounded-2xl p-2 "
                                                />
                                                <div>
                                                    <p className='font-semibold'>Name: {product.productName}</p>
                                                    <p className='font-semibold'>Total Price: ₹{product.productPrice * product.productQuantity}</p>
                                                    <p className='font-semibold'>Quantity: {product.productQuantity}</p>



                                                </div>
                                                <div className='flex items-center'><button className='bg-[#273F4F] hover:bg-[#152027] text-white px-2 py-2 rounded-lg h-10 cursor-pointer'
                                                    onClick={() => navigate(`/productview/${product.productId}`)}
                                                >View Product</button>
                                                </div>




                                            </div>)}
                                    </div>
                                ))}
                            </div>



                        </>
                    )}
                </div>
            </div></>
    )
}

export default OrderPage