import { IoClose } from "react-icons/io5"




const OrderDetails = () => {
  return (
    <div className="font-open w-full flex flex-col justify-center gap-12 items-start">
            {/* Order Details */}
            <div className="rounded-lg bg-[#F6F6F6] px-12 py-7 w-full">
                <h4 className="font-semibold textarea-secondary text-xl mb-4">Order no: #123456789</h4>
                <div className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-start flex-col gap-2 ">
                        <div className="font-semibold text-mediumGrey text-sm">Order Date: <span className="text-[#BEBCBD]">2 June 2023 2:40 PM</span></div>
                        <div className="font-semibold text-mediumGrey text-sm">Estimated Delivery Date: <span className="text-[#BEBCBD]">8 June 2023</span></div>
                    </div>
                    <div className="flex justify-center items-start flex-col gap-2 ">
                        <div className="font-semibold text-mediumGrey text-sm">Total:<span className="text-darkGrey">$143.00</span></div>
                    </div>
                </div>
            </div>
            {/* TimeLine */}
            <div className="w-full flex justify-center items-center">
                <ul className="timeline w-full">
                    <li className="w-[25%]">
                        <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                        </svg>
                        </div>
                        <div className="timeline-end timeline-box">Order Placed</div>
                        <hr className="bg-primary"/>
                    </li>
                    <li className="w-[25%]">
                        <hr className="bg-primary"/>
                        <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                        </svg>
                        </div>
                        <div className="timeline-end timeline-box">Inprogress</div>
                        <hr className="bg-primary"/>
                    </li>
                    <li className="w-[25%]">
                        <hr className="bg-primary"/>
                        <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                        </svg>
                        </div>
                        <div className="timeline-end timeline-box">shipped</div>
                        <hr />
                    </li>
                    <li className="w-[25%]">
                        <hr />
                        <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                        </svg>
                        </div>
                        <div className="timeline-end timeline-box">Delivered</div>
                    </li>
                </ul>
            </div>
            {/* Verifies order card */}
            <div className="bg-[#F6F6F6] rounded-lg flex justify-normal w-full items-center px-7 py-6 text-base font-semibold">
                <div className="text-mediumGrey">8 june 2023 3:40 PM</div>
                <div className="text-darkGrey">Your order has been successfully verified</div>
            </div>
            {/* Order Products */}
            <div className="w-full flex flex-col justify-center items-center px-12 py-11 bg-[#F6F6F6] rounded-lg">
                {/* Order Product */}
                <div className="w-full flex justify-center gap-9 items-center">
                    {/* product image */}
                    <div className="w-[102px] h-[102px] rounded-md overflow-hidden"><img className="w-full h-full" src="" alt="" /></div>
                    {/* Product Details */}
                    <div className="w-full flex justify-between items-cente font-bold text-lg text-darkGrey">
                        <h4>Printed white cote</h4>
                        <div>Qty:<span className="text-mediumGrey">1</span></div>
                        <div>$29.00</div>
                        <div className="cursor-pointer"><IoClose className="text-xl" /></div>
                    </div>
                </div>
                <div className="w-full h-[0.09px] bg-[#BEBCBD] my-8"></div>
                {/* Order Product */}
                <div className="w-full flex justify-center gap-9 items-center">
                    {/* product image */}
                    <div className="w-[102px] h-[102px] rounded-md overflow-hidden"><img className="w-full h-full" src="" alt="" /></div>
                    {/* Product Details */}
                    <div className="w-full flex justify-between items-cente font-bold text-lg text-darkGrey">
                        <h4>Printed white cote</h4>
                        <div>Qty:<span className="text-mediumGrey">1</span></div>
                        <div>$29.00</div>
                        <div className="cursor-pointer"><IoClose className="text-xl" /></div>
                    </div>
                </div>
                <div className="w-full h-[0.09px] bg-[#BEBCBD] my-8"></div>
                {/* Order Product */}
                <div className="w-full flex justify-center gap-9 items-center">
                    {/* product image */}
                    <div className="w-[102px] h-[102px] rounded-md overflow-hidden"><img className="w-full h-full" src="" alt="" /></div>
                    {/* Product Details */}
                    <div className="w-full flex justify-between items-cente font-bold text-lg text-darkGrey">
                        <h4>Printed white cote</h4>
                        <div>Qty:<span className="text-mediumGrey">1</span></div>
                        <div>$29.00</div>
                        <div className="cursor-pointer"><IoClose className="text-xl" /></div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default OrderDetails
