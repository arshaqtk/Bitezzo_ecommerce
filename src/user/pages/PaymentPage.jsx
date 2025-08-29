import React, { useContext } from 'react'
import { OrderContext } from '../../context/OrderContext'
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

function PaymentPage() {

const {shippingDetails,addCartPayment,addBuyNowPayment}=useContext(OrderContext)
  const { user } = useContext(AuthContext)
 const {totalAmount}=useContext(OrderContext)
  console.log(shippingDetails)
    const location = useLocation();
  


    const { productId,fromBuyNow } = location.state || {};

  const openRazorpay = () => {
    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M", // Dummy Test Key
      amount: totalAmount*100, // = 500.00 INR
      currency: "INR",
      name: "Bitezzo",
      description: "Paying....",
      image: "https://yourlogo.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        if(fromBuyNow){
          addBuyNowPayment(response.razorpay_payment_id,totalAmount,productId)
        }else{
           addCartPayment(response.razorpay_payment_id,totalAmount)
        }
       
        // here you would call json-server and update order
        // fetch("http://localhost:3000/orders", {method:"POST", body: JSON.stringify({...})})
      },
      prefill: {
        name: "Arshaq Tk",
        email: "arshaq@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return (

     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          Pay Now
        </h2>

        {/* Product Summary */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <div className=" justify-between items-center mb-2">
            <div className='flex justify-center'>
            <span className="text-gray-600 text-center font-bold">Shipping Address:</span>
            </div>
            <p className='mt-2'><b>Name</b>:{shippingDetails.name}</p>
            <p className='mt-2'><b>Address</b>:{shippingDetails.address}</p>
            <p className='mt-2'><b>Phone</b>:{shippingDetails.phone}</p>
            <p className='mt-2'><b>City</b>:{shippingDetails.city}</p>
            <p className='mt-2'><b>Pin</b>:{shippingDetails.pincode}</p>

           
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-bold">Amount:</span>
            <span className="font-semibold text-green-600">{totalAmount}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={openRazorpay}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-red-700 transition"
        >
          Pay Now
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          🔒 Secure Payment Powered by Razorpay (Demo)
        </p>
      </div>
    </div>
  )
}

export default PaymentPage