import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Heart,
  Star,
  Clock,
  Truck,
  Shield,
  CreditCard,
  Tag,
  Gift,
  ShoppingCart,
  AlertCircle
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Cartpage() {
  const { removeItem, updateQuantity, cartItems, cartItemCount, subTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const deliveryFee = subTotal > 500 ? 0 : 20;
  const tax = Math.round(subTotal * 0.05); // 5% tax
  const total = subTotal + deliveryFee + tax - discount;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // const handlePromoCode = () => {
  //   if (promoCode.toLowerCase() === 'save10') {
  //     setDiscount(Math.round(subTotal * 0.1));
  //   } else if (promoCode.toLowerCase() === 'welcome') {
  //     setDiscount(50);
  //   } else {
  //     setDiscount(0);
  //   }
  // };

  const getItemQuantity = (productId) => {
    return cartItemCount.find((cartItem) => cartItem.id === productId)?.count ?? 1;
  };

  const getItemTotal = (item) => {
    const quantity = getItemQuantity(item.productId);
    return item.productPrice * quantity;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md" data-aos="fade-up">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you haven't added any delicious items to your cart yet. 
            Start exploring our amazing menu!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 mt-5 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.productId}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-orange-100 text-orange-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                            {item.productName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>4.5</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>25-30 min</span>
                            </div>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{item.productPrice}
                            <span className="text-sm font-normal text-gray-600 ml-2">per item</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.productId, "decrease")}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">
                              {getItemQuantity(item.productId)}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, "increase")}
                              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-white rounded-lg transition-all duration-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-lg font-bold text-orange-600">
                            ₹{getItemTotal(item)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200 group/remove"
                        >
                          <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform duration-200" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="sticky top-8 space-y-6">
              
              {/* Promo Code */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-600" />
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                  />
                  <button
                    onClick={handlePromoCode}
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 font-semibold"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm">Discount applied! You saved ₹{discount}</span>
                  </div>
                )}
              </div> */}

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subTotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Delivery Fee
                    </span>
                    <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                {deliveryFee === 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Free delivery on orders above ₹500!</span>
                  </div>
                )}

                <button
                  onClick={() =>navigate("/checkout", { state: { subTotal: total,deliveryCharge:deliveryFee } })}
                  className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              {/* Security & Features */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Secure checkout guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Multiple payment options</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <span>Fast & reliable delivery</span>
                  </div>
                </div>
              </div> */}

              {/* Suggested Items */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">You might also like</h3>
                <div className="space-y-3">
                  {[
                    { name: "Garlic Bread", price: 89, image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=100&h=100&fit=crop" },
                    { name: "Coke (350ml)", price: 45, image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=100&h=100&fit=crop" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">₹{item.price}</p>
                      </div>
                      <button className="text-orange-600 hover:bg-orange-50 p-1 rounded-lg transition-colors duration-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;