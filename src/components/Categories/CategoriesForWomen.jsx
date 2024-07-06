import { IoIosArrowRoundForward } from "react-icons/io"
import SectionHeading from "../ui/SectionHeading"
// Import images
import imgOne from '../../images/Categories/For Women/Rectangle 1.png'
import imgTwo from '../../images/Categories/For Women/Rectangle 2.png'
import imgThree from '../../images/Categories/For Women/Rectangle 3.png'
import imgFour from '../../images/Categories/For Women/Rectangle 4.png'



const CategoriesForWomen = () => {
  return (
    <section id="women" className="container mx-auto px-10 font-open mb-[100px]">
        <SectionHeading title='Categories For Women'/>
        {/* Card List */}
        <div className="flex flex-wrap justify-center items-center gap-7">
            {/* First Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgOne} alt="" /></div>
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
            {/* Second Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgTwo} alt="" /></div>
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
            {/* Third Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgThree} alt="" /></div>
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
            {/* Fourth Card */}
            <div className="flex flex-col justify-center items-start gap-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgFour} alt="" /></div>
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
        </div>
    </section>
  )
}

export default CategoriesForWomen
