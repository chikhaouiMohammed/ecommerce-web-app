import Header from "../components/Header/Header"
import image from '../images/emailVerification/bert-b-rhNff6hB41s-unsplash 1.png'

const VerifyEmail = () => {
  return (
    <section className=' font-open'>
        {/* Nav Bar */}
        <Header/>
        {/* Sign Up Content */}
        <div className='flex justify-center items-start w-full h-full pt-20 lg:py-0'>
            {/* Img */}
            <div className='md:w-[50%] mt-16 w-0 flex-shrink-0'>
                <img className='w-full' src={image} alt="" />
            </div>
            {/* Content */}
            <div className="py-32 px-20 w-full">
                <h2 className="text-[34px] text-[#333333] mb-7">Check Your Email</h2>
                <p className="text-[#666666]">please check you email inbox and click on the link</p>
            </div>
            
        </div>
    </section>
  )
}

export default VerifyEmail
