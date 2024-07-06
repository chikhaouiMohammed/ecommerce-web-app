import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SectionHeading from '../../components/ui/SectionHeading';
import img from '../../images/Categories/For Women/Rectangle 1.png';
import gPayImg from '../../images/Checkout/googlePay.png';
import visaImg from '../../images/Checkout/visa.png';
import payPalImg from '../../images/Checkout/paypal.png';
import payPassImg from '../../images/Checkout/paypass.png';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
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

    useEffect(() => {
        const currentUser = auth.currentUser;
        fetchData(currentUser);
    }, []);

    return (
        <div className='font-open'>
            {/* NavBar */}
            <Header />
            {/* CheckoutContent */}
            <div className='container mx-auto mt-32'>
                {/* Heading */}
                <div className='flex flex-col justify-center gap-[52px] items-start w-full'>
                    <div className="font-semibold text-mediumGrey text-base md:text-lg flex justify-center flex-wrap md:flex-nowrap items-center gap-5">
                        <span>Home</span>
                        <span>></span>
                        <span>My Account</span>
                        <span>></span>
                        <span className="text-darkGrey font-medium">Checkout</span>
                    </div>
                    <SectionHeading title='Check Out' />
                </div>
                {/* Checkout Body */}
                <div className='font-bold text- mb-5'>Billing Details</div>
                <div className='w-full flex lg:flex-nowrap flex-wrap gap-5 justify-center items-start'>
                    {/* Checkout Form + payment */}
                    <div className='lg:order-1 flex-shrink-0 order-2'>
                        <form className='flex flex-col w-full flex-shrink-0 justify-center gap-10 lg:gap-2 items-start px-2'>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-between items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="firstName">
                                    <div className='w-full text-base font-semibold ml-1 mb-2'>First Name*</div>
                                    <input type="text" id="firstName" required placeholder="First Name" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="lastName">
                                    <div className='text-base font-semibold ml-1 mb-2'>Last Name*</div>
                                    <input type="text" id="lastName" required placeholder="Last Name" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="country">
                                    <div className='text-base font-semibold ml-1 mb-2'>Country / Region*</div>
                                    <input type="text" id="country" required placeholder="Country/Region" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="companyName">
                                    <div className='text-base font-semibold ml-1 mb-2'>Company Name</div>
                                    <input type="text" id="companyName" placeholder="Company (optional)" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center items-center gap-10 md:gap-8'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="streetAddress">
                                    <div className='text-base font-semibold ml-1 mb-2'>Street Address*</div>
                                    <input type="text" id="streetAddress" required placeholder="House numbers and streets" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="aptUnit">
                                    <div className='text-base font-semibold ml-1 mb-2'>Apt, suite, unit</div>
                                    <input type="text" id="aptUnit" required placeholder="Apartment, suite, unit, etc. (optional)" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <div className='w-full flex-wrap md:flex-nowrap flex justify-center gap-10 md:gap-8 items-center'>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="city">
                                    <div className='text-base font-semibold ml-1 mb-2'>City*</div>
                                    <input type="text" id="city" required placeholder="Town / City" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="state">
                                    <div className='text-base font-semibold ml-1 mb-2'>State*</div>
                                    <input type="text" id="state" required placeholder="State" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                                <label className='w-full flex flex-col justify-center items-start gap-8' htmlFor="postalCode">
                                    <div className='text-base font-semibold ml-1 mb-2'>Postal Code*</div>
                                    <input type="text" id="postalCode" required placeholder="Postal Code" className="input w-full py-6  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                                </label>
                            </div>
                            <label className='w-full' htmlFor="phone">
                                <div className='text-base font-semibold ml-1 mb-2'>Phone*</div>
                                <input type="text" id="phone" required placeholder="Phone" className="input w-full py-6 max-w-xs  bg-[#F6F6F6] placeholder:text-mediumGrey" />
                            </label>
                            <button type='submit' className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 mx-auto mt-[50px] hover:bg-purple-800 text-white rounded-lg w-[230px] ms-0 ">Continue to Delivery</button>
                            <div className='mt-4 cursor-pointer flex justify-center items-center gap-3' htmlFor="save-info">
                                <input type="checkbox" required className='checkbox-primary cursor-pointer' name="save-info" id="save-info" />
                                <label className='cursor-pointer text-lg font-normal text-darkGrey' htmlFor="save-info">Save my information for faster checkout</label>
                            </div>
                            <div className="w-full h-[0.09px] bg-[#EDEEF2]"></div>
                        </form>
                        {/* Payment */}
                        <div className='px-2 w-full'>
                            {/* Address Heading */}
                            <div className='my-8 text-darkGrey font-bold text-lg md:text-[22px] flex flex-col justify-center items-start gap-2'>
                                <h3 className='font-bold text-lg md:text-[22px]'>Shipping Address</h3>
                                <span className='font-normal text-base'>Select the address that matches your payment method</span>
                            </div>
                            {/* Address Choices */}
                            <div className='bg-[#F6F6F6] rounded-xl mt-8 text-darkGrey text-lg md:text-[22px] font-bold flex flex-col justify-center items-start gap-6 px-7 py-9'>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="radio-one" />
                                    <label htmlFor="radio-one">James William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="radio-two" />
                                    <label htmlFor="radio-two">Asmey William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="radio-three" />
                                    <label htmlFor="radio-three">Linda William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="radio-four" />
                                    <label htmlFor="radio-four">Klark William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="radio-five" />
                                    <label htmlFor="radio-five">Aseem William</label>
                                </div>
                            </div>
                            {/* Select Address + Payment */}
                            <div className='mt-[26px] flex flex-col justify-center items-center gap-[36px] px-2'>
                                <div className='text-lg font-bold text-darkGrey'>Payment</div>
                                <div className='bg-[#F6F6F6] rounded-xl mt-8 text-darkGrey text-lg md:text-[22px] font-bold flex flex-col justify-center items-start gap-6 px-7 py-9'>
                                    <div className='flex justify-center items-center gap-5'>
                                        <input type="radio" className='radio-primary' name="payment" id="payment-radio-one" />
                                        <label htmlFor="payment-radio-one" className='cursor-pointer'>Google Pay</label>
                                        <img className='cursor-pointer h-[40px] w-[90px]' src={gPayImg} alt="Google Pay" />
                                    </div>
                                    <div className='flex justify-center items-center gap-5'>
                                        <input type="radio" className='radio-primary' name="payment" id="payment-radio-two" />
                                        <label htmlFor="payment-radio-two" className='cursor-pointer'>Visa</label>
                                        <img className='cursor-pointer h-[40px] w-[90px]' src={visaImg} alt="Visa" />
                                    </div>
                                    <div className='flex justify-center items-center gap-5'>
                                        <input type="radio" className='radio-primary' name="payment" id="payment-radio-three" />
                                        <label htmlFor="payment-radio-three" className='cursor-pointer'>PayPal</label>
                                        <img className='cursor-pointer h-[40px] w-[90px]' src={payPalImg} alt="PayPal" />
                                    </div>
                                    <div className='flex justify-center items-center gap-5'>
                                        <input type="radio" className='radio-primary' name="payment" id="payment-radio-four" />
                                        <label htmlFor="payment-radio-four" className='cursor-pointer'>PayPass</label>
                                        <img className='cursor-pointer h-[40px] w-[90px]' src={payPassImg} alt="PayPass" />
                                    </div>
                                    <div className='w-full h-[0.09px] bg-[#EDEEF2]'></div>
                                </div>
                                <Link to='/checkout'>
                                    <div className='cursor-pointer flex justify-center items-center gap-2 w-full mt-2'>
                                        <img className='cursor-pointer h-[25px] w-[30px]' src={img} alt="Add" />
                                        <button type='submit' className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 mx-auto mt-[50px] hover:bg-purple-800 text-white rounded-lg w-[230px] ms-0 ">Checkout Now</button>
                                    </div>
                                </Link>
                                <div className='w-full h-[0.09px] bg-[#EDEEF2]'></div>
                            </div>
                            {/* Address Choices */}
                            <div className='bg-[#F6F6F6] rounded-xl mt-8 text-darkGrey text-lg md:text-[22px] font-bold flex flex-col justify-center items-start gap-6 px-7 py-9'>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="address-radio-one" />
                                    <label htmlFor="address-radio-one">James William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="address-radio-two" />
                                    <label htmlFor="address-radio-two">Asmey William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="address-radio-three" />
                                    <label htmlFor="address-radio-three">Linda William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="address-radio-four" />
                                    <label htmlFor="address-radio-four">Klark William</label>
                                </div>
                                <div className='flex justify-center items-center gap-5'>
                                    <input type="radio" className='radio-primary' name="address" id="address-radio-five" />
                                    <label htmlFor="address-radio-five">Aseem William</label>
                                </div>
                            </div>
                            <div className='w-full h-[0.09px] bg-[#EDEEF2]'></div>
                        </div>
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
                <div className='flex flex-col lg:flex-row justify-center gap-[20px] mt-2'>
                    <div className='bg-[#F6F6F6] w-full flex flex-col justify-center items-center gap-[10px] rounded-xl px-[29px] py-[19px]'>
                        <div className='text-[18px] font-semibold'>Subtotal</div>
                        <div className='flex justify-between items-center gap-[10px]'>
                            <div className='text-[18px] font-normal text-[15px]'>16 items</div>
                            <div className='text-[18px] font-normal text-[15px]'>$14.99</div>
                        </div>
                        <div className='flex justify-between items-center gap-[10px]'>
                            <div className='text-[18px] font-normal text-[15px]'>Shipping</div>
                            <div className='text-[18px] font-normal text-[15px]'>Calculated at checkout</div>
                        </div>
                        <div className='w-full h-[0.09px] bg-[#EDEEF2]'></div>
                        <div className='flex justify-between items-center gap-[10px]'>
                            <div className='text-[18px] font-semibold text-[15px]'>Total</div>
                            <div className='text-[18px] font-semibold text-[15px]'>$149.99</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Checkout;
