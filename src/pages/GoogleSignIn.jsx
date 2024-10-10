import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence } from 'firebase/auth';
import googleImg from '../images/Login/icons8-google-48.png';
import { auth, db } from '../firebase';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSigning = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Set persistence to local to keep users signed in
      await setPersistence(auth, browserLocalPersistence);

      // Sign in with redirect
      await signInWithRedirect(auth, provider);
    } catch (error) {
      toast.error("Error initiating sign-in: " + error.message);
    }
  };

  // Handle redirect result when the component mounts
  React.useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
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
        }
      } catch (error) {
        toast.error("Error during sign-in: " + error.message);
      }
    };

    checkRedirectResult();
  }, [navigate]);

  return (
    <div
      onClick={handleGoogleSigning}
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
