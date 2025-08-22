import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import ProductDetailView from "./components/Products/ProductDetailView";
import Cartpage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
import WishlistPage from "./pages/WishlistPage";
import PaymentPage from "./pages/PaymentPage";
import SearchPage from "./pages/SearchPage";


import { ProtectedRoute } from "./components/Routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"


import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./components/Routes/PublicRoutes";
import { SearchProvider } from "./context/SearchContext";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  return (

    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <Routes>


                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cartpage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment" element={<PaymentPage/>}/>
                  <Route path="/order" element={<OrderPage/>}/>
                  <Route path="/search" element={<SearchPage/>}/>
                  <Route path="/profile" element={<ProfilePage/>}/>
                </Route>

                <Route element={<PublicRoute />}>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/productview/:id" element={<ProductDetailView />} />


              </Routes>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
        </SearchProvider>
      </AuthProvider>

    </Router>


  )
}

export default App
