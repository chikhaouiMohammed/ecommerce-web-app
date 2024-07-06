import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
//images
import emptyCartImg from '../images/EmptyCart/EmptyCartImg.png'
import Footer from '../components/Footer/Footer'


const EmptyCart = () => {
  return (
    <div className='font-open bg-[#F6F6F6]'>
        {/* NavBar */}
        <Header/>
        {/* Content */}
        <div className='container  mx-auto px-5 flex flex-col gap-12 justify-center items-center py-28'>
            {/* Image */}
            <div><img src={emptyCartImg} alt="" /></div>
            {/* Text */}
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-darkGrey font-bold text-[34px]'>Your cart is empty and sad</h2>
                <h5 className='text-mediumGrey text-base'>Add something to make it happy!</h5>
                <Link to='/' className='ml-8 btn px-12 bg-aztecPurple text-white my-12 hover:bg-purple-800 hover:text-white'>Continue Shopping</Link>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default EmptyCart
