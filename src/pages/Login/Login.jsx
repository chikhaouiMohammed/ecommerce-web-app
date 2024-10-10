//import images
import loginImg from '../../images/Login/Image.png'


import './style.css'
import { Link } from 'react-router-dom'
import GoogleSignIn from '../GoogleSignIn'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import Header from '../../components/Header/Header'
import { auth } from '../../firebase'

const Login = () => {

    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const handleLogin = async (e) => {
        e.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.href = '/user-profile'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            toast.error('Invalid email or password')
        });
    }

    
  return (
    <section className=' font-open'>
        {/* Nav Bar */}
        <Header/>
        {/* Login Content */}
        <div className='flex justify-center items-center w-full  pt-20 lg:py-0'>
            {/* Img */}
            <div className='lg:w-[50%] w-0 '>
                <img className='w-full mt-10' src={loginImg} alt="" />
            </div>
            {/* Login Form */}
            <div className='lg:w-[50%] w-full flex flex-col justify-center items-center p-16'>
                <h2 className='text-[#333333] text-[34px] text-start w-full font-bold mb-12'>Sign In Page</h2>
                <GoogleSignIn/>
                {/* Or */}
                <div className='mb-12 w-full flex justify-center items-center gap-2'>
                    <div className='w-full h-[1px] bg-[#666666]'></div>
                    <div className='font-normal text-[#666666]'>OR</div>
                    <div className='w-full h-[1px] bg-[#666666]'></div>
                </div>
                <form onSubmit={handleLogin} className='w-full flex flex-col justify-center items-start gap-7' action="">
                    <label className="w-full input input-bordered flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input onChange={(e) => setemail(e.target.value)} type="text" className="input grow border-none placeholder:text-darkGrey outline-none focus:border-none" placeholder="Email" />
                    </label>
                    <label className="w-full input flex items-center gap-2 border-darkGrey py-7 text-darkGrey">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70 text-darkGrey"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input onChange={(e) => setpassword(e.target.value)}  type="password" className="input grow border-none placeholder:text-darkGrey" placeholder="password" />
                    </label>
                    <div className='w-full text-end text-darkGrey underline cursor-pointer transition-all duration-200 hover:text-black'>Forgot Your Password</div>
                    <button type='submit' className='text-white bg-aztecPurple hover:bg-purple-900 transition-all duration-300 rounded-lg text-center py-4 px-14 text-lg'>Sign In</button>
                    <div className='text-darkGrey'>Dont have an account? <Link to='/signup' className='underline transition-all duration-200 hover:text-black cursor-pointer'>Sign Up</Link></div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login
