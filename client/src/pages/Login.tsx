import { useState } from 'react'
import logo_image from '../assets/big_logo_image.jpg'
import { signup, login } from '../lib/services'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

type CurrStateType = 'Signup' | 'Login'

function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const [currState, setCurrState] = useState<CurrStateType>("Signup")
  const [inputUser, setInputUser] = useState({ name: "", email: "", bio: "", password: "" })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (currState === "Signup") {
        const response = await signup(inputUser.name, inputUser.password, inputUser.email, inputUser.bio)
        
        if (response.success) {
          setAuth(response.token)
          setInputUser({ name: "", bio: "", email: "", password: "" })
          alert("Signed up successfully")
          navigate('/home')
        } else {
          setError(response.message || "Signup failed")
        }
      } else if (currState === "Login") {
        const response = await login(inputUser.email, inputUser.password)
        
        if (response.success) {
          setAuth(response.token)
          setInputUser({ name: "", bio: "", email: "", password: "" }) 
          navigate('/home')
        } else {
          setError(response.message || "Invalid email or password")
        }
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected network error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-black w-screen'>
      <div className='flex min-h-full w-full poppins flex-col sm:flex-row items-center justify-center overflow-y-scroll lg:justify-around'>

        <div className='hidden w-full h-screen sm:w-1/2 lg:flex items-center justify-center'>
          <img className='w-[70%]' src={logo_image} alt="Logo" />
        </div>

        <div>
          <h1 className='text-6xl mt-3 poppins font-extrabold text-white'>Happening Now</h1>

          <div className='p-4 m-5 mb-0 pl-0 ml-0 flex flex-col self-end'>
            <h2 className='text-3xl poppins my-1 font-bold text-white'>
              {currState === 'Signup' ? "Join today." : "Welcome back!"}
            </h2>

            <form className='flex flex-col w-80' onSubmit={handleSubmit}>
              
              <input 
                value={inputUser.name} 
                onChange={(e) => setInputUser((prev) => ({ ...prev, name: e.target.value }))} 
                className={`my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border ${currState === "Login" ? "hidden" : ""}`} 
                type='text'  
                required={currState === "Signup"} 
                placeholder='Full Name' 
                disabled={loading}
              />
              
              <input 
                value={inputUser.email} 
                onChange={(e) => setInputUser((prev) => ({ ...prev, email: e.target.value }))}  
                className='my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border' 
                type='email' 
                required 
                placeholder='Email'
                disabled={loading}
              />
              
              <input 
                value={inputUser.password} 
                onChange={(e) => setInputUser((prev) => ({ ...prev, password: e.target.value }))}  
                className='my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border'  
                type='password' 
                required 
                placeholder='Password'
                disabled={loading}
              />
              
              <textarea 
                value={inputUser.bio} 
                onChange={(e) => setInputUser((prev) => ({ ...prev, bio: e.target.value }))}  
                rows={3}  
                className={`mt-2 resize-none rounded text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border ${currState === "Login" ? "hidden" : ""}`} 
                placeholder='Biography'
                disabled={loading}
              />

              {error && <p className='text-red-500 text-sm font-semibold my-2 px-2'>{error}</p>}

              <button 
                type='submit' 
                disabled={loading} 
                className='bg-gray-100 cursor-pointer hover:bg-gray-300 active:bg-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 text-black font-semibold rounded-full text-2xl py-2 mb-2 mt-4'
              >
                {loading ? "Processing..." : currState === "Signup" ? "Create Account" : "Log in Now"}
              </button>

              <p className='text-white font-semibold'> 
                {currState === "Signup" ? "Already have an account? " : "Don't have an account? "} 
                <span 
                  onClick={() => {
                    if (!loading) {
                      setCurrState(currState === "Signup" ? "Login" : "Signup");
                      setError("");
                    }
                  }}  
                  className='text-blue-400 hover:underline cursor-pointer'
                >
                  {currState === "Signup" ? "Log in" : "Sign up"}
                </span>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login