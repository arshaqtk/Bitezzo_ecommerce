import { BrowserRouter  as   Router, Routes,Route } from "react-router-dom"
import routes from "./route"
import { AuthProvider } from "./context/AuthContext"
function App() {

  return (
    
    <Router>
      <AuthProvider>
    <Routes>
    {routes.map((route,index)=>(<Route key={index} path={route.path} element={route.element}/>))}
    </Routes>
    </AuthProvider>
    </Router>
    
  )
}

export default App
