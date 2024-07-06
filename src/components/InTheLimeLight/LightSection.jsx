import SectionHeading from "../ui/SectionHeading";
// Import Images
import imgOne from '../../images/Lights/Rectangle 1.png';
import imgTwo from '../../images/Lights/Rectangle 2.png';
import imgThree from '../../images/Lights/Rectangle 3.png';
import imgFour from '../../images/Lights/Rectangle 4.png';
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const LightSection = () => {
  const [favoriteStates, setFavoriteStates] = useState([false, false, false, false]);

  const toggleFavorite = (index) => {
    const newFavoriteStates = [...favoriteStates];
    newFavoriteStates[index] = !newFavoriteStates[index];
    setFavoriteStates(newFavoriteStates);
  };

  const cardData = [
    { img: imgOne, title: "Black Sweatshirt with...", price: "123.0$" },
    { img: imgTwo, title: "line Pattern Black H...", price: "37.0$" },
    { img: imgThree, title: "Black shorts are comfortable...", price: "37.0$" },
    { img: imgFour, title: "Levender Hoodie with...", price: "119.0$" }
  ];

  return (
    <section className="container mx-auto px-10 font-open mb-[100px]">
      <SectionHeading title='In The Limelight' />
      {/* Card List */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-10">
        {cardData.map((card, index) => (
          <div key={index} className="flex flex-col w-[282px] justify-center items-start gap-6 relative transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl pb-4">
            <div className="w-full rounded-xl overflow-hidden">
              <img className="w-full h-full" src={card.img} alt="" />
            </div>
            <div className="flex justify-between items-center w-full">
              {/* Text */}
              <div className="flex flex-col justify-center items-start">
                <h4 className="font-bold text-xl w-full text-start">{card.title}</h4>
                <span className="font-medium text-[#7F7F7F]">Explore Now!</span>
              </div>
              {/* Price */}
              <div className="text-sm py-[10px] px-4 bg-[#F6F6F6] text-darkGrey rounded-lg font-bold">
                {card.price}
              </div>
            </div>
            {/* Favorite Button */}
            <div
              className={`${favoriteStates[index] ? 'bg-aztecPurple' : 'bg-white'} w-8 h-8 rounded-full flex justify-center items-center absolute top-5 right-3 transition-all duration-200 hover:bg-aztecPurple cursor-pointer`}
              onClick={() => toggleFavorite(index)}
            >
              <div className="w-full h-full flex justify-center items-center text-darkGrey transition-all duration-200 hover:text-white">
                <FaRegHeart />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LightSection;
