import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase"; // Adjust the path as needed
import Header from "../../components/Header/Header";
import ProductTable from "../../components/ProductTable/ProductTable";
import Footer from "../../components/Footer/Footer";
import { doc, onSnapshot } from "firebase/firestore"; // Import onSnapshot for real-time updates

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [discount, setDiscount] = useState(0); // State for discount code
  const [subtotal, setSubtotal] = useState(0); // State for subtotal

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
    };

    checkAuth(); // Call the authentication check
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      // Listen for real-time updates to the cart document
      const docRef = doc(db, "cart", `${user.uid}`);
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const cartData = docSnap.data();
          setCartItems(cartData.products); // Fetch cart items
          calculateSubtotal(cartData.products); // Set the fetched total price
        }
      }, (error) => {
        console.error("Error fetching cart data:", error);
      });
    }

    // Clean up listener when component is unmounted
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Function to calculate subtotal
  const calculateSubtotal = (items) => {
    const subtotalValue = items.reduce((total, item) => total + item.price * item.quantity, 0);
    setSubtotal(subtotalValue);
  };

  // Function to update cart items and recalculate subtotal
  const updateCartItem = (updatedItems) => {
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect if not authenticated
  }

  const shippingCost = 5.00; // Fixed shipping cost
  const grandTotal = parseFloat(subtotal) + shippingCost - discount; // Calculate grand total

  return (
    <div className="font-open">
      {/* Nav Bar */}
      <Header />
      {/* Cart Page Content */}
      <div className="bg-white container mx-auto px-5 py-8 mt-24">
        {/* Heading Content */}
        <div className="flex flex-col justify-center items-start gap-5">
          <div className="font-semibold text-mediumGrey text-base md:text-lg flex justify-center items-center gap-5">
            Home &gt; <span className="text-darkGrey font-medium">Add To Cart</span>
          </div>
          <p className="text-mediumGrey leading-6 font-normal text-sm">
            Please fill in the fields below and click place order to complete your purchase! <br />
            Already registered? <Link to="/login" className="cursor-pointer text-aztecPurple font-semibold text-base">Please login here</Link>
          </p>
        </div>
        {/* Products Table */}
        <ProductTable cartItems={cartItems} updateCartItem={updateCartItem} /> {/* Pass cart items and update function to ProductTable */}
      </div>
      {/* Discount + Proceed to checkout */}
      <div className="container mx-auto flex justify-center gap-28 md:justify-between lg:flex-nowrap flex-wrap items-start bg-[#F6F6F6] py-10 px-8 lg:px-24">
        {/* Discount */}
        <div>
          <h3 className="text-darkGrey font-bold text-2xl">Discount Codes</h3>
          <span className="text-mediumGrey text-base">Enter your coupon code if you have one</span>
          <label className="mt-10 bg-white flex justify-center items-center w-fit h-fit rounded-lg overflow-hidden border-solid border-[1px] border-[#BEBCBD]">
            <input
              className="input outline-none focus:bg-white rounded-none"
              type="text"
              onChange={(e) => setDiscount(e.target.value)} // Update discount code
              placeholder="Enter coupon code"
            />
            <div
              className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 hover:bg-purple-800 text-white w-full h-full"
              onClick={() => {
                // Here you can add your coupon validation logic
                alert('Coupon applied!'); // Replace this with actual logic
              }}
            >
              Apply Coupon
            </div>
          </label>
          <div className="text-darkGrey border-solid border-[1px] border-darkGrey text-center py-3 rounded-lg mt-9 cursor-pointer transition-all duration-200 w-[230px] font-semibold text-base bg-white hover:bg-aztecPurple hover:text-white">Continue Shopping</div>
        </div>
        {/* Proceed to checkout */}
        <div className="text-darkGrey w-full flex justify-center items-center flex-col">
          <div className="flex flex-col justify-center items-center w-full px-[91px] text-xl">
            <div className="flex justify-center items-center gap-24 font-medium">
              <span>Sub Total</span>
              <span>${parseFloat(subtotal).toFixed(2)}</span> {/* Dynamic subtotal from Firestore */}
            </div>
            <div className="mt-4 flex justify-center items-center gap-24">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span> {/* Fixed shipping cost */}
            </div>
            <div className="mt-10 flex justify-center items-center gap-24 font-bold">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span> {/* Dynamic grand total */}
            </div>
          </div>
          <div className="w-full h-[0.09px] bg-[#BEBCBD] mt-[50px]"></div>
          <Link state={{totalPrice: subtotal}} to="/shop/cart/checkout" className="w-fit">
            <div className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 mx-auto mt-[50px] hover:bg-purple-800 text-white rounded-lg w-[230px]">Proceed To Checkout</div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
