import { useState } from 'react'
import logo_image from '../assets/big_logo_image.jpg'

type CurrStateType = 'Signup' | 'Login'
 
function Login() {

    const [currState, setCurrState] = useState<CurrStateType>("Signup")


  return (
    <div className='min-h-screen bg-black w-screen'>
      <div className='flex min-h-full w-full poppins flex-col sm:flex-row items-center justify-around'>

        <div className=' w-full sm:w-1/2 flex items-center justify-center'>
          <img className='w-[70%]' src={logo_image} ></img>
        </div>

        <div>
          <h1 className='text-6xl mt-3 poppins font-extrabold text-white'>Happening Now</h1>
          <div className='p-4 m-5 mb-0 pl-0 ml-0  flex flex-col self-end'>
            <h2 className='text-3xl poppins my-1 font-bold text-white'>{ currState === 'Signup' ? "Join today." : "Welcome back!"}</h2>

            <form className='flex flex-col '>
            <input className={` my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border  ${ currState === "Login" ? "hidden" : ""}`} type='text'  required placeholder='Full Name'></input>
            <input className=' my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border' type='email' required placeholder='Email'></input>
            <input className=' my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border'  type='password' required placeholder='Password'></input>
            <textarea rows={4}  className={`my-2 resize-none rounded text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border ${ currState === "Login" ? "hidden" : ""}`} placeholder='Biography'></textarea>

            <button className='bg-white text-black font-semibold rounded-full text-2xl py-2 my-2 '>
            { currState === "Signup" ? "Create Account" : "Log in Now" }
            </button>

            <p className='text-white font-semibold'> { currState === "Signup" ? "Already have an account?" : "Don't have an account?"} <span onClick={() => setCurrState( currState === "Signup" ? "Login" : "Signup")}  className='text-blue-400 hover:underline cursor-pointer'>{ currState === "Signup" ? "Log in" : "Sign up" }</span></p>
            </form>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Login
