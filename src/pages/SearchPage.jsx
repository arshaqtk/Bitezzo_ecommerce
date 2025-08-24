
import React, { useEffect, useState } from 'react'
import Nav from '../components/user/NavBar/Nav'


import { useContext } from "react"
import Axios_instance from '../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { WishListContext } from '../context/WishlistContext'

import { AuthContext } from '../context/AuthContext'
import { SearchContext } from '../context/SearchContext'
import { SearchNotFound } from '../components/user/Animation/SearchNotFound'


function SearchPage() {

      const [allProducts, setAllProducts] = useState([]);
      const [product, setProduct] = useState([]);
      const [isWishlisted, setIsWishlisted] = useState(false);
      const navigate = useNavigate()
    
    
      const { user } = useContext(AuthContext)
      const { addToCart, cartQuantity, cartItems } = useContext(CartContext);
      const { addToWishlist, wishlistItems } = useContext(WishListContext);
      const { searchValue } = useContext(SearchContext);
    
    
      useEffect(() => {
        async function fetchData(searchValue) {
          try {
            const response = await Axios_instance.get('/products')
            const responseData = response.data
             const results = responseData.filter(item =>
               item.name.toLowerCase().includes(searchValue.toLowerCase())||
             item.category.toLowerCase().includes(searchValue.toLowerCase()));
           
            setAllProducts(responseData);
            setProduct(results);
          } catch (e) {
            console.log(e)
          }
        }
        fetchData(searchValue)
      }, [searchValue])
      
     
    
    
  return (
    <>
    <Nav/>
    <div className=" bg-[#FAF1E6]  mt-17 h-screen">
      <h2 className='font-semibold text-center text-2xl pt-7'>Showing {product.length}  Results For "{searchValue}"</h2>
      {product.length==0?<div className="flex justify-center items-center h-screen"><SearchNotFound/></div>:
        <div className='flex justify-center items-center bg-[#FAF1E6]  '>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6 w-[90vw] bg-[#FAF1E6]">
            {product.map((item, index) => (

              <div
                key={index}
                className=" rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"

              >
                {/* Image */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => navigate(`/productview/${item.id}`)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover message */}
                  <div className="absolute inset-0 bg-black/30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">
                      Click to view details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 relative bg-white/50">
                  {/* Heart / Wishlist Icon */}

                  <button
                    className="absolute top-2 right-2 p-1 rounded-full shadow-md hover:bg-red-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsWishlisted(!isWishlisted);
                      addToWishlist({
                        user_id: user.id,
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={
                        wishlistItems.some((wishlist) => wishlist.productId === item.id)
                          ? "red"
                          : "transparent"
                      }
                      stroke="red"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>

                  </button>

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-black truncate">{item.name}</h3>


                  <p className="text-black font-medium mt-2">₹{item.price}</p>


                  <div className="mt-4">
                    {cartItems.some((cart) => cart.productId == item.id) ? (
                      <button
                        className="w-full px-4 py-2 bg-[#e2d5bb] text-[#222831] rounded-lg text-sm font-medium hover:bg-[#eedfb9] transition cursor-pointer"
                        onClick={() => {
                          navigate("/cart")
                        }}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="w-full px-4 py-2 bg-[#FFD369] text-[#222831] rounded-lg text-sm font-medium hover:bg-[#e6be5c] transition cursor-pointer"
                        onClick={() =>
                          addToCart({
                            user_id: user.id,
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                      >
                        Add to Cart
                      </button>
                    )}


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

}
      </div>
    </>
    
  )
}

export default SearchPage