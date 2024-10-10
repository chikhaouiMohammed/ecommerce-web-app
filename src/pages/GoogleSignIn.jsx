import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import googleImg from '../images/Login/icons8-google-48.png';
import { auth, db } from '../firebase';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {

  const navigate = useNavigate()

  const handleGoogleSigning = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Use redirect for all devices
      await signInWithRedirect(auth, provider);

      // Listen for the redirect result
      auth.getRedirectResult().then((result) => {
        if (result.user) {
          const user = result.user;
          
          // Store user data in Firestore
          setDoc(doc(db, "users", user.uid), {
            email: user.email,
            fullName: user.displayName,
            photo: user.photoURL,
            signInMethod: 'Google',
          })
          .then(() => {
            toast.success('Registration successful!');
            navigate('/user-profile');
          })
          .catch((error) => {
            toast.error(error.message);
          });
        }
      }).catch((error) => {
        toast.error(error.message);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
