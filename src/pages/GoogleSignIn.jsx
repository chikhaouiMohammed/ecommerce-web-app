import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import googleImg from '../images/Login/icons8-google-48.png';
import { auth, db } from '../firebase';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

const GoogleSignIn = () => {

  const handleGoogleSigning = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Code Result.
        // You can access the user's information from result.user
        // ...
        const user = result.user;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            fullName: user.displayName,
            photo: user.photoURL,
            signInMethode: 'Google',
          });
        }
        toast.success('Registration successful!');
        window.location.href ='/user-profile'; 
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div
      onClick={handleGoogleSigning}
      className='transition-all duration-300 hover:bg-aztecPurple hover:text-white text-aztecPurple mb-20 flex justify-center items-center gap-3 w-full border-darkGrey border-solid border-[1px] py-4 rounded-lg cursor-pointer'
    >
      <div className='w-[30px] h-[30px]'>
        <img className='w-full h-full' src={googleImg} alt="" />
      </div>
      <span className='font-medium md:text-[22px] text-md'>Continue With Google</span>
    </div>
  );
};

export default GoogleSignIn;
