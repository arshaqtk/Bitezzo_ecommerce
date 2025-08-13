import ProductDetailView from "./components/Products/ProductDetailView";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";




const routes = [
    // { path: "/", element: <Navigate to="/defaultId" replace /> },
    { path: "/", element: <HomePage /> },  
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/productview/:id", element: <ProductDetailView /> }

]


export default routes