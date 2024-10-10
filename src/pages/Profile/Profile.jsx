import Header from '../../components/Header/Header'
import { BsHandbag } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { FaRegHeart } from 'react-icons/fa';
import { LuUser2 } from "react-icons/lu";
import { IoMdHeartEmpty } from 'react-icons/io';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';



const Profile = () => {

    const [isAside, setisAside] = useState(false);
    const location = useLocation()
    const path = location.pathname
    const user = auth.currentUser
    console.log(user)
    
    const handleSignOut = async() => {
        signOut(auth).then(() => {
            window.location.href = '/'
          }).catch((error) => {
            window.location.href = '/shop/404'
          });
    }


  return (
    <div className='font-open'>
        {/* NavBar */}
        <Header/>
        {/* Profile Content */}
        <div className='container mx-auto my-28 w-full px-5 lg:px-0'>
            {/* Profile Heading */}
            <div className="font-semibold mb-12 text-mediumGrey text-base md:text-lg w-full flex justify-start items-center gap-5"><span>Home</span>  <span>></span>  <span>My Account</span><span>></span><span className="text-darkGrey font-medium">Personal Info</span></div>
            {/*Aside Button*/}
            <button onClick={()=>setisAside(!isAside)} className='ml-8 btn md:hidden block bg-aztecPurple text-white my-12 hover:bg-purple-800 hover:text-white'>{isAside ? 'Hide' : 'Show'} Aside Menu</button>
            {/* Profile Aside + body */}
            <div className='flex relative justify-center items-start'>
                {/* Aside */}
                <aside className={`${isAside ? 'absolute left-0 top-0 w-full' : 'hidden'} p-10 bg-white shadow-lg md:bg-transparent md:flex flex-col flex-shrink-0 justify-center items-start`}>
                    <div className='w-full flex justify-start items-center gap-[26px] font-open mb-3'>
                        <div className='h-[30px] w-[6px] bg-aztecPurple rounded-[10px]'></div>
                        <div className='text-darkGrey text-[34px] font-bold'>Hello User</div>
                    </div>
                    <span className='text-sm text-mediumGrey'>Welcome to your account</span>
                    <ul className='w-full flex flex-col justify-center items-start'>
                        <Link to='orders' className={`w-full cursor-pointer ${ path=='/user-profile/orders' ? 'bg-[#F6F6F6]' : '' } transition-all duration-200 hover:bg-[#F6F6F6] px-9 py-3 rounded-lg`}>
                            <div className='flex justify-start items-center gap-4 text-lg text-mediumGrey font-semibold w-full'>
                                <div className='w-[22px] h-[22px]'><BsHandbag className='text-2xl'/></div>
                                <div>My orders</div>
                            </div>  
                        </Link>
                        <Link to='wish-list' className={`w-full cursor-pointer ${ path=='/user-profile/wish-list' ? 'bg-[#F6F6F6]' : '' }  transition-all duration-200  hover:bg-[#F6F6F6] px-9 py-3 rounded-lg`}>
                            <div className='flex justify-start items-center gap-4 text-lg text-mediumGrey font-semibold w-full'>
                                <div className='w-[22px] h-[22px]'><IoMdHeartEmpty className='text-2xl'/></div>
                                <div>Wishlist</div>
                            </div>  
                        </Link>
                        <Link to='contact-info' className={`w-full cursor-pointer ${ path=='/user-profile/contact-info' ? 'bg-[#F6F6F6]' : '' } transition-all duration-200  hover:bg-[#F6F6F6] px-9 py-3 rounded-lg `}>
                            <div className='flex justify-start items-center gap-4 text-lg text-mediumGrey font-semibold w-full'>
                                <div className='w-[22px] h-[22px]'><LuUser2 className='text-2xl'/></div>
                                <div>My Info</div>
                            </div>  
                        </Link>
                        <li onClick={handleSignOut} className='w-full cursor-pointer transition-all duration-200 hover:bg-[#F6F6F6] px-9 py-3 rounded-lg'>
                            <div className='flex justify-start items-center gap-4 text-lg text-mediumGrey font-semibold w-full'>
                                <div className='w-[22px] h-[22px]'><GoSignOut  className='text-2xl'/></div>
                                <div>Sign out</div>
                            </div>  
                        </li>
                    </ul>
                </aside>
                {/* Body */}
                <div className='w-full px-10'>
                    <h2 className='text-darkGrey font-bold text-3xl mb-9'>My Orders</h2>
                    <Outlet/>
                    {/* <OrderDetails/> */}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile
