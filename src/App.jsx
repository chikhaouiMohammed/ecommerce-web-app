import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import WomenProductList from "./pages/ProductList/WomenProductList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { FilterProvider } from "./context/FilterContext";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Toaster } from "react-hot-toast";
import ManProductList from "./pages/ProductList/ManProductList";
import CartPage from "./pages/CartPage/CartPage";
import Checkout from "./pages/CheckOut/Checkout";
import Profile from "./pages/Profile/Profile";
import ConfirmedOrder from "./pages/ConfirmedOrder";
import EmptyCart from "./pages/EmptyCart";
import ErrorPage from "./pages/ErrorPage";
import WishList from "./pages/Profile/RoutesPages/WishList";
import ContactDetails from "./pages/Profile/RoutesPages/ContactDetails";
import MyOrder from "./pages/Profile/RoutesPages/MyOrder";
import VerifyEmail from "./pages/VerifyEmail";
import { BeatLoader } from "react-spinners";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false); // Set loading to false after checking authentication
      });
    };

    checkAuth(); // Call the authentication check

    // No cleanup needed for unsubscribe
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[35rem]">
              <BeatLoader color="#3498db" />
            </div>; // Optionally show a loading indicator
  }

  return (
    <>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/email-verification" element={<VerifyEmail />} />
          <Route path="/user-profile/check-email" element={<VerifyEmail />} />
          <Route path="/shop/women" element={<WomenProductList />} />
          <Route path="/shop/men" element={<ManProductList />} />
          <Route path="/shop/women/:id" element={<ProductDetails />} />
          <Route path="/shop/men/:id" element={<ProductDetails />} />
          <Route path="/shop/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/shop/cart/empty" element={<EmptyCart />} />
          <Route path="/shop/404" element={<ErrorPage />} />
          <Route path="/shop/cart/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/shop/cart/checkout/order-confirmed" element={<ConfirmedOrder />} />
          <Route path="/user-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<Navigate to="contact-info" />} />
            <Route path="contact-info" element={<ContactDetails />} />
            <Route path="wish-list" element={<WishList />} />
            <Route path="orders" element={<MyOrder />} />
          </Route>
        </Routes>
      </FilterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
