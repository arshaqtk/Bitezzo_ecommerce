import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../components/NavBar/Nav'
import { WishListContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

function WishlistPage() {
  const navigate = useNavigate();
  const { removeWishlist, wishlistItems } = useContext(WishListContext);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-10 mt-10">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-500">
            <p className="text-xl font-medium">Your wishlist is currently empty.</p>
            <p className="text-gray-400 mt-2">Start adding products you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
            {wishlistItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Image Section */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/productview/${item.productId}`)}
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">
                      View Product
                    </span>
                    <span className="text-gray-300 text-sm mt-1">
                      Click for more details
                    </span>
                  </div>
                  
                  {/* Remove from wishlist button */}
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-600 transition-colors duration-200 hover:bg-red-500 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWishlist(item.productId);
                      toast.success("Product removed from wishlist");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {item.productName}
                  </h3>
                  <p className="text-2xl font-extrabold text-gray-900 mt-1">
                    ₹{item.productPrice}
                  </p>

                  <button
                    className="w-full mt-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
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