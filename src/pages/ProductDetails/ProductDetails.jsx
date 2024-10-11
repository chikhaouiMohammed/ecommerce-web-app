import { Link, useLocation, useParams } from "react-router-dom"
//import images
import logo from '../../images/Logo.png'
import PrimaryButton from '../../components/ui/PrimaryButton'
import SectionHeading from '../../components/ui/SectionHeading'
import { FaRegHeart, FaRegUser } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { BiMessageDetail } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiArrowsCounterClockwiseFill, PiTShirt } from "react-icons/pi";
import {  arrayUnion, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { auth, db } from "../../firebase"
import { Rating, styled } from "@mui/material"
import { IoIosArrowRoundForward } from "react-icons/io";
import './productDetails.css'
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"


const ProductDetails = () => {
    let { id } = useParams();
    const [productData, setproductData] = useState();
    const [similarProducts, setSimilarProducts] = useState();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const sizes = ['XSS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
    const colors = [
        { color: 'darkGrey', hex: '#333' },
        { color: 'yellow', hex: '#EDD146' },
        { color: 'pink', hex: '#EB84B0' },
        { color: 'darkRed', hex: '#9C1F35' },
    ];
    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };
    
    let { state } = useLocation()
    const type = state.type
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#EDD146',
        },
      });
      

    const fetchData = async () => {
        try {
          const docRef = doc(db, `categories/${type}/products/${id}`)
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setproductData(docSnap.data())
          } 
          else {
            // docSnap.data() will be undefined in this case
            toast.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products");
        }
      };
      const fetchSimilarProducts = async () => {
        try {
            const productsRef = collection(db, `categories/${type}/products`)
            const q = query(productsRef);
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                toast.error("No products found!");
              } else {
                const similarProductsData = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
                setSimilarProducts(similarProductsData.slice(0,8))
              }
        } catch (error) {
            toast.error(error)
        }
      }

      const addToCart = async () => {
        try {
            const user = auth.currentUser;
            const product = {
                id: id,
                name: productData.name,
                price: productData.price,
                image: productData.images[0],
                size: selectedSize,
                color: selectedColor,
                quantity: 1
            };
    
            await setDoc(doc(db, `cart/${user.uid}`), {
                products: arrayUnion(product)
            }, { merge: true });
            await toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error("Login so you can add into the cart");
        }
    };
    
    
      useEffect(() => {
        fetchData();
        fetchSimilarProducts();
      }, [similarProducts]);


  return (
    <div>
        {/* NavBar */}
        <Header/>
        {productData && 
            <div className="container mx-auto">
            {/* Top Content */}
                <div className=" w-full py-24 px-20 flex flex-wrap lg:flex-nowrap justify-center items-start">
                    {/* Images */}
                    <div className="w-full  flex flex-col justify-center items-start gap-14  rounded-xl">
                        <div className="rounded-xl overflow-hidden shadow-lg flex justify-center items-center w-full"><img className="w-full h-full" src={productData.images[0]} alt="" /></div>
                        <div className="bg-[#BEBCBD] h-[1px] w-full"></div>
                        <div className="md:grid md:grid-cols-2 md:grid-rows-2 w-full flex justify-center flex-wrap items-start gap-16">
                            <div className="flex justify-start items-center w-[250px] pr-5 text-darkGrey gap-4">
                                <div className="w-11 h-11 flex justify-center items-center bg-[#F6F6F6] rounded-full text-xl"><IoCalendarOutline /></div>
                                <div className="text-lg font-medium text-darkGrey">Secure payment</div>
                            </div>
                            <div className="flex justify-start items-center w-[250px] pr-5 text-darkGrey gap-4">
                                <div className="w-11 h-11 flex justify-center items-center bg-[#F6F6F6] rounded-full text-xl"><PiTShirt /></div>   
                                <div className="text-lg font-medium text-darkGrey">Size & Fit</div>                             
                            </div>
                            <div className="flex justify-start items-center w-[250px] pr-5 text-darkGrey gap-4">
                                <div className="w-11 h-11 flex justify-center items-center bg-[#F6F6F6] rounded-full text-xl"><LiaShippingFastSolid /></div>   
                                <div className="text-lg font-medium text-darkGrey">Free Shipping</div>                             
                            </div>
                            <div className="flex justify-start items-center w-[250px] pr-5 text-darkGrey gap-4">
                                <div className="w-11 h-11 flex justify-center items-center bg-[#F6F6F6] rounded-full text-xl"><PiArrowsCounterClockwiseFill /></div>   
                                <div className="text-lg font-medium text-darkGrey">Free Shipping & Returns</div>                             
                            </div>
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className=" lg:py-[30px] lg:px-[74px] w-full flex flex-col justify-center gap-16 items-start ">
                        {/* Path div */}
                        <div className="text-mediumGrey mt-5 text-lg font-medium capitalize">shop > {type} </div>
                        <h2 className="font-bold text-xl md:text-3xl text-darkGrey">{productData.name}</h2>
                        {/* Reviews stuff */}
                        <div className="flex justify-center md:flex-nowrap flex-wrap items-start gap-6">
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                    readOnly
                                />
                            </div> 
                            <span className="text-mediumGrey text-lg">3.5</span>
                            <div className="flex justify-center items-center gap-4 text-lg text-mediumGrey">
                                <div className="text-[22px]"><BiMessageDetail /></div>
                                <span>120 comments</span>
                            </div>

                        </div>
                        <div>
                            {/* Size */}
                            <div className="flex flex-col gap-6 justify-center items-start">
                                <div className="font-semibold text-darkGrey text-base md:text-lg flex justify-center items-center gap-5">
                                    Select Size
                                    <span className="text-mediumGrey font-medium">Size Guide</span>
                                    <span className="text-mediumGrey text-3xl">
                                        <IoIosArrowRoundForward />
                                    </span>
                                </div>
                                <div className="flex justify-center md:flex-nowrap flex-wrap gap-6 items-center">
                                    {sizes.map((size) => (
                                        <div
                                            key={size}
                                            onClick={() => handleSizeClick(size)}
                                            className={`w-[38px] h-[38px] rounded-xl border-solid border-[#BEBCBD] border-[1px] flex justify-center items-center font-medium cursor-pointer duration-200 transition-all ${
                                                selectedSize === size ? 'bg-darkGrey text-white' : 'hover:bg-darkGrey hover:text-white'
                                            }`}
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colors Available */}
                            <div className="flex flex-col justify-center items-start gap-[25px]">
                                <h3 className="font-semibold text-lg">Colors Available</h3>
                                <div className="flex justify-center items-center gap-5">
                                    {colors.map((color) => (
                                        <div
                                            key={color.color}
                                            onClick={() => handleColorClick(color)}
                                            className={`w-[35px] h-[35px] flex justify-center items-center rounded-full cursor-pointer ${
                                                selectedColor?.color === color.color ? 'border-2 border-black' : ''
                                            }`}
                                        >
                                            <div
                                                className="w-[25px] h-[25px] rounded-full"
                                                style={{ backgroundColor: color.hex }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Show Selected */}
                            <div className="mt-5">
                                <p>Selected Size: {selectedSize ? selectedSize : 'None'}</p>
                                <p>Selected Color: {selectedColor ? selectedColor.color : 'None'}</p>
                            </div>
                        </div>
                        {/* Add to cart + Price */}
                        <div className="flex justify-center md:flex-nowrap flex-wrap items-center gap-6 mb-5">
                            <div onClick={addToCart}><PrimaryButton shopIcon ={true} title='Add to cart'/></div>
                            <div className="text-darkGrey rounded-xl border-solid border-darkGrey px-10 py-3 border-[1px] flex justify-center items-center font-bold">${productData.price}</div>
                        </div>
                        
                    </div>
                    </div>
                    {/* Product Description */}
                    <div>
                        <SectionHeading title='Product Description'/>
                        <div className="flex justify-center lg:flex-nowrap flex-wrap items-center gap-8 ">
                            <p className="text-base leading-8 text-mediumGrey w-full lg:w-[50%]">{productData.description}</p>
                            <div className="grid grid-cols-3 grid-rows-2 rounded-xl bg-[#F6F6F6]">
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-r-[1px] border-b-[1px] border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Fabric</h4>
                                    <h3 className="text-darkGrey font-medium">Bio-washed Cotton</h3>
                                </div>
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-r-[1px] border-b-[1px] border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Pattern</h4>
                                    <h3 className="text-darkGrey font-medium">Printed</h3>
                                </div>
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-b-[1px] border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Fit</h4>
                                    <h3 className="text-darkGrey font-medium">Regular</h3>
                                </div>
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-r-[1px] border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Neck</h4>
                                    <h3 className="text-darkGrey font-medium">Round Neck</h3>
                                </div>
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-r-[1px] border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Sleeve</h4>
                                    <h3 className="text-darkGrey font-medium">Half Sleeves</h3>
                                </div>
                                <div className="flex justify-center items-start flex-col px-12 py-6 border-solid border-[#BEBCBD]">
                                    <h4 className="font-normal text-mediumGrey">Style</h4>
                                    <h3 className="text-darkGrey font-medium">Casual Wear</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Similar Products */}
                    <div className="my-20">
                        <SectionHeading title='Similar Products'/>
                        {/* Product List */}
                        <div className="w-full flex justify-center items-start flex-wrap gap-x-5 gap-y-10 px-1">
                        {
                            similarProducts ? (
                            similarProducts.map((product, index) => (
                                <Link to={`/shop/${type}/${product.id}`} state={{type: type}} key={product.id} className="cursor-pointer flex flex-col w-[270px] justify-center items-start gap-6 relative transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg rounded-xl pb-4">
                                <div className="w-full rounded-xl overflow-hidden">
                                    <img className="w-[270px] h-[370px]" src={product.images[0]} alt={product.name} />
                                </div>
                                <div className="flex justify-between items-center w-full px-3">
                                    {/* Text */}
                                    <div className="">
                                    <h4 className="font-semibold text-base w-full text-start">{product.name}</h4>
                                    </div>
                                    {/* Price */}
                                    <div className="text-sm py-[10px] px-4 bg-[#F6F6F6] text-darkGrey rounded-lg font-bold">
                                    ${product.price}
                                    </div>
                                </div>
                                {/* Add to cart */}
                                {/* <Link to={`/shop/women/${product.id}`} className='flex justify-center items-center w-full'>
                                    <div className="cursor-pointer px-3 font-medium font-open text-lg flex justify-center gap-3 items-center rounded-[8px] text-white w-[156px] h-[54px] transition-all duration-300 bg-aztecPurple hover:bg-[#6620C1] hover:shadow-md">
                                    <div className='w-[20px] h-[20px]'><FiShoppingCart className="text-white font-bold text-lg" /></div>
                                    <span className='capitalize text-base font-semibold'>add to cart</span>
                                    </div>
                                </Link> */}
                                {/* Favorite Button */}
                                <div
                                    className={`bg-white w-8 h-8 rounded-full flex justify-center items-center absolute top-5 right-3 transition-all duration-200 hover:bg-aztecPurple cursor-pointer`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    handleFavorite(product.id);
                                    }}
                                >
                                    <div className="w-full h-full flex justify-center items-center text-darkGrey transition-all duration-200 hover:text-white">
                                    <FaRegHeart/>
                                    </div>
                                </div>
                                </Link>
                            ))
                            ) : (
                            <div className=' flex justify-center flex-col items-start gap-10 w-full'>

                                <div className='flex flex-wrap items-center justify-center gap-5 w-full'>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        </div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center justify-center gap-5 w-full'>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        </div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center justify-center gap-5 w-full'>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        </div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center justify-center gap-5 w-full'>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                        </div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                    {/* Skeleton */}
                                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                
                                
                            </div>
                            )
                        }
                        </div>
                    </div>
                
            </div>
        }
        <Footer/>
    </div>
  )
}

export default ProductDetails
