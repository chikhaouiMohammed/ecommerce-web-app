// Import Images 
import brandOne from '../../images/TopBrands/image 1.png'
import brandTwo from '../../images/TopBrands/image 2.png'
import brandThree from '../../images/TopBrands/image 3.png'
import brandFour from '../../images/TopBrands/image 4.png'
import brandFive from '../../images/TopBrands/image 5.png'


const TopBrandsDeal = () => {
  return (
    <section className='container mx-auto px-10 pt-10 pb-14 mb-[75px] font-open'>
        <div className='bg-darkGrey text-white rounded-xl px-3 py-[50px] flex flex-col justify-center items-center'>
            <h2 className='mb-[26px] text-[50px] font-extrabold'>Top Brands Deal</h2>
            <div className='mb-[67px] w-fit'>Up To <span className='text-[#FBD103]'>60%</span> off on brands</div>
            {/* Brands List */}
            <div className='flex flex-wrap justify-center gap-5 items-center'>
                <div className='px-4 py-5 bg-white w-[177px] h-[85px] rounded-lg flex justify-center items-center'><img className='w-[90%] h-full' src={brandOne} alt="" /></div>
                <div className='px-4 py-5 bg-white w-[177px] h-[85px] rounded-lg flex justify-center items-center'><img className='w-[90%] h-full' src={brandTwo} alt="" /></div>
                <div className='px-4 py-5 bg-white w-[177px] h-[85px] rounded-lg flex justify-center items-center'><img className='w-[90%] h-full' src={brandThree} alt="" /></div>
                <div className='px-4 py-5 bg-white w-[177px] h-[85px] rounded-lg flex justify-center items-center'><img className='w-[90%] h-full' src={brandFour} alt="" /></div>
                <div className='px-4 py-5 bg-white w-[177px] h-[85px] rounded-lg flex justify-center items-center'><img className='w-[90%] h-full' src={brandFive} alt="" /></div>
            </div>
        </div>
    </section>
  )
}

export default TopBrandsDeal
