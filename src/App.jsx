import { BrowserRouter  as   Router, Routes,Route } from "react-router-dom"
import routes from "./route"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"
import { Toaster } from "react-hot-toast";
function App() {

  return (
    
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
    <Routes>
    {routes.map((route,index)=>(<Route key={index} path={route.path} element={route.element}/>))}
    </Routes>
    </OrderProvider>
    </WishlistProvider>
    </CartProvider>
    </AuthProvider>
    
    </Router>
    
    
  )
}

export default App
