import { useContext, useEffect, useState } from 'react';
// import images
import filterIcon from '../../images/WomenShop/filter.png';
// ... (other imports)

import { FaFilter, FaRegHeart } from 'react-icons/fa';

import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/ui/SectionHeading';
import Footer from '../../components/Footer/Footer';
import { FilterContext } from '../../context/FilterContext';
import Header from '../../components/Header/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Slider } from '@mui/material';
import { BeatLoader } from 'react-spinners';

const ManProductList = () => {
  const [products, setProducts] = useState([]);
  const [isFilter, setisFilter] = useState(false);
  const [value, setValue] = useState([0, 100]);
  const [isLoading, setIsLoading] = useState(false)
  const user = auth.currentUser;
  const { priceRange , setPriceRange } = useContext(FilterContext)

  const fetchData = async () => {
    try {
      const productsRef = collection(db, 'categories/men/products')
      const q = query(productsRef,where('price', '>=', priceRange[0]), where('price', '<=', priceRange[1]));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("No products found!");
      } else {
        const productData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  const handleFavorite = async (product) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }
  
    const wishlistRef = doc(db, 'wishlist', user.uid);
  
    try {
      const wishlistSnap = await getDoc(wishlistRef);
  
      let wishlist = [];
  
      // If the document exists, fetch the current wishlist
      if (wishlistSnap.exists()) {
        wishlist = wishlistSnap.data().products;
      }
  
      const isFavorite = wishlist.some(item => item.productId === product.id);
  
      // If product is already in the wishlist, remove it
      if (isFavorite) {
        wishlist = wishlist.filter(item => item.productId !== product.id);
        await setDoc(wishlistRef, { products: wishlist }, { merge: true });
        toast.success("Removed from wishlist");
      } else {
        // If product is not in the wishlist, add it
        await setDoc(wishlistRef, {
          products: arrayUnion({
            productId: product.id,
            productName: product.name,
            productImage: product.images[0],
            productPrice: product.price,
          })
        }, { merge: true });
  
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist: ", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [priceRange]);
  useEffect(() => {
    handleFilterChange()
  }, [])

  const valuetext = (value) => `${value}$`;
  

  const handleChange = (event, newValue) => {
    setPriceRange(newValue)
    setValue(newValue);
};
  
  const handleFilterChange = () => {
      setIsLoading(true); // Start loading
      setTimeout(() => {
          console.log('color changed');
          setIsLoading(false); // Stop loading after async operation
      }, 1000); // Simulating a 1-second delay
  };
  
  const handleChangedSize = () => {
      setIsLoading(true)
     setTimeout(() => {
       console.log('color changed')
     }, 1000);
      setIsLoading(false)
  }
  

  const renderColorOptions = () => colorOptions.map(({ color, label }, index) => (
      <Box key={index} className=' flex flex-col cursor-pointer justify-center items-center gap-[18px]'>
          <Box  className='w-10 h-10 rounded-xl' sx={{ backgroundColor: color }}></Box>
          <Box>{label}</Box>
      </Box>
  ));

  const renderSizeOptions = () => sizeOptions.map((size, index) => (
      <Box onClick={handleChangedSize} key={index} className='w-[60px] text-center text-darkGrey font-semibold text-base py-2 px-5 rounded-lg transition-all duration-200 hover:bg-darkGrey cursor-pointer hover:text-white uppercase border-solid border-[#BEBCBD] border-[1px]'>
          {size}
      </Box>
  ));

  

  const priceSection = (value, handleChange, valuetext) => (
    <>
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                style={{color:'#8A33FD'}}
            />
        </Box>
        <Box className='w-full flex justify-around items-center'>
            <Box className='border-solid border-[#BEBCBD] border-[1px] rounded-lg text-center py-2 px-7 text-darkGrey text-base font-medium'>$ {value[0]}</Box>
            <Box className='border-solid border-[#BEBCBD] border-[1px] rounded-lg text-center py-2 px-7 text-darkGrey text-base font-medium'>$ {value[1]}</Box>
        </Box>
    </>
);

const colorOptions = [
    { color: '#8434E1', label: 'Purple' },
    { color: 'black', label: 'Black' },
    { color: '#F35528', label: 'Red' },
    { color: '#F16F2B', label: 'Orange' },
    { color: '#345EFF', label: 'Navy' },
    { color: 'white', label: 'White' },
    { color: '#D67E3B', label: 'Broom' },
    { color: '#48BC4E', label: 'Green' },
    { color: '#FDC761', label: 'Yellow' },
    { color: '#E4E5E8', label: 'Grey' },
    { color: '#E08D9D', label: 'Pink' },
    { color: '#3FDEFF', label: 'Blue' },
];

const sizeOptions = ['xxs', 'xl', 'xs', 's', 'm', 'l', 'xxl', '3xl', '4xl'];


  return (
    <section className='font-open relative'>
      {!isLoading ? (
        <div>
                      {/* NavBar */}
                  <Header/>

            {/* Page Heading */}
            <div className="relative h-[190px] flex justify-center items-center pt-20">
              <h1 className="text-2xl text-center text-darkGrey font-openSans font-extrabold">Man s Clothing</h1>
            </div>
            {/* Filter Button */}
            <div  className=' px-10 block lg:hidden'>
              <div onClick={() => setisFilter(!isFilter)} className="cursor-pointer px-3 font-medium font-open text-lg flex justify-center gap-3 items-center rounded-[8px] text-white w-[156px] h-[54px] transition-all duration-300 bg-aztecPurple hover:bg-[#6620C1] hover:shadow-md">
                <span className='capitalize text-base font-semibold'>{isFilter ? 'Hide Filter' : 'Show Filter'}</span> 
                <div className='w-[20px] h-[20px]'><FaFilter className="text-white font-bold text-lg" /></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex justify-between mt-5 mb-5  container mx-auto">

            
              {/* Left Sidebar */}
              {/* Left Sidebar */}
              <aside className={`lg:flex-shrink-0 absolute lg:block lg:static left-0   ${ isFilter ? 'block ' : 'hidden' } md:w-[50%] w-full lg:w-[32%]  z-20 px-5 transition-all duration-200`}>
                  <div className="bg-white rounded-lg p-3 drop-shadow-xl ">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl text-darkGrey font-semibold">Filter</h2>
                      <img src={filterIcon} alt="Filter Icon" className="h-6" />
                    </div>
                    <div className="h-0.5 w-full bg-lightGrey" />
                    <div>
                    <Box className='px-3 w-full font-open'>
                                    <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Price</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className='text-darkGrey'>
                                            {priceSection(value, handleChange, valuetext)}
                                        </AccordionDetails>
                                    </Accordion>
                    
                                    <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Colors</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='py-10 text-mediumGrey text-sm font-semibold flex flex-col justify-center items-center gap-5'>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderColorOptions().slice(0, 4)}</Box>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderColorOptions().slice(4, 8)}</Box>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderColorOptions().slice(8, 12)}</Box>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                    
                                    <Accordion defaultExpanded style={{ boxShadow: 'none' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography className='font-open' style={{ fontWeight: 600, fontSize: '22px', color: '#807D7E' }}>Size</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box className='py-10 text-mediumGrey text-sm font-semibold flex flex-col justify-center items-center gap-5'>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderSizeOptions().slice(0, 3)}</Box>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderSizeOptions().slice(3, 6)}</Box>
                                                <Box onClick={handleFilterChange} className='w-full flex justify-between items-center'>{renderSizeOptions().slice(6, 9)}</Box>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                    
                                    
                    </Box>
                    </div>
                  </div>
                </aside>
              {/* Product List */}
              <div className="w-full flex justify-center items-start flex-wrap gap-x-5 gap-y-10 px-1">
                {
                  products.length ? (
                    products.map((product) => (
                      <Link to={`/shop/women/${product.id}`} state={{type: 'men'}} key={product.id} className="cursor-pointer flex flex-col w-[270px] justify-center items-start gap-6 relative transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg rounded-xl pb-4">
                        <div className="w-full rounded-xl overflow-hidden">
                          <img className="w-[270px] h-[370px]" src={product.images[0]} alt={product.title} />
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
                        
                        {/* Favorite Button */}
                        <div
                          className={`z-30 bg-white w-8 h-8 rounded-full flex justify-center items-center absolute top-5 right-3 transition-all duration-200 hover:bg-aztecPurple cursor-pointer`}
                          onClick={(e) => {
                          e.preventDefault();
                          handleFavorite(product);
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
                          <div role="status" className="lg:hidden block  max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
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
                          <div role="status" className="lg:hidden block  max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
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
                          <div role="status" className="lg:hidden block  max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
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
                          <div role="status" className="lg:hidden block  max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
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
            <div className='w-full flex flex-col justify-center items-center container mx-auto my-20'>
                <SectionHeading title="Clothing For Women Online "/>
                <p className='font-medium text-base text-mediumGrey leading-10 w-full px-10'>Women's clothing encompasses a wide range of styles and options, catering to diverse tastes and occasions. From elegant dresses and sophisticated blouses to casual tees and comfy leggings, there is something for every woman. Whether dressing for work, a special event, or everyday activities, women’s fashion offers an array of choices that combine comfort, functionality, and style. With ever-evolving trends, women can express their individuality and confidence through vibrant colors, unique patterns, and versatile designs, ensuring they look and feel their best no matter the occasion.</p>
            </div>
            <Footer/>
        </div>
      ):(
        <div className="flex justify-center items-center h-[35rem]">
            <BeatLoader color="#3498db" />
          </div>
      )}
    </section>
  );
};

export default ManProductList;
