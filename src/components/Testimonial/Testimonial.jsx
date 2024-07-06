import SectionHeading from "../ui/SectionHeading"
// Import Images
import imgOne from '../../images/Testimonial/Rectangle 1.png'
import imgTwo from '../../images/Testimonial/Rectangle 2.png'
import imgThree from '../../images/Testimonial/Rectangle 3.png'
import Rating from '@mui/material/Rating';
import { styled } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './testiStyles.css'

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Testimonial = () => {

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#EDD146',
        },
      });

  return (
    <section className="container mx-auto px-10 font-open mb-[100px]">
        <SectionHeading title='Feedback'/>
        <Swiper pagination={true} modules={[Autoplay,Pagination]} autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} className="testimonialSwiper py-10">
            <SwiperSlide>
                {/* Testimonial Cards */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-10">
                    {/* First Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full w-full">
                            <div><img src={imgOne} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Floyd Miles</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Second Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgTwo} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Ronald Richards</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Third Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgThree} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Savannah Nguyen</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    
                </div>
            </SwiperSlide>
            <SwiperSlide>
                {/* Testimonial Cards */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-10">
                    {/* First Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full w-full">
                            <div><img src={imgOne} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Floyd Miles</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Second Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgTwo} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Ronald Richards</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Third Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgThree} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Savannah Nguyen</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    
                </div>
            </SwiperSlide>
            <SwiperSlide>
                {/* Testimonial Cards */}
                <div className="flex  flex-wrap lg:flex-nowrap justify-center items-center gap-10">
                    {/* First Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full w-full">
                            <div><img src={imgOne} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Floyd Miles</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Second Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgTwo} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Ronald Richards</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    {/* Third Card */}
                    <div className="rounded-lg border-solid border-[#BEBCBD] border-[2px] p-6 flex flex-col justify-center gap-5 items-start">
                        {/* Image and Stars */}
                        <div className="flex justify-between items-center w-full">
                            <div><img src={imgThree} alt="" /></div>
                            {/* Rating */}
                            <div>
                                <StyledRating
                                    readOnly
                                    name="customized-color"
                                    defaultValue={3.5}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={0.5}
                                />
                            </div> 
                        </div>
                        <h3 className="text-darkGrey font-bold text-[22px]">Savannah Nguyen</h3>
                        <p className="text-[#807D7E] font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur obcaecati iusto, pariatur saepe quas quasi odit quod sed numquam id animi modi aliquid omnis ab. Molestias nostrum cumque distinctio tenetur.
                        </p>
                    </div>
                    
                </div>
            </SwiperSlide>
        </Swiper>
        
    </section>
  )
}

export default Testimonial
