import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../api/axiosConfig';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';

export const OrderContext = createContext()
export const OrderProvider = ({ children }) => {

   const [shippingDetails, setShippingDetails] = useState({})
   const [totalAmount, setTotalAmount] = useState(0)
   const [orderDetails, setOrderDetails] = useState([])

   const navigate = useNavigate();
   const { user } = useContext(AuthContext)
   const { cartItems, subTotal } = useContext(CartContext);



   const fetchData = async () => {

      const userResponse = await Axios_instance.get(`users/${user.id}`)
      const userResponseData = userResponse.data
      setShippingDetails(userResponseData.shippingAddress)
      setOrderDetails(userResponseData.orders)

   }


   useEffect(() => {
      fetchData()
   }, [])




   const addShippingAddress = async (shippingData, TotalAmount, { fromBuyNow, productId }) => {

      setTotalAmount(TotalAmount)
      setShippingDetails(shippingData)
      await Axios_instance.patch(`users/${user.id}`, { shippingAddress: shippingData })
      if (fromBuyNow) {
         navigate("/payment", { state: { fromBuyNow, productId } })
      } else {
         navigate
            ("/payment")
      }
   }

   const addCartPayment = async (paymentId, subtotal) => {

      const userResponse = await Axios_instance.get(`users/${user.id}`)
      const userResponseData = userResponse.data
      const order = [...userResponseData.orders, { id: Date.now(), products: cartItems, payment: paymentId, subTotal: subtotal, Date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails }]

      setOrderDetails(order)
      const response = await Axios_instance.patch(`users/${user.id}`, { orders: order })
      navigate("/products")
      if (response.data) {
         await Axios_instance.patch(`users/${user.id}`, { cart: [] })
      }
   }

   const addBuyNowPayment = async (paymentId, subtotal, productId) => {

      const product = await Axios_instance.get(`products/${productId}`)
      const ProductData = { productId: product.data.id, productName: product.data.name, productPrice: product.data.price, productImage: product.data.image, productQuantity: 1 }
  
      const userResponse = await Axios_instance.get(`users/${user.id}`)
      const userResponseData = userResponse.data
      const order = [...userResponseData.orders, { id: Date.now(), products: [ProductData], payment: paymentId, subTotal: subtotal, Date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails }]
 
      setOrderDetails(order)
      const response = await Axios_instance.patch(`users/${user.id}`, { orders: order })
      navigate("/products")
   }

   return (<OrderContext.Provider value={{ addShippingAddress, shippingDetails, addCartPayment, orderDetails, addBuyNowPayment, totalAmount }}>
      {children}
   </OrderContext.Provider>)
}

