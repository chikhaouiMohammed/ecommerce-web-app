import SectionHeading from "../ui/SectionHeading"
import imgOne from '../../images/Categories/For Men/Rectangle 1.png'
import imgTwo from '../../images/Categories/For Men/Rectangle 2.png'
import imgThree from '../../images/Categories/For Men/Rectangle 3.png'
import imgFour from '../../images/Categories/For Men/Rectangle 4.png'
import imgFive from '../../images/Categories/For Men/Rectangle 5.png'
import imgSix from '../../images/Categories/For Men/Rectangle 6.png'
import imgSeven from '../../images/Categories/For Men/Rectangle 7.png'
import imgEight from '../../images/Categories/For Men/Rectangle 8.png'
import { IoIosArrowRoundForward } from "react-icons/io"


const CategoriesForMan = () => {
  return (
    <section id="man" className='container mx-auto px-10 mb-[100px]'>
        <SectionHeading title='Categories For Men'/>
        {/* Card list */}
        <div className="flex justify-center items-center flex-wrap gap-7">   
            {/* First Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgOne} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Knitted Joggers</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Second Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgTwo} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Printed T-Shirts</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Third Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgThree} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Plain T-Shirt</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Fourth Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgFour} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Polo T-Shirt</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Fifth Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgFive} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Hoodies & Sweatshirt</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Sixth Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgSix} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Jeans</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Seven Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgSeven} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Activewear</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
            {/* Eight Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgEight} alt="" /></div>
                <div className="flex justify-between items-center w-full">
                    {/* Text */}
                    <div className="flex flex-col justify-center items-start">
                        <h4 className="font-bold text-xl w-full text-start">Boxers</h4>
                        <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
                    </div>
                    {/* Arrow */}
                    <div>
                        <IoIosArrowRoundForward className="text-4xl text-[#797979]" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CategoriesForMan
