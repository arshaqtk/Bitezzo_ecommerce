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
   const { cartItems, subTotal,fetchCartData } = useContext(CartContext);



   const fetchOrderData = async () => {
      try {
         const userResponse = await Axios_instance.get(`users/${user.id}`)
         const userResponseData = userResponse.data
         setShippingDetails(userResponseData.shippingAddress)
         setOrderDetails(userResponseData.orders)
      } catch (error) {
         console.error(error);
      }


   }


   useEffect(() => {
      fetchOrderData()
   }, [])




   const addShippingAddress = async (shippingData, TotalAmount, { fromBuyNow, productId }) => {
      try {
         setTotalAmount(TotalAmount)
         setShippingDetails(shippingData)
         await Axios_instance.patch(`users/${user.id}`, { shippingAddress: shippingData })
         if (fromBuyNow) {
            navigate("/payment", { state: { fromBuyNow, productId } })
         } else {
            navigate
               ("/payment")
         }
      } catch (error) {
         console.error( error);
      }


   }

   const addCartPayment = async (paymentId, subtotal) => {
      try {
         const userResponse = await Axios_instance.get(`users/${user.id}`)
         const userResponseData = userResponse.data
         const order = [...userResponseData.orders, { id: Date.now(), products: cartItems, status:"pending",payment: paymentId, subTotal: subtotal, Date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails }]

         setOrderDetails(order)
         const response = await Axios_instance.patch(`users/${user.id}`, { orders: order })
         navigate("/products")
         if (response.data) {
            await Axios_instance.patch(`users/${user.id}`, { cart: [] })
            fetchCartData()
         }
      } catch (error) {
         console.error( error);
      }



   }

   const addBuyNowPayment = async (paymentId, subtotal, productId) => {

      try {
         const product = await Axios_instance.get(`products/${productId}`)
         const ProductData = { productId: product.data.id, productName: product.data.name, productPrice: product.data.price, productImage: product.data.image, productQuantity: 1 }

         const userResponse = await Axios_instance.get(`users/${user.id}`)
         const userResponseData = userResponse.data
         const order = [...userResponseData.orders, { id: Date.now(), products: [ProductData], status:"pending",payment: paymentId, subTotal: subtotal, Date: new Date().toISOString().split("T")[0], shippingAddress: shippingDetails }]

         setOrderDetails(order)
         const response = await Axios_instance.patch(`users/${user.id}`, { orders: order })
         navigate("/products")
      } catch (error) {
         console.error( error);
      }

   }

   

   return (<OrderContext.Provider value={{ addShippingAddress, shippingDetails, addCartPayment, orderDetails, addBuyNowPayment, totalAmount,fetchOrderData}}>
      {children}
   </OrderContext.Provider>)
}

