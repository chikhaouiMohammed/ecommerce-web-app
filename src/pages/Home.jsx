import BigSaving from "../components/BigSaving/BigSaving"
import CategoriesForMan from "../components/Categories/CategoriesForMan"
import CategoriesForWomen from "../components/Categories/CategoriesForWomen"
import Deals from "../components/Deals/Deals"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import LightSection from "../components/InTheLimeLight/LightSection"
import NewArrivals from "../components/NewArrivals/NewArrivals"
import Testimonial from "../components/Testimonial/Testimonial"
import TopBrandsDeal from "../components/TopBrands/TopBrandsDeal"


const Home = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <Deals/>
        <NewArrivals/>
        <BigSaving/>
        <CategoriesForMan/>
        <CategoriesForWomen/>
        <TopBrandsDeal/>
        <LightSection/>
        <Testimonial/>
        <Footer/>
    </>
  )
}

export default Home
