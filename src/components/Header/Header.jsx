import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../../images/Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Header = () => {

  const [isMenu, setisMenu] = useState(false);
  const [userId, setUserId] = useState('');
  const [productsNumber, setproductsNumber] = useState(0);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      setproductsNumber(data.products.length);
    } else {
      console.log("No such document!");
    }
  };


  return (
    <nav className="z-50 bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="relative max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mr-1">
          <img src={logo} alt="Logo" className="h-8" />
        </a>
        
        <div className={`mx-2 w-full justify-between items-center gap-7 ${isMenu ? 'flex flex-col  lg:flex-row' : 'hidden'} lg:flex lg:w-auto lg:order-1 absolute lg:static bg-white lg:bg-transparent -left-2 top-16 lg:top-0`}>
          <ul className="flex flex-col justify-center items-center lg:flex-row p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg w-full bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white gap-5">
            {/* Navigation links */}
            <li className='lg:w-fit w-full text-center'>
              <a href="/" className="block py-2 px-3 text-mediumGrey rounded bg-transparent  transition-all duration-200 hover:text-darkGrey md:p-0">
                Shop
              </a>
            </li>
            <li className='lg:w-fit w-full text-center'>
              <Link to='/shop/men' className="block py-2 px-3 text-mediumGrey rounded bg-transparent  transition-all duration-200 hover:text-darkGrey md:p-0">
                Men
              </Link>
            </li>
            <li className='lg:w-fit w-full text-center'>
              <Link
                to='/shop/women'
                className="block py-2 px-3 text-mediumGrey rounded bg-transparent  transition-all duration-200 hover:text-darkGrey md:p-0"
                aria-current="page"
              >
                Women
              </Link>
            </li>
            <li className='lg:w-fit w-full text-center'>
              <a
                href="#combos"
                className="block py-2 px-3 text-mediumGrey rounded bg-transparent  transition-all duration-200 hover:text-darkGrey md:p-0"
                aria-current="page"
              >
                Combos
              </a>
            </li>
            <li className='lg:w-fit w-full text-center'>
              <a
                href="#joggers"
                className="block py-2 px-3 text-mediumGrey rounded bg-transparent  transition-all duration-200 hover:text-darkGrey md:p-0"
                aria-current="page"
              >
                Joggers
              </a>
            </li>
            {/* Add other links here */}
            <li className='w-fit '>
              <div className="flex flex-col lg:flex-row gap-5 lg:order-2  rtl:space-x-reverse">
                {/* Login/Sign Up Links */}
                <Link to='/login' className="text-aztecPurple w-full bg-transparent transition-all duration-200 hover:bg-aztecPurple hover:text-white font-medium rounded-lg text-sm lg:px-12 px-6 border-aztecPurple border-solid border-[1px] lg:flex justify-center py-1 items-center text-center">
                  Login
                </Link>
                <Link to='/signup' className="text-aztecPurple lg:w-fit flex-shrink-0 bg-transparent transition-all duration-200 hover:bg-aztecPurple hover:text-white font-medium rounded-lg text-sm lg:px-12 px-6 border-aztecPurple border-solid border-[1px] lg:flex justify-center items-center py-1 text-center">
                  Sign Up
                </Link>

                {/* Navigation Icons */}
                <div className="w-fit flex items-center gap-3 ">
                  {/* Favorites */}
                  <Link to='/user-profile/wish-list' className={`cursor-pointer w-[44px] h-[44px] flex justify-center items-center bg-[#F6F6F6] ${path === '/user-profile/wish-list' ? 'bg-aztecPurple' : ''} rounded-lg transition-all duration-200 hover:bg-aztecPurple`}>
                    <FaRegHeart className="font-bold text-xl" />
                  </Link>

                  {/* Account */}
                  <Link to='/user-profile' className={`cursor-pointer w-[44px] h-[44px] flex justify-center items-center bg-[#F6F6F6] ${path === '/user-profile/contact-info' ? 'bg-aztecPurple' : ''} rounded-lg transition-all duration-200 hover:bg-aztecPurple`}>
                    <FaRegUser className="font-bold text-xl" />
                  </Link>

                  {/* Cart */}
                  <Link to="/shop/cart" className={`cursor-pointer w-[44px] h-[44px] flex justify-center items-center ${path === '/shop/cart' ? 'bg-aztecPurple' : ''} bg-[#F6F6F6] rounded-lg transition-all duration-200 hover:bg-aztecPurple`}>
                    <div className="relative w-full h-full flex justify-center items-center">
                      <FiShoppingCart className="font-bold text-xl" />
                      {productsNumber > 0 && (
                        <div className=' w-6 h-6 rounded-full bg-red-600 text-white flex justify-center items-center absolute -top-2 -right-2'>{productsNumber}</div>                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Menu toggle button for small screens */}
        <button onClick={() => setisMenu(!isMenu)} className="lg:hidden btn btn-circle swap swap-rotate">
          <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg> 
        </button>
      </div>
    </nav>
  );
};

export default Header;
