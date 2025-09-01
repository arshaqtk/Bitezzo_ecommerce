import React, { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../../api/axiosConfig';
import Footer from '../components/Footer/Footer';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { WishListContext } from '../../context/WishlistContext';

function HomePage() {
  const navigate = useNavigate();
  const [topProducts, setTopProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishListContext);

  // ✅ Fetch Top Selling Products
  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const { data } = await Axios_instance.get("/TopSellingProducts");
        const sorted = data.sort((a, b) => b.count - a.count).slice(0, 4);
        setTopProducts(sorted);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <>
      <Banner/>
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-20">
  <h1 className="text-5xl font-extrabold mb-4">Delicious Meals, Anytime 🍽️</h1>
  <p className="text-lg mb-6 max-w-xl mx-auto">
    Explore our top-selling dishes and satisfy your cravings with the best food in town.
  </p>
  <button
    onClick={() => navigate("/products")}
    className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
  >
    Order Now
  </button>
</section>



      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-white shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Delivery</h3>
            <p>Get your meals delivered hot and fresh within minutes.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">🥗 Fresh Ingredients</h3>
            <p>We only use high-quality, fresh, and healthy ingredients.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">⭐ Customer Love</h3>
            <p>Loved by thousands of happy customers every single day.</p>
          </div>
        </div>
      </section>

      {/* Top Selling Section (your code kept as-is) */}
      <div className="bg-gray-100 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Top Selling Dishes
        </h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 max-w-screen-xl w-full">
            {topProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                {/* Image Section */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/productview/${item.productId}`)}
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
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={wishlistItems.some((wishlist) => wishlist.productId === item.productId) ? "red" : "none"}
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-2xl font-extrabold text-gray-900 mt-1">₹{item.price}</p>

                  {/* Action Button */}
                  <div className="mt-4">
                    <button
                      className="w-full py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          user_id: user.id,
                          productId: item.productId,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        });
                      }}
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          We’re passionate about serving delicious food with the freshest ingredients.
          Our mission is to bring joy to your dining experience, one meal at a time.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomePage;
