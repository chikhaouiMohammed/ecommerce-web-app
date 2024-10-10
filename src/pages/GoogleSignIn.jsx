import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithPopup } from 'firebase/auth';
import googleImg from '../images/Login/icons8-google-48.png';
import { auth, db } from '../firebase';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      // Set persistence to local
      await setPersistence(auth, browserLocalPersistence);
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
  
      // The signed-in user info
      const user = result.user;
      console.log('User signed in:', user);
      
      // Handle successful sign-in, navigate to profile or store user info
      // Example: navigate("/user-profile");
  
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  // Handle redirect result when the component mounts
  React.useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        console.log("Google Sign-In Redirect Result:", result);
  
        if (result?.user) {
          const user = result.user;
  
          // Store user data in Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            fullName: user.displayName,
            photo: user.photoURL,
            signInMethod: 'Google',
          });
  
          toast.success('Registration successful!');
          navigate('/user-profile');
        } else {
          console.log("No user returned from Google Sign-In.");
        }
      } catch (error) {
        toast.error("Error during sign-in: " + error.message);
        console.log("Error during sign-in:", error);
      }
    };
  
    checkRedirectResult();
  }, [navigate]);
  

  return (
    <div
      onClick={handleGoogleSignIn}
      className='transition-all duration-300 hover:bg-aztecPurple hover:text-white text-aztecPurple mb-20 flex justify-center items-center gap-3 w-full border-darkGrey border-solid border-[1px] py-4 rounded-lg cursor-pointer'
    >
      <div className='w-[30px] h-[30px]'>
        <img className='w-full h-full' src={googleImg} alt="Google Icon" />
      </div>
      <span className='font-medium md:text-[22px] text-md'>Continue With Google</span>
    </div>
  );
};

export default GoogleSignIn;
