import { IoIosArrowRoundForward } from "react-icons/io"
import Header from "../../components/Header/Header"
import ProductTable from "../../components/ProductTable/ProductTable"
import Footer from "../../components/Footer/Footer"
import { Link } from "react-router-dom"



const CartPage = () => {
  return (
    <div className="font-open ">
        {/* Nav Bar */}
        <Header/>
        {/*Cart Page Content */}
        <div className="bg-white container mx-auto px-5 py-8 mt-24">
            {/* Heading Content */}
            <div className="flex flex-col justify-center items-start gap-5">
              <div className="font-semibold text-mediumGrey text-base md:text-lg flex justify-center items-center gap-5">Home  ><span className="text-darkGrey font-medium">Add To Cart</span></div>
              <p className="text-mediumGrey leading-6 font-normal text-sm">
                Please fill in the fields below and click place order to complete your purchase! <br />
                Already registered ? <Link to='/login' className="cursor-pointer text-aztecPurple font-semibold text-base"> Please login here</Link>
              </p>
            </div>
            {/* Products Table*/}
            <ProductTable/>
            
        </div>
        {/* Discount + Proceed to checkout */}
        <div className="container mx-auto flex justify-center gap-28 md:justify-between lg:flex-nowrap flex-wrap  items-start bg-[#F6F6F6] py-10 px-8 lg:px-24">
              {/* Discount */}
              <div>
                <h3 className="text-darkGrey font-bold text-2xl">Discount Codes</h3>
                <span className="text-mediumGrey text-base">Enter your coupon code if you have one</span>
                <label className="mt-10 bg-white flex justify-center items-center w-fit h-fit rounded-lg overflow-hidden border-solid border-[1px] border-[#BEBCBD]">
                  <input className="input outline-none focus:bg-white rounded-none " type="text" />
                  <div className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 hover:bg-purple-800 text-white w-full h-full">Apply Coupon</div>
                </label>
                <div className="text-darkGrey border-solid border-[1px] border-darkGrey text-center py-3 rounded-lg mt-9 cursor-pointer transition-all duration-200 w-[230px] font-semibold text-base bg-white hover:bg-aztecPurple hover:text-white">Continue Shopping</div>
              </div>
              {/* Proceed to checkout */}
              <div className="text-darkGrey w-full flex justify-center items-center flex-col ">
                <div className="flex flex-col justify-center items-center w-full px-[91px] text-xl">
                  <div className="flex justify-center items-center gap-24 font-medium">
                    <span>Sub Total</span>
                    <span>$513.00</span>
                  </div>
                  <div className="mt-4 flex justify-center items-center gap-24">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="mt-10 flex justify-center items-center gap-24 font-bold">
                    <span>Grand Total</span>
                    <span>$518.00</span>
                  </div>
                </div>
                <div className="w-full h-[0.09px] bg-[#BEBCBD] mt-[50px]"></div>
                <Link to='/shop/cart/checkout' className="w-fit"><div className="py-3 px-8 text-center cursor-pointer bg-aztecPurple transition-all duration-200 mx-auto mt-[50px] hover:bg-purple-800 text-white rounded-lg w-[230px]">Proceed To Checkout</div></Link>
              </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CartPage
