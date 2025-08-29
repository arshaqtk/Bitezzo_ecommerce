import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Axios_instance from "../../api/axiosConfig";
import toast from "react-hot-toast";

function ProductDetailView() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const { data } = await Axios_instance.get(`/products?id=${id}`);
      console.log(data);

      const filteredData = data.map(({ id, name, price, image, category, description, quantity }) => ({ id, name, price, image, description, category, quantity }));
      setProduct(filteredData);
    }
    fetchData();
  }, [id]);

  if (product.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-20 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">No Product Found</h2>
      </div>
    );
  }
  



  // Placeholder for review data
  const rating = 4.5;
  const reviewCount = 124;

  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <svg key={`filled-${i}`} className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
          <linearGradient id="half-gradient" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="rgb(234, 179, 8)" />
            <stop offset="50%" stopColor="rgb(209, 213, 219)" />
          </linearGradient>
          <path fill="url(#half-gradient)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.871 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 flex items-center">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {product.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 p-6 lg:p-10"
          >
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[600px] rounded-2xl shadow-lg object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 text-gray-800 flex flex-col justify-center py-4">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center mt-2 mb-4">
                <div className="flex">{renderStars()}</div>
                <span className="text-gray-600 text-sm ml-2">
                  ({reviewCount} reviews)
                </span>
              </div>

              <p className="mt-3 text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="mt-4 text-4xl font-extrabold text-gray-900">
                ₹{product.price}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Category:{" "}
                <span className="font-medium text-gray-900">{product.category}</span>
              </p>
              <p className="font-semibold text-red-600">
                {product.quantity === 0 ? "Product is out of stock" : ""}
              </p>
              <p className="font-semibold text-red-600">
                {product.quantity < 5 && product.quantity > 0 ? `Only ${product.quantity} Left` : ""}
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {cartItems.some((cart) => cart.productId == product.id) ? (
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      if (product.quantity === 0) {
                        toast.error("Product is out of stock");
                        return;
                      }
                      addToCart({
                        user_id: user.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition-colors"
                  onClick={() => {
                    if (product.quantity === 0) {
                      toast.error("Product is out of stock");
                      return;
                    }
                    navigate("/checkout", {
                      state: {
                        fromBuyNow: true,
                        user_id: user.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailView;