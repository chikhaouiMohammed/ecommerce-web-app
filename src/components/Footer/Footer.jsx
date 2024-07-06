import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import appStoreIosStoreImg from '../../images/Footer/Frame 126.png'
import { IoIosArrowDown } from "react-icons/io"


const Footer = () => {
  return (
    

    <footer className="bg-darkGrey text-white">
        <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div>
                <h2 className="mb-6 text-lg font-bold  uppercase ">Company</h2>
                <ul className=" font-medium text-sm">
                    <li className="mb-4">
                        <a href="#" className=" hover:underline">About</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Careers</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Brand Center</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Blog</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-lg font-bold  uppercase ">Help center</h2>
                <ul className=" font-medium text-sm">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Discord Server</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Twitter</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Facebook</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-lg font-bold  uppercase ">Legal</h2>
                <ul className=" font-medium text-sm">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Licensing</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-lg font-bold  uppercase ">Download</h2>
                <ul className=" font-medium text-sm">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">iOS</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Android</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Windows</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="hover:underline">MacOS</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="px-4 py-6   md:flex md:items-center md:justify-between">
            <span className="text-sm sm:text-center">© 2024 <a href="./">Euphoria™</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                <a href="#" className="">
                    <FaFacebookF/>
                </a>
                <a href="#" className="">
                    <FaInstagram/>
                </a>
                <a href="#" className="">
                    <FaXTwitter/>
                </a>
                <a href="#" className="">
                    <FaLinkedinIn/>
                </a>
            </div>
        </div>
        </div>
    </footer>

  )
}

export default Footer
