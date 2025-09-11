import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios_instance from "../../api/axiosConfig";


function UsersDetailView() {

const [user,setUser]=useState([]) 
    const {id}=useParams()
    useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response=await Axios_instance.get(`/users?id=${id}`)
        const userData=response.data
          setUser(userData)
          console.log(userData)
        }catch(e){
            console.log(e)
        }
    }
    fetchData()
    },[])
return (
  <div className="p-6 bg-white min-h-screen">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">User Details & Orders</h2>

    {user.map((users) => (
      <div key={users.id} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: User Details & Cart */}
        <div>
          {/* User Information */}
          <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">User Information</h3>
            <div className="space-y-6">
              {[
                { label: 'Name', value: users.username },
                { label: 'Email', value: users.email },
                { label: 'Phone', value: users.shippingAddress.phone },
                { label: 'Address', value: users.shippingAddress.address },
                { label: 'City', value: users.shippingAddress.city },
                { label: 'Pincode', value: users.shippingAddress.pincode },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-lg font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cart</h3>
            {users.cart.map((carts) => (
              <div
                key={carts.productId}
                className="bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-5 mb-5 hover:shadow-md transition"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={carts.productImage}
                    alt={carts.productName}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{carts.productName}</h4>
                    <p className="text-gray-700 text-base mt-1">₹{carts.productPrice}</p>
                  </div>
                  <div className="text-base text-gray-800 font-medium">
                    Qty: <span>{carts.productQuantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Orders */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h3>
          {users.orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-8 mb-6 hover:shadow-md transition"
            >
              <div className="rounded-xl p-5">
                <p className="text-gray-900 font-medium text-lg">Order ID: {order.id}</p>
                <p className="text-gray-500 text-sm mt-1">{order.Date}</p>
                <p className="text-sm mt-2 text-gray-700">
                  Status:{" "}
                  {order.status === "Canceled" ? (
                    <span className="text-red-600 font-semibold">{order.status}</span>
                  ) : (
                    <span className="text-green-600 font-semibold">{order.status}</span>
                  )}
                </p>
                <p className="text-gray-900 text-base mt-2">Total: ₹{order.subTotal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);



}

export default UsersDetailView;
