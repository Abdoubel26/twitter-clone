import { type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../lib/services'
import { useAuth } from '../context/authContext'
import { useThisUser } from '../context/thisUserContext'

function EditProfile() {
    const { token } = useAuth()
    const { thisUser, setThisUser} = useThisUser()
    const navigate = useNavigate()

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await updateUser(thisUser.bio, thisUser.name, thisUser.imageUrl, thisUser.bannerImageUrl, token)
        if(response.success){
            navigate('/home')
        } else {
            console.log(response.message)
        }
    }

  return (
    <div className='bg-black w-full min-h-screen flex justify-center items-center flex-col border-r border-green-950 font-mono text-green-400'>
        
         <form className='flex flex-col w-full max-w-lg border-2 border-zinc-700 p-6 md:p-8 bg-zinc-900/50 shadow-[4px_4px_0px_0px_rgba(63,63,70,1)]' onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-700 pb-2 uppercase tracking-widest">Edit Profile</h2>

            <label className="text-xs text-zinc-500 uppercase font-semibold">Full Name</label>
            <input 
                value={thisUser.name} 
                onChange={(e) => setThisUser((prev) => ({ ...prev, name: e.target.value }))} 
                className="my-2 rounded-none text-lg p-2.5 outline-none font-semibold text-white bg-zinc-950 border-zinc-700 border focus:border-zinc-400 transition-all" 
                type='text' 
                placeholder='Full Name'
            />

            <label className="text-xs text-zinc-500 uppercase font-semibold mt-2">Biography</label>
            <textarea 
                value={thisUser.bio} 
                onChange={(e) => setThisUser((prev) => ({ ...prev, bio: e.target.value }))} 
                rows={3} 
                className="my-2 resize-none rounded-none text-lg p-2.5 outline-none font-semibold text-white bg-zinc-950 border-zinc-700 border focus:border-zinc-400 transition-all" 
                placeholder='Biography'
            />

            <label className="text-xs text-zinc-500 uppercase font-semibold mt-2">Profile Image URL</label>
            <input 
                value={thisUser.imageUrl} 
                onChange={(e) => setThisUser((prev) => ({ ...prev, imageUrl: e.target.value }))} 
                className="my-2 rounded-none text-lg p-2.5 outline-none font-semibold text-white bg-zinc-950 border-zinc-700 border focus:border-zinc-400 transition-all" 
                type='text' 
                placeholder='Profile Image URL'
            />

            <label className="text-xs text-zinc-500 uppercase font-semibold mt-2">Banner Image URL</label>
            <input 
                value={thisUser.bannerImageUrl} 
                onChange={(e) => setThisUser((prev) => ({ ...prev, bannerImageUrl: e.target.value }))} 
                className="my-2 rounded-none text-lg p-2.5 outline-none font-semibold text-white bg-zinc-950 border-zinc-700 border focus:border-zinc-400 transition-all" 
                type='text' 
                placeholder='Banner Image URL'
            />

            <button type='submit' className='bg-white cursor-pointer hover:bg-zinc-300 active:bg-white text-black font-extrabold text-xl py-3 mt-4 mb-2 uppercase tracking-wide border-2 border-black active:translate-y-[2px] transition-transform'>
                Update Profile
            </button>
            <button type='button' onClick={() => navigate('/home')} className='bg-zinc-800 cursor-pointer hover:bg-zinc-700 text-zinc-300 font-semibold text-lg py-2 uppercase tracking-wide border border-zinc-600'>
                Cancel
            </button>
        </form>
    </div>
  )
}

export default EditProfile