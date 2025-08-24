import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



import Cartpage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
import WishlistPage from "./pages/WishlistPage";
import PaymentPage from "./pages/PaymentPage";
import SearchPage from "./pages/SearchPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailView from "./pages/ProductDetailviewPage";



import Dashboard from "./admin/Pages/DashBoard";
import UsersTable from "./admin/Pages/ManageUsers";
import ProductTable from "./admin/Pages/ManageProduct";
import EditProduct from "./admin/Pages/EditProduct";
import AddProduct from "./admin/Pages/AddProduct";


import { ProtectedRoute } from "./components/Routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"


import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./components/Routes/PublicRoutes";
import { SearchProvider } from "./context/SearchContext";
import { ProductProvider } from "./context/ProductContext";
import AdminInterface from "./admin/Layout/AdminInterFace";
import UsersDetailView from "./admin/Pages/UsersDetailView";


function App() {

  return (

    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <ProductProvider>
          <SearchProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <Routes>


                    <Route element={<ProtectedRoute />}>
                      <Route path="/cart" element={<Cartpage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    <Route element={<PublicRoute />}>
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/productview/:id" element={<ProductDetailView />} />



                    <Route path="/admin" element={<AdminInterface />}>
                      <Route path="/admin/dashboard" element={<Dashboard />} />
                      <Route path="/admin/users" element={<UsersTable />} />
                      <Route path="/admin/users-detailview/:id" element={<UsersDetailView />} />
                      <Route path="/admin/products" element={<ProductTable />} />
                      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                      <Route path="/admin/add-product" element={<AddProduct />} />
                    </Route>

                  </Routes>
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </SearchProvider>
        </ProductProvider>
      </AuthProvider>

    </Router>


  )
}

export default App
