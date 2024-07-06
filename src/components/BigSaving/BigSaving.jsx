import SectionHeading from '../ui/SectionHeading';
import firstImg from '../../images/BigSavingZone/Rectangle 74.png';
import secondImg from '../../images/BigSavingZone/Rectangle 75.png';
import thirdImg from '../../images/BigSavingZone/Rectangle 76.png';
import fourthImg from '../../images/BigSavingZone/Rectangle 77.png';
import fifthImg from '../../images/BigSavingZone/Rectangle 78.png';
import arrow from '../../images/BigSavingZone/arrow.png';
import darkArrow from '../../images/BigSavingZone/darkArrow.png';
import flowersImg from '../../images/BigSavingZone/unsplash_bBiuSdck8tU.png'
import modelsTeamImg from '../../images/BigSavingZone/Rectangle 13.png'

const getBackgroundStyle = (url) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const BigSaving = () => {
  return (
    <section id='combos' className='container mx-auto px-10 mb-[100px] font-open'>
      <SectionHeading title='Big Saving Zone' />
      {/* Flex Cards */}
      <div className='flex flex-col justify-center items-center gap-5 mb-[100px]'>
        {/* First Row */}
        <div className='flex flex-wrap lg:flex-nowrap justify-center items-center gap-5 w-full'>
            {/* First Card */}
            <div className='text-white overflow-hidden rounded-xl pl-5 py-16 h-[393px] w-full shadow-lg' style={getBackgroundStyle(firstImg)}>
            <div className='flex flex-col justify-center items-start text-white'>
                <h2 className='text-[30px] font-bold'>Hawaiian <br /> Shirts</h2>
                <h4 className='font-semibold text-[14px]'>Dress up in summer vibe</h4>
                <h4 className='font-bold text-lg'>UPTO 50% OFF</h4>
                <div className='w-full mt-[30px] ml-12'><img className='w-fit h-full' src={arrow} alt="" /></div>
                <div className='px-[25px] py-[10px] rounded-[4px] border-white border-solid border-[1px] mt-[40px] cursor-pointer transition-all duration-200 font-medium hover:bg-aztecPurple'>Shop Now</div>
            </div>
            </div>
            {/* Second Card */}
            <div className='text-white overflow-hidden rounded-xl pr-6 py-8 flex justify-end items-center shadow-lg h-[393px] w-full' style={getBackgroundStyle(secondImg)}>
            <div className='flex flex-col justify-center items-center text-white'>
                <div className='px-[25px] py-[10px] rounded-[4px] bg-darkGrey mb-7'>Limited Stock</div>
                <h2 className='text-[30px] font-bold mb-4'>Printed <br /> T-Shirts</h2>
                <h4 className='font-semibold text-[14px]'>New Designs Every Week</h4>
                <h4 className='font-bold text-lg'>UPTO 40% OFF</h4>
                <div className='w-full flex justify-center items-center my-4'><img className='w-fit h-full' src={arrow} alt="" /></div>
                <div className='px-[25px] py-[10px] rounded-[4px] border-white border-solid border-[1px] cursor-pointer transition-all duration-200 font-medium hover:bg-aztecPurple'>Shop Now</div>
            </div>
            </div>
            {/* Third Card */}
            <div className='text-white overflow-hidden rounded-xl pr-6 shadow-lg py-8 flex justify-end items-center h-[393px] w-full' style={getBackgroundStyle(thirdImg)}>
            <div className='flex flex-col justify-center items-center text-darkGrey'>
                <h2 className='text-[30px] font-bold mb-4'>Cargo <br /> Joggers</h2>
                <h4 className='font-semibold text-[14px]'>Move with style & comfort</h4>
                <h4 className='font-bold text-lg'>UPTO 40% OFF</h4>
                <div className='w-full flex justify-center items-center my-10'><img className='w-fit h-full' src={darkArrow} alt="" /></div>
                <div className='px-[25px] py-[10px] rounded-[4px] border-darkGrey border-solid border-[1px] cursor-pointer transition-all duration-200 font-medium hover:bg-white'>Shop Now</div>
            </div>
            </div>
        </div>
        {/* Second Row */}
        <div className='flex flex-wrap lg:flex-nowrap justify-center items-center gap-5 w-full'>
            {/* Fourth Card */}
            <div className='text-white overflow-hidden rounded-xl shadow-lg pr-[120px] py-8 flex justify-end items-center h-[393px] w-full' style={getBackgroundStyle(fourthImg)}>
            <div className='flex flex-col justify-center items-center text-darkGrey'>
                <h2 className='text-[30px] font-bold mb-4'>Urban <br /> Shirts</h2>
                <h4 className='font-semibold text-[14px]'>Live in comfort</h4>
                <h4 className='font-bold text-lg'>FLAT 60% OFF</h4>
                <div className='w-full flex justify-center items-center my-10'><img className='w-fit h-full' src={darkArrow} alt="" /></div>
                <div className='px-[25px] py-[10px] rounded-[4px] border-darkGrey border-solid border-[1px] cursor-pointer transition-all duration-200 font-semibold hover:bg-white'>Shop Now</div>
            </div>
            </div>
            {/* Fifth Card */}
            <div className='text-white overflow-hidden rounded-xl shadow-lg pr-6 py-8 flex justify-end items-center h-[393px] w-full' style={getBackgroundStyle(fifthImg)}>
            <div className='flex flex-col justify-center items-center text-darkGrey'>
                <h2 className='text-[30px] font-bold mb-4'>Oversized <br /> T-Shirts</h2>
                <h4 className='font-semibold text-[14px]'>Street Style Icon</h4>
                <h4 className='font-bold text-lg'>FLAT 60% OFF</h4>
                <div className='w-full flex justify-center items-center my-10'><img className='w-fit h-full' src={darkArrow} alt="" /></div>
                <div className='px-[25px] py-[10px] rounded-[4px] border-darkGrey border-solid border-[1px] cursor-pointer transition-all duration-200 font-semibold hover:bg-white'>Shop Now</div>
            </div>
            </div>
        </div>
      </div>
      {/* Big Card */}
      <div className='flex flex-wrap lg:flex-nowrap justify-center shadow-lg items-center rounded-xl text-white overflow-hidden'>
        {/* Left Image */}
        <div className='w-full h-[640px] pl-[74px] flex flex-col justify-center gap-8 items-start ' style={getBackgroundStyle(flowersImg)}>
            <h2 className='text-[34px] uppercase font-extrabold'>we made your everyday <br /> fashion better!</h2>
            <p className='font-light w-[60%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, assumenda.</p>
            <div className='px-[25px] py-[10px] rounded-[4px] bg-white text-darkGrey mt-[40px] cursor-pointer transition-all duration-200 font-medium hover:bg-aztecPurple hover:text-white'>Shop Now</div>
        </div>
        {/* Right Image */}
        <div className='w-full h-[640px]' style={getBackgroundStyle(modelsTeamImg)}>
            <img className='w-full h-full ' src={modelsTeamImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default BigSaving;
