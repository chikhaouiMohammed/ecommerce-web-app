import firstImg from '../../images/Deals/unsplash_Qyc13QBGaM4.jpg'
import secondImg from '../../images/Deals/unsplash_Qyc13QBGaM4 (1).jpg'
import './style.css'

const Deals = () => {

    


  return (
    <section className='font-open container mx-auto px-10 mt-[130px] mb-[100px] flex md:flex-nowrap flex-wrap justify-center gap-[30px] items-center'>
        {/* First Deal */}
        <div className=' text-white overflow-hidden rounded-xl relative h-fit w-fit transition-all duration-300 cursor-pointer hover:scale-105'>
            <img className='w-full h-full ' src={firstImg} alt="" />
            <div className='absolute top-[20%] left-[10%] flex flex-col justify-center items-start text-white'>
                <h3 className='font-extrabold text-lg lg:mb-[25px]'>Low Price</h3>
                <h2 className='lg:text-[34px] text-xl font-extrabold'>High Coziness</h2>
                <h4 className='font-medium text-base'>UPTO 50% OFF</h4>
                <a className='font-extrabold text-lg mt-10 underline cursor-pointer'>Explore Items</a>
            </div>
        </div>
        {/* Second Deal */}
        <div className=' text-white overflow-hidden rounded-xl relative h-fit w-fit transition-all duration-300 cursor-pointer hover:scale-105'>
            <img className='w-full h-full ' src={secondImg} alt="" />
            <div className='absolute top-[20%] left-[10%] flex flex-col justify-center items-start text-white'>
                <h3 className='font-extrabold text-lg lg:mb-[25px]'>Beyoung Presents</h3>
                <h2 className='lg:text-[34px] text-xl font-extrabold'>Breezy Summer Style</h2>
                <h4 className='font-medium text-base'>UPTO 50% OFF</h4>
                <a className='font-extrabold text-lg mt-10 underline cursor-pointer'>Explore Items</a>
            </div>
        </div>
        
        
    </section>
  )
}

export default Deals
