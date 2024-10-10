import loginImg from '../../images/Login/Image.png';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';
import GoogleSignIn from '../GoogleSignIn';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Header from '../../components/Header/Header';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password === confirmedPassword && agreeToTerms) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
          await setDoc(doc(db, 'users', user.uid), {
            email: email,
            fullName: fullName,
            password: password,
            phone: phone,
            signInMethode: 'Email and password',
            isNewsLetter: subscribeNewsletter,
          });

          await sendEmailVerification(user);
          toast.success('Registration successful! Verification email sent.');
          window.location.href = '/signup/email-verification';
        }
      } else {
        if (password !== confirmedPassword) {
          toast.error('Passwords do not match. Please try again.');
        } else {
          toast.error('You must agree to the terms and conditions.');
        }
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use. Please use a different email.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="font-open">
      {/* Nav Bar */}
      <Header />
      {/* Sign Up Content */}
      <div className="flex justify-center items-start w-full h-full pt-20 lg:py-0">
        {/* Img */}
        <div className="md:w-[50%] mt-16 w-0">
          <img className="w-full" src={loginImg} alt="" />
        </div>
        {/* Sign Up Form */}
        <div className="md:w-[50%] w-full flex flex-col justify-center items-center px-10 pt-28">
          <h2 className="text-[#333333] text-[34px] text-start w-full font-bold mb-12">Sign Up</h2>
          <GoogleSignIn />
          {/* Or */}
          <div className="mb-12 w-full flex justify-center items-center gap-2">
            <div className="w-full h-[1px] bg-[#666666]"></div>
            <div className="font-normal text-[#666666]">OR</div>
            <div className="w-full h-[1px] bg-[#666666]"></div>
          </div>
          <form onSubmit={handleSignUp} className="w-full flex flex-col justify-center items-start gap-7 py-10">
            <label className="w-full input input-bordered flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                required
                className="input grow border-none placeholder:text-darkGrey outline-none focus:border-none"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

            <label className="w-full input input-bordered flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
              <BsFillTelephoneFill className="text-mediumGrey" />
              <input
                type="text"
                className="input grow border-none placeholder:text-darkGrey outline-none focus:border-none"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label className="w-full input input-bordered flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                required
                className="input grow border-none placeholder:text-darkGrey outline-none focus:border-none"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="w-full input flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                type="password"
                className="input grow border-none placeholder:text-darkGrey"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
              />
            </label>
            <label className="w-full input flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                required
                type="password"
                className="input grow border-none placeholder:text-darkGrey"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </label>
            <div className="flex flex-col w-full gap-4 mt-3">
              <FormControlLabel
                control={<Checkbox color="primary" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} />}
                label={<span className="text-darkGrey text-base">I agree to the terms and conditions</span>}
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={subscribeNewsletter} onChange={(e) => setSubscribeNewsletter(e.target.checked)} />}
                label={<span className="text-darkGrey text-base">Sign up for our newsletter</span>}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full text-white mt-8 ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
            <p className="w-full mt-4 text-darkGrey">
              Already have an account?{' '}
              <Link to="/login" className="text-lightBlue">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
