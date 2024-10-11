import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SectionHeading from '../../components/ui/SectionHeading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';

const Checkout = () => {
    const [productsList, setProductsList] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    let { state } = useLocation();
    let totalPrice = state.totalPrice

    const fetchData = async (currentUser) => {
        try {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "cart", `${currentUser.uid}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productsWithQuantity = docSnap.data();
                    setProductsList(productsWithQuantity.products); // Assuming products are stored in a 'products' field within the document
                } else {
                    setProductsList([]);
                    toast.error("There are no products in the cart.");
                }
            } else {
                setUser(null);
                setProductsList([]);
                toast.error("Please login to view your cart.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            window.location.href = '/shop/cart/empty';
        }
    };

    const generateOrderNumber = () => {
        // Generate a random 6-digit number
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return randomNum;
    };

    const clearCardItems = async () => {
        try {
            const docRef = doc(db, "cart", `${user.uid}`);
            await setDoc(docRef, { products: [] });
        } catch (error) {
            console.error("Error clearing cart items:", error);
            toast.error("Failed to clear cart items. Please try again later.");
        }
    }

    const handlePayNow = async () => {
        try {
            if (!user) {
                toast.error("Please login to place an order.");
                return;
            }
    
            const order = {
                orderNumber: generateOrderNumber(),
                products: productsList,
                createdAt: serverTimestamp(),
                totalPrice: totalPrice
            };
    
            const ordersCollectionRef = collection(db, `myOrder/${user.uid}/orders`); // Adjusted collection reference
            await setDoc(doc(ordersCollectionRef), order);
    
            await clearCardItems()
            // await clearCart(user.uid);
    
            // Redirect to order confirmation page
            toast.success("Ordr eplaced successfully!");
            navigate('/shop/cart/checkout/order-confirmed');
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again later.");
        }
    };
    

    useEffect(() => {
        const currentUser = auth.currentUser;
        fetchData(currentUser);
    }, []);

    return (
        <div className="font-open">
            {/* Header */}
            <Header />
    
            {/* Main Content */}
            <div className="container mx-auto mt-32 px-4 lg:px-0">
                {/* Breadcrumb and Heading */}
                <div className="mb-12 text-center lg:text-left">
                    <nav className="text-mediumGrey font-semibold space-x-2">
                        <Link to="/" className="hover:underline">Home</Link> 
                        <span>&gt;</span> 
                        <Link to="/account" className="hover:underline">My Account</Link> 
                        <span>&gt;</span> 
                        <span className="text-darkGrey font-medium">Checkout</span>
                    </nav>
                    <SectionHeading title="Check Out" />
                </div>
    
                {/* Checkout Content */}
                <div className="flex flex-col lg:flex-row px-5 py-4 justify-between gap-12">
                    
                    {/* Left: Billing & Payment Form */}
                    <div className="flex-grow lg:max-w-[60%]">
                        {/* Billing Details */}
                        <div className="mb-8">
                            <h2 className="font-bold text-lg mb-4">Billing Details</h2>
                            <form onSubmit={(event) => {
                                        event.preventDefault();  
                                        handlePayNow();         
                                    }}  className="space-y-6">
                                {/* Name Fields */}
                                <div className="flex flex-wrap w-full gap-6">
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="firstName">First Name*</label>
                                        <input type="text" id="firstName" required placeholder="First Name" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="lastName">Last Name*</label>
                                        <input type="text" id="lastName" required placeholder="Last Name" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                </div>
    
                                {/* Address Fields */}
                                <div className="flex flex-wrap w-full gap-6">
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="country">Country / Region*</label>
                                        <input type="text" id="country" required placeholder="Country/Region" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="company">Company Name</label>
                                        <input type="text" id="company" placeholder="Company (optional)" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                </div>
    
                                <div className="flex flex-wrap w-full gap-6">
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="address">Street Address*</label>
                                        <input type="text" id="address" required placeholder="House number and street" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="apt">Apt, suite, unit (optional)</label>
                                        <input type="text" id="apt" placeholder="Apartment, suite, unit" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                </div>
    
                                <div className="flex flex-wrap w-full gap-6">
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="city">City*</label>
                                        <input type="text" id="city" required placeholder="City" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="state">State*</label>
                                        <input type="text" id="state" required placeholder="State" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                    <div className="md:flex-1 w-full">
                                        <label className="block mb-2 font-semibold" htmlFor="postalCode">Postal Code*</label>
                                        <input type="text" id="postalCode" required placeholder="Postal Code" className="input w-full py-3 bg-[#F6F6F6]" />
                                    </div>
                                </div>
    
                                <div className="mb-8">
                                    <label className="block mb-2 font-semibold" htmlFor="phone">Phone*</label>
                                    <input type="text" id="phone" required placeholder="Phone" className="input w-full py-3 bg-[#F6F6F6]" />
                                </div>
    
                                {/* Save Info */}
                                <div className="flex items-center space-x-3 mb-6">
                                    <input type="checkbox" id="saveInfo" className="checkbox-primary" />
                                    <label htmlFor="saveInfo" className="text-darkGrey text-lg">Save my information for faster checkout</label>
                                </div>
                                {/* Payment Section */}
                        <div>
                            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
                            <div className="bg-[#F6F6F6] p-6 rounded-lg space-y-4">
                                {/* Credit Card */}
                                <div className="flex items-start space-x-3">
                                    <input type="radio" name="paymentMethod" id="creditCard" className="radio-primary" />
                                    <label htmlFor="creditCard" className="flex-grow">
                                        Credit Card
                                        <div className="text-mediumGrey text-sm">We accept all major credit cards</div>
                                    </label>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <input type="text" className="input w-full py-3" placeholder="Card Number" />
                                    <input type="text" className="input w-full py-3" placeholder="Name on Card" />
                                    <input type="text" className="input w-full py-3" placeholder="Expiration Date (MM/YY)" />
                                    <input type="text" className="input w-full py-3" placeholder="Security Code" />
                                </div>
    
                                {/* Cash on Delivery */}
                                <div className="flex items-start space-x-3">
                                    <input type="radio" name="paymentMethod" id="cashOnDelivery" className="radio-primary" />
                                    <label htmlFor="cashOnDelivery">
                                        Cash on Delivery
                                        <div className="text-mediumGrey text-sm">Pay with cash upon delivery</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                                <button type='submit' className=" w-full  mt-8 py-3 bg-aztecPurple text-white rounded-lg hover:bg-purple-800 transition-all duration-200">
                                        Pay Now
                                </button>
                            </form>
                        </div>
    
                        
                    </div>
    
                    {/* Right: Order Summary */}
                    <div className="flex-shrink-0 lg:w-[35%]">
                        <SectionHeading title="Your Order" />
                        <div className="bg-[#F6F6F6] p-6 rounded-lg space-y-6">
                            {productsList.length > 0 ? (
                                productsList.map((product) => (
                                    <div key={product.id}>
                                        <div  className="flex items-center justify-between">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div className="text-sm font-medium">
                                            <p>{product.name}</p>
                                            <p>Qty: {product.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${product.price}</p>
                                    </div>
                                    <div className=' w-full text-center font-semibold'>
                                        Total Price:<span className=''>  ${totalPrice}</span>
                                        
                                    </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-mediumGrey">No items in cart</p>
                            )}
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
    
            {/* Footer */}
            <Footer />
        </div>
    );
    
}

export default Checkout
