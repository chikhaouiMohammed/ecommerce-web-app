import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";

const ProductTable = () => {
    const [productsList, setProductsList] = useState([]);
    const [user, setUser] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0); 

    const fetchData = async (currentUser) => {
        try {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "cart", `${currentUser.uid}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productsWithQuantity = docSnap.data().products.map((product) => ({
                        ...product,
                        quantity: product.quantity || 1 // Default to 1 if quantity not set
                    }));
                    setProductsList(productsWithQuantity);
                    calculateTotalPrice(productsWithQuantity); // Calculate total price
                } else {
                    setProductsList([]);
                    setTotalPrice(0); // Reset total price
                    toast.error("There's no products in the cart");
                }
            } else {
                setUser(null);
                setProductsList([]);
                setTotalPrice(0); // Reset total price
                toast.error("Login to see the cart");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            window.location.href = '/shop/cart/empty';
        }
    };

    const calculateTotalPrice = (products) => {
        const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        setTotalPrice(total.toFixed(2)); // Set total price with two decimal places
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        fetchData(currentUser);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchData(user);
            } else {
                setUser(null);
                setProductsList([]);
                setTotalPrice(0); // Reset total price
            }
        });

        return () => unsubscribe();
    }, []);

    const handleIncrement = async (index) => {
        try {
            const updatedProducts = [...productsList];
            updatedProducts[index].quantity += 1;
            setProductsList(updatedProducts);
            calculateTotalPrice(updatedProducts); // Recalculate total price
            await updateQuantityInFirestore(updatedProducts);
        } catch (error) {
            console.error("Error incrementing quantity:", error);
            toast.error("Error updating quantity");
        }
    };

    const handleDecrement = async (index) => {
        try {
            const updatedProducts = [...productsList];
            if (updatedProducts[index].quantity > 1) {
                updatedProducts[index].quantity -= 1;
                setProductsList(updatedProducts);
                calculateTotalPrice(updatedProducts); // Recalculate total price
                await updateQuantityInFirestore(updatedProducts);
            }
        } catch (error) {
            console.error("Error decrementing quantity:", error);
            toast.error("Error updating quantity");
        }
    };

    const handleRemove = async (index) => {
        try {
            const updatedProducts = [...productsList];
            updatedProducts.splice(index, 1);
            setProductsList(updatedProducts);
            calculateTotalPrice(updatedProducts); // Recalculate total price
            await updateQuantityInFirestore(updatedProducts);
            toast.success("Product removed successfully");
        } catch (error) {
            console.error("Error removing product:", error);
            toast.error("Error removing product");
        }
    };

    const updateQuantityInFirestore = async (updatedProducts) => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const docRef = doc(db, "cart", `${currentUser.uid}`);
                // Calculate the new total price
                const newTotalPrice = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
                await updateDoc(docRef, {
                    products: updatedProducts,
                    totalPrice: newTotalPrice // Add the totalPrice field
                });
            }
        } catch (error) {
            console.error("Error updating Firestore:", error);
            toast.error("Error updating Firestore");
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-darkGrey">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user && productsList.length > 0 ? (
                        productsList.map((product, index) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.size}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <span style={{ backgroundColor: product.color.hex }} className="inline-block w-6 h-6 rounded-full" title={product.color.color}></span>
                                    <span className="h-6">{product.color.color}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => handleDecrement(index)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Decrement Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <input type="number" id={`product_${product.id}_quantity`} value={product.quantity} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                                        </div>
                                        <button onClick={() => handleIncrement(index)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                            <span className="sr-only">Increment Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16m8-8H1" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleRemove(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">Your cart is empty.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="p-4">
                <h3 className="text-lg font-semibold">Total Price: ${totalPrice}</h3>
            </div>
        </div>
    );
};

export default ProductTable;
