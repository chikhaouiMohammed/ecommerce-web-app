import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";

const ProductTable = () => {
    const [productsList, setProductsList] = useState([]);
    const [user, setUser] = useState(null); 

    const fetchData = async (currentUser) => {
        try {
            if (currentUser) {
                setUser(currentUser); // Set the user if authenticated
                const docRef = doc(db, "cart", `${currentUser.uid}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productsWithQuantity = docSnap.data().products.map((product) => ({
                        ...product,
                        quantity: 1 // Default quantity, adjust as needed
                    }));
                    setProductsList(productsWithQuantity);
                } else {
                    setProductsList([]); // Set an empty array if no products
                    toast.error("There's no products in the cart");
                }
            } else {
                setUser(null); // Clear user state if not authenticated
                setProductsList([]); // Set an empty array if not authenticated
                toast.error("Login to see the cart");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            window.location.href = '/shop/cart/empty'
        }
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        fetchData(currentUser);

        // Set up an auth state listener to handle user changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchData(user);
            } else {
                setUser(null);
                setProductsList([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleIncrement = async (index) => {
        try {
            const updatedProducts = [...productsList];
            updatedProducts[index].quantity += 1;
            setProductsList(updatedProducts);
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
            updatedProducts.splice(index, 1); // Remove the product at the given index
            setProductsList(updatedProducts);
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
                await updateDoc(docRef, {
                    products: updatedProducts
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
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleRemove(index)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-4 text-center">
                                {user ? (
                                    <p className="text-gray-500 dark:text-gray-400">No products in the cart.</p>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">Please login to see the cart.</p>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
