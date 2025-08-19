
import Nav from '../../components/NavBar/Nav'
import  { useState, useMemo, useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";
import Axios_instance from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';

function OrderPage() {

    


  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [method, setMethod] = useState("regular");

  const [cartProductsId,setCartProductsId]=useState([])
     const { user } = useContext(AuthContext)

  const {PlaceOrder}=useContext(OrderContext)

  const deliveryFee = useMemo(() => {
    if (method === "express") return 40;
    if (method === "fastest") return 70;
    console.log("first")
    return 20; 
  }, [method]);

  useEffect(()=>{
      const fetchProduct=async()=>{
    const {data}=await Axios_instance(`/users?_id=${user.id}`)
 
    const products=data.map((users)=>users.cart.map((item)=>{return {productId:item.productId,totalPrice:item.productPrice*item.productQuantity}}) )
    
    setCartProductsId(products)
   }
   fetchProduct()
  },[method])


  return (
    <>
    <Nav/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">Food Delivery Details</h2>

        <form action="" onSubmit={()=>PlaceOrder({name,address,city,pincode,deliveryFee})}>
        <div className="space-y-6">
            
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <textarea
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Delivery Method */}
        <div className="space-y-4">
          <h3 className="font-semibold">Delivery Speed</h3>
          <select
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

export default OrderPage