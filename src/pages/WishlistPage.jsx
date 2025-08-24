import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from '../components/user/NavBar/Nav'

import { WishListContext } from "../context/WishlistContext";

function WishlistPage() {

  const navigate = useNavigate();

   const {removeWishlist,wishlistItems}=useContext(WishListContext);




  return (<>
  <Nav/>
    <div className="min-h-screen bg-gray-100 p-6  mt-17">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p>Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-xl shadow-md overflow-hidden relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => navigate(`/productview/${item.productId}`)}
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Remove from wishlist */}
                <button
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-md hover:bg-red-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWishlist(item.productId);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={0}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 relative">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.productName}
                </h3>
                <p className="text-[#FFD369] font-medium mt-2">₹{item.productPrice}</p>

                <button
                  className="w-full mt-4 px-4 py-2 bg-[#FFD369] text-[#222831] rounded-lg font-medium hover:bg-[#e6be5c] transition"
                  onClick={() => navigate(`/productview/${item.productId}`)}
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  );
}

export default WishlistPage;