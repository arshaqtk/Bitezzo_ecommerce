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
   const [userData, setUserData] = useState([])

   const navigate = useNavigate();
   const { user } = useContext(AuthContext)
   const { cartItems, subTotal } = useContext(CartContext);



   const fetchData = async () => {
 
      const userResponse = await Axios_instance.get(`users/${user.id}`)
      const userResponseData = userResponse.data
      setShippingDetails(userResponseData.shippingAddress)
      setUserData(userResponseData)
      setOrderDetails(userResponseData.orders)
     
   }


   useEffect(() => {
      fetchData()
   }, [])




   const addShippingAddress = async (shippingData, TotalAmount) => {
      setTotalAmount(TotalAmount)
      setShippingDetails(shippingData)
      await Axios_instance.patch(`users/${user.id}`, { shippingAddress: shippingData })
      navigate("/payment")
   }

   const addPayment = async (paymentId, subtotal) => {
      const order = [...userData.orders, {id: Date.now(),products: cartItems, payment: paymentId, subTotal: subtotal,Date:new Date().toISOString().split("T")[0] }]
      console.log(order)
      setOrderDetails(order)
      const response=await Axios_instance.patch(`users/${user.id}`, { orders: order })
      navigate("/products")
      if(response.data){
          await Axios_instance.patch(`users/${user.id}`, { cart: [] })
      }
   }

   return (<OrderContext.Provider value={{ addShippingAddress, shippingDetails, addPayment,orderDetails }}>
      {children}
   </OrderContext.Provider>)
}

