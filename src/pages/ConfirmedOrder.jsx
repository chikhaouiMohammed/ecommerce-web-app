import Header from "../components/Header/Header";
//images
import UserImg from '../images/OrderConfiemed/UserImg.png';
import checkImg from '../images/OrderConfiemed/CheckImg.png'
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const ConfirmedOrder = () => {
  return (
    <div className="font-open">
        {/* NavBar */}
        <Header/>
        {/* Content */}
        <div className="container px-5 mx-auto flex justify-center gap-5 items-center my-28 flex-wrap md:flex-nowrap">
            {/* Women Img  */}
            <div><img className="w-full h-full" src={UserImg} alt="" /></div>
            {/* Background Div */}
            <div className="rounded-xl flex flex-col justify-center items-center border-solid border-[1px] border-darkGrey py-16 px-20" >
                <div><img className="w-full h-full" src={checkImg} alt="" /></div>
                <div className="flex flex-col justify-center items-center gap-[30px]">
                  <h2 className="text-darkGrey text-3xl font-bold text-center">Your Order is <br /> Confirmed</h2>
                  <Link to='/' className='ml-8 btn bg-aztecPurple text-white hover:bg-purple-800 hover:text-white'>Continue Shopping</Link>
                </div>  
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default ConfirmedOrder;
