import { BrowserRouter, Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import POSPage from "./pages/POSPage";
import Products from "./pages/Products"
import ProductsCategories from "./pages/ProductsCategories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/categories' element={<ProductsCategories/>}/>
        <Route path='/pos' element={<POSPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
