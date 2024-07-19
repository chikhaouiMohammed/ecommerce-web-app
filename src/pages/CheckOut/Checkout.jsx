import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SectionHeading from '../../components/ui/SectionHeading';
import img from '../../images/Categories/For Women/Rectangle 1.png';
import gPayImg from '../../images/Checkout/googlePay.png';
import visaImg from '../../images/Checkout/visa.png';
import payPalImg from '../../images/Checkout/paypal.png';
import payPassImg from '../../images/Checkout/paypass.png';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';

const Checkout = () => {
    const [productsList, setProductsList] = useState([]);
    const [user, setUser] = useState(null);

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
                // Add any other order details you want to store
            };
    
            const ordersCollectionRef = collection(db, `myOrder/${user.uid}/orders`); // Adjusted collection reference
            await setDoc(doc(ordersCollectionRef), order);
    
            // Clear the cart after placing the order (assuming you have a function for this)
            // await clearCart(user.uid);
    
            // Redirect to order confirmation page
            toast.success("Order placed successfully!");
            history.push('/shop/cart/checkout/order-confirmed');
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
    <div className='font-open'>
        {/* NavBar */}
        <Header/>
        {/* CheckoutContent */}
        <div className='container mx-auto  mt-32'>
        {/* Heading */}
        <div className='flex flex-col justify-center gap-[52px] items-start w-full'>
            <div className="font-semibold text-mediumGrey text-base md:text-lg flex justify-center flex-wrap md:flex-nowrap items-center gap-5"><span>Home</span>  <span>></span>  <span>My Account</span><span>></span><span className="text-darkGrey font-medium">Checkout</span></div>
            <SectionHeading title='Check Out' />
        </div>
        {/* Checkout Body */}
        <div className='font-bold text- mb-5'>Billing Details</div>
        <div className='w-full flex lg:flex-nowrap flex-wrap gap-5 justify-center items-start'>
                {/* Checkout Form  + payment */}
                <div className='lg:order-1 flex-shrink-0 order-2 w-[300px] mx-auto md:w-fit'>
                    <form className='flex flex-col w-full flex-shrink-0 justify-center gap-10 lg:gap-2 items-start px-2'>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-between items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='w-full text-base font-semibold ml-1 mb-2'>First Name*</div>
                                    <input type="text" required placeholder="First Name" className=" input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Last Name*</div>
                                    <input type="text" required placeholder="Last Name" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Country / Region*</div>
                                    <input type="text" required placeholder="Country/Region" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Company Name</div>
                                    <input type="text" placeholder="Company (optional)" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Street Address*</div>
                                    <input type="text" required placeholder="House numbers and streets" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Apt, suite, unit</div>
                                    <input type="text" required placeholder="apartment , suite, unit, ect (optional)" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center gap-10 md:gap-8 items-center'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>City*</div>
                                    <input type="text" required placeholder="Town / City" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>State*</div>
                                    <input type="text" required placeholder="State" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="">
                                    <div className='text-base font-semibold ml-1 mb-2'>Postal Code*</div>
                                    <input type="text" required placeholder="Postal Code" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <label className='w-full' htmlFor="">
                                <div className='text-base font-semibold ml-1 mb-2'>Phone*</div>
                                <input type="text" required placeholder="Phone" className="input w-full py-6 max-w-xs  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                            </label>
                            <button type='submit' className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 mx-auto mt-[50px] hover:bg-purple-800 text-white rounded-lg w-[230px] ms-0 ">Continue to delivery</button>
                            <div  className='mt-4 cursor-pointer flex justify-center items-center gap-3' htmlFor="">
                                <input type="checkbox" required placeholder='Save my ' required className='checkbox-primary cursor-pointer' name="save-info" id="save-info" />
                                <label className='cursor-pointer text-lg font-normal text-darkGrey' for="save-info">Save my information as faster checkout</label>
                            </div>
                            <div className="w-full h-[0.09px] bg-[#EDEEF2]"></div>
                    </form>
                    {/* Payment */}
                    <div className='px-2 w-[300px] mx-auto md:w-full'>
                        {/*Address Heading */}
                        <div className='my-8 text-darkGrey font-bold text-lg md:text-[22px] flex flex-col justify-center items-start gap-2'>
                            <h3 className='font-bold text-lg md:text-[22px]'>Shipping Address</h3>
                            <span className='font-normal text-base'>Select the address that matches your or payment method</span>
                        </div>
                        {/* Address Choices */}
                        <div className='bg-[#F6F6F6] rounded-xl mt-8 text-darkGrey text-lg md:text-[22px] font-bold flex flex-col justify-center items-start gap-6 px-7 py-9'>
                            <div className='flex justify-center items-center gap-5'>
                                <input  type="radio" className='radio-primary' name="address" id="radio-one" />
                                <label className='custom-radio-label' htmlFor="radio-one">Same as Billing address</label>
                            </div>
                            <div className="w-full h-[0.09px] bg-[#BEBCBD]"></div>
                            <div className='flex justify-center items-center gap-5'>
                                <input className='radio-primary' type="radio" name="address" id="radio-two" />
                                <label className='custom-radio-label' htmlFor="radio-two">Use a different shipping address</label>
                            </div>
                        </div>
                        <div className="w-full my-8 h-[0.09px] bg-[#EDEEF2]"></div>
                        {/* Shipping Heading */}
                        <div className=' text-darkGrey  font-bold text-lg md:text-[22px] flex flex-col justify-center items-start gap-2'>
                            <h3 className='font-bold text-lg md:text-[22px]'>Shipping Method</h3>
                        </div>
                        {/* Shipping Method */}
                        <div className='bg-[#F6F6F6]  mt-8 rounded-xl text-darkGrey text-xl font-bold flex flex-col justify-center items-start gap-6 px-7 py-9'>
                        <div >
                                Arrives by Monday, June 7
                            </div>
                            <div className="w-full h-[0.09px] bg-[#BEBCBD]"></div>
                            <div className='w-full'>
                                <div className='w-full flex justify-between items-center'>
                                    <h3>Delivery Charges</h3>
                                    <span>$5.00</span>
                                </div>
                                <br /> 
                                <span className='text-base text-mediumGrey font-medium'>Additional fess may apply</span>
                            </div>
                        </div>
                        {/*Payment Method Heading */}
                        <div className='my-8 text-darkGrey  font-bold text-lg md:text-[22px] flex flex-col justify-center items-start gap-2'>
                            <h3 className='font-bold text-lg md:text-[22px]'>Payment Method</h3>
                            <span className='font-normal text-base'>All transaction are secure and encrypted</span>
                        </div>
                        {/* Payment  Choices */}
                        <div className='bg-[#F6F6F6] rounded-xl mt-8  text-darkGrey text-xl font-bold flex flex-col justify-center items-start gap-6 px-2 lg:px-7 py-9'>
                            {/* Credit Card Method */} 
                            <div className='flex flex-col justify-center items-start gap-5 w-full'>
                                <div className='cursor-pointer flex justify-center items-center gap-5'>
                                    <input defaultChecked className='radio-primary' type="radio" name="payment" id="credit-radio" />
                                    <label className='custom-radio-label' htmlFor="credit-radio">Credit Card 
                                        <br />
                                        <span className='font-normal text-base'>We accept all major credit card</span>
                                    </label>
                                </div>
                                {/* card credits methods */}
                                <div className='w-full '>
                                    {/* Payment methods images */}
                                    <div className='mb-[30px] flex justify-center flex-wrap md:flex-nowrap items-center gap-5'>
                                        <div className='w-20 flex justify-center items-center py-4 rounded-lg bg-white'><img className='w-fit h-fit' src={gPayImg} alt="" /></div>
                                        <div className='w-20 flex justify-center items-center py-4 rounded-lg bg-white'><img className='w-fit h-fit' src={visaImg} alt="" /></div>
                                        <div className='w-20 flex justify-center items-center py-4 rounded-lg bg-white'><img className='w-fit h-fit' src={payPalImg} alt="" /></div>
                                        <div className='w-20 flex justify-center items-center py-4 rounded-lg bg-white'><img className='w-fit h-fit' src={payPassImg} alt="" /></div>
                                    </div>
                                    {/* payment form */}
                                    <form className='w-full'>
                                        <div className='mb-10 w-full flex justify-center flex-wrap md:flex-nowrap gap-10 items-center'>
                                            <label className="w-full input input-bordered flex items-center bg-transparent gap-2 border-darkGrey py-7 text-darkGrey">
                                                <input type="text" className="w-full input grow border-none bg-transparent placeholder:text-mediumGrey placeholder:text-sm placeholder:font-normal outline-none focus:border-none" placeholder="Card Number" />
                                            </label>
                                            <label className="w-full input input-bordered flex items-center bg-transparent gap-2 border-darkGrey py-7 text-darkGrey">
                                                <input type="text" className="w-full input grow border-none bg-transparent placeholder:text-mediumGrey placeholder:text-sm placeholder:font-normal outline-none focus:border-none" placeholder="Name of card" />
                                            </label>
                                        </div>
                                        <div className='mb-10 w-full flex justify-center flex-wrap md:flex-nowrap gap-10 items-center'>
                                            <label className="w-full input input-bordered flex items-center bg-transparent gap-2 border-darkGrey py-7 text-darkGrey">
                                                <input type="text" className="w-full input grow border-none bg-transparent placeholder:text-mediumGrey placeholder:text-sm placeholder:font-normal outline-none focus:border-none" placeholder="Expiration date (MM/YY)" />
                                            </label>
                                            <label className="w-full input input-bordered flex items-center bg-transparent gap-2 border-darkGrey py-7 text-darkGrey">
                                                <input type="password" className="w-full input grow border-none bg-transparent placeholder:text-mediumGrey placeholder:text-sm placeholder:font-normal outline-none focus:border-none" placeholder="Security Code" />
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="w-full h-[0.09px] bg-[#BEBCBD]"></div>
                            {/* Cash on delivery */}
                            <div className='cursor-pointer flex justify-center items-center gap-5'>
                                <input defaultChecked className='radio-primary' type="radio" name="payment" id="cash-radio" />
                                <label className='custom-radio-label' htmlFor="cash-radio">Cash on delivery
                                    <br />
                                    <span className='font-normal text-base'>Pay with cash upon delivery</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <Link onClick={handlePayNow}  className='ml-8 btn bg-aztecPurple text-white my-12 hover:bg-purple-800 hover:text-white'>Pay Now</Link>
                </div>
                {/* Order Summary */}
                <div className='lg:order-2 order-1 w-full flex flex-col gap-[34px]'>
                        <SectionHeading title='Your Order' />
                        <div className='bg-[#F6F6F6] rounded-xl px-8 flex flex-col py-6 gap-[34px]'>
                            {productsList.length > 0 ? (
                                productsList.map((product) => (
                                    
                                    <div className='flex justify-between gap-5 items-center w-full'>
                                        {/* Image */}
                                        <div className='w-[63px] h-[63px] rounded-md overflow-hidden'><img className='w-full h-full' src={product.image} alt="" /></div>
                                        {/* Product Details */}
                                        <div className='flex  justify-center gap-8 items-center'>
                                            <h4 className='font-bold text-sm'>{product.name} <span>{product.quantity}</span></h4>
                                            <div className='text-mediumGrey font-bold text-sm'>${product.price}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-ashGrey text-[18px] font-semibold'>No items in cart</div>
                            )}
                        </div>
                </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Checkout
