import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProductDetailView from "./components/Products/ProductDetailView";
import Cartpage from "./pages/CartPage/CartPage";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Login/LoginPage";

import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProductPage from "./pages/Products/ProductPage";
import SignupPage from "./pages/Signup/SignupPage";
import WishlistPage from "./pages/WishListPage/WishlistPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

import { ProtectedRoute } from "./components/Routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"


import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./components/Routes/PublicRoutes";
import OrderPage from "./pages/OrderPage/OrderPage";
import { SearchProvider } from "./context/SearchContext";
import SearchPage from "./pages/SearchPage/SearchPage";

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
