import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/SignUp/Signup"
import WomenProductList from "./pages/ProductList/WomenProductList"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import { FilterProvider } from "./context/FilterContext"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import { Toaster } from "react-hot-toast"
import ManProductList from "./pages/ProductList/ManProductList"
import CartPage from "./pages/CartPage/CartPage"
import Checkout from "./pages/CheckOut/Checkout"
import Profile from "./pages/Profile/Profile"
import ConfirmedOrder from "./pages/ConfirmedOrder"
import EmptyCart from "./pages/EmptyCart"
import ErrorPage from "./pages/ErrorPage"
import WishList from "./pages/Profile/RoutesPages/WishList"
import ContactDetails from "./pages/Profile/RoutesPages/ContactDetails"
import MyOrder from "./pages/Profile/RoutesPages/MyOrder"
import VerifyEmail from "./pages/VerifyEmail"



function App() {
  
  const [user, setuser] = useState();
 

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setuser(user)
    })
    
  }, []);
  console.log(user)

  return (
    <>
      <FilterProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signup/email-verification" element={<VerifyEmail/>}/>
            <Route path="/user-profile/check-email" element={<VerifyEmail/>}/>
            <Route path="/shop/women" element={<WomenProductList/>}/>
            <Route path="/shop/men" element={<ManProductList/>}/>
            <Route path="/shop/women/:id" element={<ProductDetails/>}/>
            <Route path="/shop/men/:id" element={<ProductDetails/>}/>
            <Route path="/shop/cart" element={ user ? <CartPage/> : <Navigate to='/login'/>}/>
            <Route path="/shop/cart/empty" element={<EmptyCart/>}/>
            <Route path="/shop/404" element={<ErrorPage/>}/>
            <Route path="/shop/cart/checkout" element={<Checkout/>}/>
            <Route  path="/user-profile" element={ user ? <Profile/> : <Navigate to='/login' /> }>
                <Route index element={<Navigate to="contact-info" />} />
                <Route path="contact-info" element={<ContactDetails/>}/>
                <Route path="wish-list" element={<WishList/>}/>
                <Route path="orders" element={<MyOrder/>}/>
            </Route>
            <Route path="/shop/cart/checkout/order-confirmed" element={<ConfirmedOrder/>}/>
          </Routes>
      </FilterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        
    </>
  )
}

export default App
