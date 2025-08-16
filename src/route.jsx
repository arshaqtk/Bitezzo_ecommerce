import Cartpage from "./components/Cart/Cart";
import ProductDetailView from "./components/Products/ProductDetailView";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import ProductPage from "./pages/Products/ProductPage";
import SignupPage from "./pages/Signup/SignupPage";




const routes = [
    // { path: "/", element: <Navigate to="/defaultId" replace /> },
    { path: "/", element: <HomePage /> },  
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/products", element: <ProductPage /> },
    { path: "/productview/:id", element: <ProductDetailView /> },
    { path: "/cart", element: <Cartpage/> }

]


export default routes