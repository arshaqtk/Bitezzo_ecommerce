import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../api/axiosConfig';
import { AuthContext } from './AuthContext';

export const OrderContext = createContext()
export  const OrderProvider=({ children })=> {
   const navigate = useNavigate();
   const { user } = useContext(AuthContext)



   const PlaceOrder=({name,address,city,pincode,deliveryFee})=>{
    useEffect(()=>{
        
        const orderData ={shippingAddress:{name:name,address:address,city:city,pincode,pincode}}
        const {data}=Axios_instance.post('/orders',orderData)

    },[])
   }

   return (<OrderContext.Provider value={{ PlaceOrder }}>
       {children}
     </OrderContext.Provider>)
}

