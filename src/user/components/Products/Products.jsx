import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { WishListContext } from '../../../context/WishlistContext';
import { AuthContext } from '../../../context/AuthContext';
import { ProductContext } from '../../../context/ProductContext';
import { SearchContext } from '../../../context/SearchContext';

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    setAllProducts(products);
    setProduct(products);
  }, [products]);

  function filterProduct(category) {
    if (category === "all") {
      setProduct(allProducts);
    } else {
      const filtered = allProducts.filter((item) => item.category === category);
      setProduct(filtered);
    }
  }

  // Placeholder for generating a random review count and star rating
  const getRandomReviewData = () => {
    const rating = (Math.random() * (5 - 3) + 3).toFixed(1); // Random rating between 3.0 and 5.0
    const count = Math.floor(Math.random() * 200) + 10; // Random count between 10 and 200
    return { rating, count };
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 mt-10">
      {/* Category Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          className="w-full max-w-sm px-4 py-3 bg-white border border-gray-300 rounded-full shadow-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
          onChange={(e) => filterProduct(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="drinks">Drinks & Beverages</option>
          <option value="fastFood">Fast Food</option>
          <option value="gravy">Gravy & Curry Dishes</option>
          <option value="snacks">Snacks & Sides</option>
          <option value="desserts">Desserts & Sweets</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className='flex justify-center'>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-8 px-4 md:px-8 max-w-screen-xl w-full">
          {product.map((item, index) => {
            const { rating, count } = getRandomReviewData(); // Get random review data for each item
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Image Section */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/productview/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">View Product</span>
                    <span className="text-gray-300 text-sm mt-1">Click for more details</span>
                  </div>
                  {/* Wishlist Icon */}
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-600 transition-colors duration-200 hover:bg-red-500 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist({
                        user_id: user.id,
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={wishlistItems.some((wishlist) => wishlist.productId === item.id) ? "red" : "none"}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-2xl font-extrabold text-gray-900 mt-1">₹{item.price}</p>
                  
                  {/* Review Section */}
                  <div className="flex items-center mt-2 mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">({count} reviews)</span>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-auto"> {/* Use mt-auto to push button to bottom */}
                    {cartItems.some((cart) => cart.productId === item.id) ? (
                      <button
                        className="w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                      >
                        In Basket
                      </button>
                    ) : (
                      <button
                        className="w-full py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            user_id: user.id,
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          });
                        }}
                      >
                        Add to Basket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;