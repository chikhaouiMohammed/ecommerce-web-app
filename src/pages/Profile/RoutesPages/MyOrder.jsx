import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { format } from 'date-fns';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const userId = auth.currentUser.uid;
            const ordersRef = collection(db, `myOrder/${userId}/orders`);
            const q = query(ordersRef);

            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Check if `createdAt` and `estimatedDeliveryDate` exist and are Timestamp objects
                const createdAt = data.createdAt?.toDate();
                const estimatedDeliveryDate = data.estimatedDeliveryDate?.toDate();
            
                return {
                    id: doc.id,
                    orderNumber: data.orderNumber,
                    createdAt: createdAt ? format(createdAt, "MMMM dd, yyyy HH:mm") : "", // Handle if `createdAt` is undefined
                    estimatedDeliveryDate: estimatedDeliveryDate ? format(estimatedDeliveryDate, "MMMM dd, yyyy") : "", // Handle if `estimatedDeliveryDate` is undefined
                    status: data.status,
                    paymentMethod: data.paymentMethod,
                    products: data.products // Assuming products are correctly formatted already
                };
            });
            
            
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Handle error fetching orders
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    console.log(orders); // Verify orders in console

    return (
        <div className='font-open flex flex-col justify-center items-start w-full'>
            {/* Map through orders to display */}
            {orders.map(order => (
                <div key={order.id} className="w-full flex flex-col justify-center items-center gap-7">
                    {/* Order Details */}
                    <div className="rounded-lg bg-[#F6F6F6] px-12 py-7 w-full">
                        <h4 className="font-semibold textarea-secondary text-xl mb-4">Order no: #{order.orderNumber}</h4>
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-center items-start flex-col gap-2 ">
                                <div className="font-semibold text-mediumGrey text-sm">Order Date: <span className="text-[#BEBCBD]">{order.createdAt}</span></div>
                                <div className="font-semibold text-mediumGrey text-sm">Estimated Delivery Date: <span className="text-[#BEBCBD]">{order.estimatedDeliveryDate}</span></div>
                            </div>
                            <div className="flex justify-center items-start flex-col gap-2 ">
                                <div className="font-semibold text-mediumGrey text-sm">Order Status: <span className="text-[#BEBCBD]">{order.status}</span></div>
                                <div className="font-semibold text-mediumGrey text-sm">Payment Method: <span className="text-[#BEBCBD]">{order.paymentMethod}</span></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default MyOrder;
