import Nav from '../components/NavBar/Nav'
import { useState, useMemo, useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

function CheckoutPage() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { subTotal, cartItems } = useContext(CartContext);
  const { shippingDetails, addShippingAddress } = useContext(OrderContext);
  const { products } = useContext(ProductContext);

  const { productId, price, fromBuyNow } = location.state || {};

  const [username, setName] = useState(user.username);
  const [phone, setPhone] = useState(shippingDetails.phone || "");
  const [address, setAddress] = useState(shippingDetails.address || "");
  const [city, setCity] = useState(shippingDetails.city || "");
  const [pincode, setPincode] = useState(shippingDetails.pincode || "");
  const [method, setMethod] = useState("regular");

  const productDetail = useMemo(
    () => products.find((item) => item.id == productId),
    [products, productId]
  );

  let finalTotal = fromBuyNow ? price : subTotal;
  const [totalAmount, setTotalAmount] = useState(finalTotal);

  const deliveryFee = useMemo(() => {
    if (method === "express") {
      setTotalAmount(Number(finalTotal) + 40);
      return 40;
    }
    if (method === "fastest") {
      setTotalAmount(Number(finalTotal) + 70);
      return 70;
    }
    setTotalAmount(Number(finalTotal) + 20);
    return 20;
  }, [method, finalTotal]);

  const shippingData = { name: username, address, city, pincode, phone };

  const handleSubmit = (e) => {
    e.preventDefault();
    addShippingAddress(shippingData, totalAmount, { fromBuyNow, productId });
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 p-4 mt-17">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
          
          {/* LEFT: Shipping Form */}
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-red-600">
              Food Delivery Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <textarea
                required
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              {/* City Dropdown */}
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select City</option>
                <option value="Kottakkal">Kottakkal</option>
                <option value="Perinthalmanna">Perinthalmanna</option>
                <option value="Vengara">Vengara</option>
                <option value="Chemmad">Chemmad</option>
                <option value="Valanjery">Valanjery</option>
                <option value="Malappuram">Malappuram</option>
              </select>

              {/* Pincode - Only 6 digits */}
              <input
                required
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // remove non-digits
                  if (val.length <= 6) setPincode(val);
                }}
                className="w-full border rounded-md p-2"
              />

              {/* Phone - Only 10 digits */}
              <input
                required
                type="text"
                placeholder="Mobile No"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // remove non-digits
                  if (val.length <= 10) setPhone(val);
                }}
                className="w-full border rounded-md p-2"
              />

              {/* Delivery Method */}
              <div className="space-y-4">
                <h3 className="font-semibold">Delivery Speed</h3>
                <select
                  required
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="regular">Regular (₹20) – 40-50 min</option>
                  <option value="express">Express (₹40) – 25-30 min</option>
                  <option value="fastest">Fastest (₹70) – 15-20 min</option>
                </select>
              </div>

              {/* Summary */}
              <div className="border-t pt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="text-md font-semibold">
                  Subtotal:{" "}
                  <span className="text-green-600">
                    ₹{finalTotal}+{deliveryFee}={totalAmount}
                  </span>
                </div>
                <button
                  className="w-full bg-black text-white p-2 rounded-md cursor-pointer"
                  type="submit"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Product Preview */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Your Order</h3>

            {fromBuyNow && productDetail ? (
              // If "Buy Now"
              <div className="border rounded-md p-4 flex gap-4 items-center">
                <img
                  src={productDetail.image || "/placeholder.png"}
                  alt={productDetail.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h4 className="font-semibold">{productDetail.name}</h4>
                  <p className="text-sm text-gray-600">Price: ₹{price}</p>
                </div>
              </div>
            ) : (
              // If from cart
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="border rounded-md p-4 flex gap-4 items-center"
                  >
                    <img
                      src={item.productImage || "/placeholder.png"}
                      alt={item.productName}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.productQuantity}
                      </p>
                      <p className="text-sm font-medium">
                        ₹{item.productPrice * item.productQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
