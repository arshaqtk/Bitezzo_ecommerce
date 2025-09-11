import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



import Cartpage from "./user/pages/CartPage";
import HomePage from "./user/pages/HomePage";
import LoginPage from "./user/pages/LoginPage";

import CheckoutPage from "./user/pages/CheckoutPage";
import ProductPage from "./user/pages/ProductPage";
import SignupPage from "./user/pages/SignupPage";
import WishlistPage from "./user/pages/WishlistPage";
import PaymentPage from "./user/pages/PaymentPage";
import SearchPage from "./user/pages/SearchPage";
import OrderPage from "./user/pages/OrderPage";
import ProfilePage from "./user/pages/ProfilePage";
import ProductDetailView from "./user/pages/ProductDetailviewPage";



import Dashboard from "./admin/Pages/DashBoard";
import UsersTable from "./admin/Pages/ManageUsers";
import ProductTable from "./admin/Pages/ManageProduct";
import EditProduct from "./admin/Pages/EditProduct";
import AddProduct from "./admin/Pages/AddProduct";


import { ProtectedRoute } from "./user/components/Routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"


import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./user/components/Routes/PublicRoutes";
import { SearchProvider } from "./context/SearchContext";
import { ProductProvider } from "./context/ProductContext";
import AdminInterface from "./admin/Layout/AdminInterFace";
import UsersDetailView from "./admin/Pages/UsersDetailView";
import UserLayout from "./user/components/Layout/UserLayout";
import AdminViewOrder from "./admin/Pages/AdminViewOrder";
import AdminOrderDetailView from "./admin/Pages/AdminOrderDetailView";
import AdminDashboard from "./admin/Pages/DashBoard";
import About from "./user/pages/About";
import ScrollToTop from "./user/components/ScrollToTop";
import { AdminProtectedRoute } from "./admin/component/AdminProtectedRoutes";


function App() {

  return (

    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop/>
      <AuthProvider>
        <ProductProvider>
          <SearchProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <Routes>


                    <Route element={<ProtectedRoute />}>
                    <Route element={<UserLayout />}>
                      <Route path="/cart" element={<Cartpage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      </Route>
                    </Route>

                    <Route element={<PublicRoute />}>
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route element={<UserLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/productview/:id" element={<ProductDetailView />} />
                    <Route path="/about" element={<About />} />

                    </Route>


                    <Route element={<AdminProtectedRoute><AdminInterface /></AdminProtectedRoute>}>
                    
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/users" element={<UsersTable />} />
                      <Route path="/admin/users-detailview/:id" element={<UsersDetailView />} />
                      <Route path="/admin/products" element={<ProductTable />} />
                      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
                      <Route path="/admin/add-product" element={<AddProduct />} />
                      <Route path="/admin/orders" element={<AdminViewOrder />} />
                      <Route path="/admin/order-detailview/:id" element={<AdminOrderDetailView />} />
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
