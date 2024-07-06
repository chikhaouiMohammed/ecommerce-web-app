// components/Hero.jsx
import React from 'react';
import { ImagesSlider } from '../ui/ImagesSlider'; // Adjust path as needed
import firstImg from '../../images/Hero/shop-hero-1-product-slide-1.jpg';
import secondImg from '../../images/Hero/portrait-handsome-confident-stylish-hipster-lambersexual-model-with-curly-hairstyle-sexy-man-dressed-jeans-jacket-fashion-male-isolated-blue-wall-studio-sunglasses-min.jpg';
import thirdImg from '../../images/Hero/portrait-handsome-smiling-stylish-hipster-lambersexual-model-sexy-modern-man-dressed-elegant-white-suit-fashion-male-with-curly-hairstyle-posing-studio-near-beige-wall-sunglasses-min.jpg'


const Hero = () => {
  const images = [firstImg, secondImg, thirdImg];

  return (
    <ImagesSlider images={images} className="relative h-[716px] w-full">
      {/* Fixed Hero Text */}
      <div className="mt-40 absolute inset-0 flex md:justify-start justify-center items-center px-48 py-[130px] text-white font-open z-50">
        <div className="flex flex-col justify-center items-start gap-9">
          <h3 className="md:text-[32px] text-2xl">T-shirt / Tops</h3>
          <h2 className="md:text-[72px] text-5xl font-bold">
            Summer <br /> Value Pack
          </h2>
          <h3 className="md:text-[32px] text-2xl">cool / colorful / comfy</h3>
          <div className="text-darkGrey font-bold text-xl md:px-[72px] px-11 py-4 bg-white rounded-lg transition-all duration-200 hover:bg-[#EDEEF2] hover:text-aztecPurple cursor-pointer">
            Shop Now
          </div>
        </div>
      </div>
    </ImagesSlider>
  );
};

export default Hero;
