import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import emptyWishListImg from "../../../images/WishList/emptyWishList.png";
import toast from "react-hot-toast";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const wishlistRef = doc(db, "wishlist", user.uid);
        const wishlistSnap = await getDoc(wishlistRef);

        if (wishlistSnap.exists()) {
          setWishlist(wishlistSnap.data().products);
        } else {
          setWishlist([]);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (productId) => {
    const updatedWishlist = wishlist.filter(product => product.productId !== productId);
    setWishlist(updatedWishlist);

    const wishlistRef = doc(db, "wishlist", user.uid);
    await updateDoc(wishlistRef, { products: updatedWishlist });
  };

  const handleAddToCart = async (product) => {
    if (user) {
      try {
        const cartRef = doc(db, "cart", user.uid);
        await setDoc(cartRef, {
          products: arrayUnion({
            id: product.productId,
            name: product.productName,
            price: product.productPrice,
            image: product.productImage
          })
        }, { merge: true });

        toast.success(`${product.productName} has been added to your cart!`);
      } catch (error) {
        toast.error("Failed to add the product to your cart. Please try again.");
      }
    }
  };

  return (
    <div className="font-open flex flex-col justify-center items-center w-full">
      {wishlist.length ? (
        wishlist.map((product) => (
          <div key={product.productId} className="w-full">
            <div className="flex justify-center gap-9 items-center w-full">
              <div className="flex justify-center items-center gap-9">
                {/* Close Icon */}
                <div className="cursor-pointer" onClick={() => handleRemoveFromWishlist(product.productId)}>
                  <IoClose className="text-xl" />
                </div>
                {/* Product Image */}
                <div className="w-[110px] h-[110px]">
                  <img className="w-full h-full" src={product.productImage} alt={product.productName} />
                </div>
              </div>
              {/* productDetails */}
              <div className="flex justify-between flex-wrap lg:flex-nowrap w-full items-center">
                <div className="flex flex-col justify-center items-start font-bold text-darkGrey md:text-base lg:text-lg">
                  <h4>{product.productName}</h4>
                  <h4>Quantity <span className="text-mediumGrey">1</span></h4>
                </div>
                <div className="text-mediumGrey text-lg font-bold">${product.productPrice}</div>
                <button
                  className="btn bg-aztecPurple text-white px-8 hover:bg-purple-800 hover:text-white"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className="w-full h-[0.09px] bg-[#BEBCBD] my-[22px]"></div>
          </div>
        ))
      ) : (
        <div className="px-28 py-20 flex flex-col justify-center items-center gap-14 shadow-lg rounded-lg">
          {/* Empty Wishlist Img  */}
          <div><img src={emptyWishListImg} alt="Empty Wishlist" /></div>
          {/* Text + Button */}
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="text-center">
              <h3 className="text-darkGrey text-[34px] font-bold">Your wishlist is empty</h3>
              <p className="text-center text-mediumGrey font-medium text-base">
                You don't have any products in the wishlist yet. You will find a lot
                of interesting products on our shop page.
              </p>
            </div>
            <button className="btn bg-aztecPurple text-white px-8 hover:bg-purple-800 hover:text-white">Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
