
import Nav from '../components/user/NavBar/Nav'

import  { useState, useMemo, useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";
import Axios_instance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

function CheckoutPage() {

    
  const { user } = useContext(AuthContext)
  const {subTotal}=useContext(CartContext);
  const {shippingDetails,moveToPaymentPage,addShippingAddress}=useContext(OrderContext)
  const location = useLocation();
  const navigate=useNavigate()

  
  const [username, setName] = useState(user.username);
  const [phone,setPhone]=useState(shippingDetails.phone||"")
  const [address, setAddress] = useState(shippingDetails.address||"");
  const [city, setCity] = useState(shippingDetails.city||"");
  const [pincode, setPincode] = useState(shippingDetails.pincode||"");
  const [method, setMethod] = useState("regular");

  const { productId,price,fromBuyNow } = location.state || {};

 let finalTotal = subTotal;
 if (location.state?.fromBuyNow) {
    finalTotal = location.state.price;
  }
  const [totalAmount,setTotalAmount]=useState(finalTotal)


  const [cartProductsId,setCartProductsId]=useState([])

  
  const deliveryFee = useMemo(() => {

    if (method === "express") {
      setTotalAmount(finalTotal+40)
      return 40;}
      
      if (method === "fastest")  {
        setTotalAmount(finalTotal+70)
        return 70;}

        setTotalAmount(finalTotal+20)
        return 20; 

      }, [method]);
      
      

      useEffect(()=>{
        const fetchProduct=async()=>{
          try{ const {data}=await Axios_instance(`/users?_id=${user.id}`)
          
          const products=data.map((users)=>users.cart.map((item)=>{return {productId:item.productId,totalPrice:item.productPrice*item.productQuantity}}) )
          
          setCartProductsId(products)}catch (error) {
         console.error(error);
      }
         
        }
        fetchProduct()
      },[method])
      
      const shippingData={name:username,
        address:address,
        city:city,
        pincode:pincode,
        phone:phone}


const handleSubmit=(e)=>{
  alert("button clicked")
  e.preventDefault();
  addShippingAddress(shippingData,totalAmount,{ fromBuyNow,productId })
}

  return (
    <>
    <Nav/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6  mt-17">
      <div className="bg-white w-full max-w-lg rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">Food Delivery Details</h2>

        <form action="" onSubmit={handleSubmit}>
        <div className="space-y-6">
            
          <input
          required
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <textarea
           required
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
           required
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
           required
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
           required
            type="text"
            placeholder="Mobile No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Delivery Method */}
        <div className="space-y-4">
          <h3 className="font-semibold">Delivery Speed</h3>
          <select
           required
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="regular">Regular (₹20) – 40-50 min</option>
            <option value="express">Express (₹40) – 25-30 min</option>
            <option value="fastest">Fastest (₹70) – 15-20 min</option>
          </select>
        </div>

        {/* Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="text-lg font-semibold">
                                    Subtotal: <span className="text-green-600">₹{finalTotal}+{deliveryFee}={totalAmount}</span>
                                </div>
          <button className="w-full bg-orange-600 text-white p-2 rounded-md" type="submit">
            Proceed to Checkout
          </button>
        </div>
        </form>
      </div>
    </div>
 

    </>
  )
}

export default CheckoutPage