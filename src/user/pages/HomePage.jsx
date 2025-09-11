import React, { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import Axios_instance from '../../api/axiosConfig';
import Footer from '../components/Footer/Footer';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { WishListContext } from '../../context/WishlistContext';
import { Truck, Leaf, Star } from "lucide-react";


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
  <h1 className="text-5xl font-extrabold mb-4">Delicious Meals, Anytime</h1>
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
      <section className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {/* Card 1 */}
        <div className="p-8 bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Fast Delivery
          </h3>
          <p className="text-gray-600">
            Get your meals delivered hot and fresh within minutes.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Fresh Ingredients
          </h3>
          <p className="text-gray-600">
            We only use high-quality, fresh, and healthy ingredients.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-yellow-100 rounded-full">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Customer Love
          </h3>
          <p className="text-gray-600">
            Loved by thousands of happy customers every single day.
          </p>
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
                  className="relative overflow-hidden cursor-pointer "
                  onClick={() => navigate(`/productview/${item.productId}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100  h-50 object-cover transition-transform duration-500 group-hover:scale-110 rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">View Product</span>
                    <span className="text-gray-300 text-sm mt-1">Click for more details</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="py-5">
                  <h3 className="text-xl text-center font-bold text-gray-800 truncate">{item.name}</h3>
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      
      
    </>
  );
}

export default HomePage;
