import SectionHeading from "../ui/SectionHeading"
import imgOne from '../../images/NewArrival/photographer-white-background.png'
import imgTwo from '../../images/NewArrival/Rectangle 28.png'
import imgThree from '../../images/NewArrival/Rectangle 28 (1).png'
import imgFour from '../../images/NewArrival/Rectangle 28 (2).png'


const NewArrivals = () => {
  return (
    <section id="joggers" className="container mx-auto px-10 font-open mb-[92px]">
        <SectionHeading title='New Arrival'/>
        {/* Cards Using Swiper.js */}
        <div className="flex flex-wrap justify-center items-center gap-9">
            {/* Card */}
            <div className="flex flex-col justify-center items-center gap-8 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgOne} alt="" /></div>
                <div className="font-bold text-xl w-full text-start">Knitted Joggers</div>
            </div>
            {/* Card */}
            <div className="flex flex-col justify-center items-center gap-8 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgTwo} alt="" /></div>
                <div className="font-bold text-xl w-full text-start">Knitted Joggers</div>
            </div>
            {/* Card */}
            <div className="flex flex-col justify-center items-center gap-8 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgThree} alt="" /></div>
                <div className="font-bold text-xl w-full text-start">Knitted Joggers</div>
            </div>
            {/* Card */}
            <div className="flex flex-col justify-center items-center gap-8 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
                <div className="rounded-xl overflow-hidden"><img className="w-full h-full" src={imgFour} alt="" /></div>
                <div className="font-bold text-xl w-full text-start">Knitted Joggers</div>
            </div>
        </div>
    </section>
  )
}

export default NewArrivals
