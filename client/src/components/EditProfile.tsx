import React, { useState, type SyntheticEvent , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, updateUser } from '../lib/services'
import { useAuth } from '../context/authContext'
import { useThisUser } from '../context/thisUserContext'

function EditProfile() {
    const { token } = useAuth()
    const { thisUser, setThisUser} = useThisUser()
    const navigate = useNavigate()

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await updateUser(thisUser.bio, thisUser.name, thisUser.ImageUrl, thisUser.bannerImageUrl, token)
        if(response.success){
            navigate('/home')
        } else {
            console.log(response.detail)
        }
    }


  return (
    <div className='w-1/2 h-screen flex flex-col items-center justify-center   p-15 bg-linear-to-l from-gray-950 to-gray-900'>
        
         <form className='flex flex-col w-120 ' onSubmit={(e) => handleSubmit(e)}>
            <input value={thisUser.name} onChange={(e) => setThisUser( (prev) => ({ ...prev, name: e.target.value }) )} className={` my-2  rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border`} type='text'  placeholder='Full Name'></input>
            <textarea value={thisUser.bio} onChange={(e) => setThisUser( (prev) => ({ ...prev, bio: e.target.value }) )}  rows={3}  className={`mt-2 resize-none rounded text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border`} placeholder='Biography'></textarea>
            <input value={thisUser.ImageUrl} onChange={(e) => setThisUser( (prev) => ({ ...prev, ImageUrl: e.target.value }) )} className={` my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border`} type='text'  placeholder='Profile Image URL'></input>
            <input value={thisUser.bannerImageUrl} onChange={(e) => setThisUser( (prev) => ({ ...prev, bannerImageUrl: e.target.value }) )} className={` my-2 rounded-full text-xl p-2 pl-4 outline-none font-semibold placeholder:font-normal text-white placeholder:text-gray-600 bg-gray-950 border-gray-800 border`} type='text'  placeholder='Banner Image URL'></input>
3
            <button type='submit' className='bg-gray-100 cursor-pointer hover:bg-gray-300 active:bg-white transition-all duration-200 text-black font-semibold rounded-full text-2xl py-2 mb-2 '>
                Update Profile
            </button>
            <button type='button' onClick={() => navigate('/home')} className='bg-gray-500 cursor-pointer hover:bg-gray-400 active:bg-white transition-all duration-200 text-black font-semibold rounded-full text-2xl py-2 mb-2 '>
                Cancel
            </button>


            </form>
      
    </div>
  )
}

export default EditProfile
