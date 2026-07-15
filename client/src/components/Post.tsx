import { addPost } from "../lib/services"
import { useThisUser } from "../context/thisUserContext"
import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

function Post() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const { thisUser } = useThisUser()

  const [inputPost, setInputPost] = useState({
    text: "",
    imageUrl: "",
    poster: thisUser
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      text: inputPost.text,
      imageUrl: inputPost.imageUrl,
      poster: thisUser,
      likeCount: 0,
    }
    const response = await addPost(post as any, token)
    if(response.success){
      navigate('/home')
    } else {
      alert(response.message)
    }
  }

  return (
    <div className='bg-black w-full min-h-screen flex flex-col border-r p-20 border-green-950 font-mono text-green-400'>
      <form onSubmit={handleSubmit} className='w-full max-w-lg border-2 border-zinc-700 p-6 md:p-8 bg-zinc-900/50 shadow-[4px_4px_0px_0px_rgba(63,63,70,1)] flex flex-col'>
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-zinc-700 pb-2">Transmit Post</h2>

        <textarea 
          placeholder='Write your transmission text...' 
          onChange={e => setInputPost(prev => ({...prev, text: e.target.value}))} 
          value={inputPost.text} 
          rows={4} 
          className='bg-zinc-950 placeholder-zinc-600 resize-none border border-zinc-700 p-3 w-full outline-none text-white font-medium focus:border-zinc-400' 
          required 
        />
        
        <input 
          placeholder='Image URL (Optional)'  
          onChange={e => setInputPost(prev => ({...prev, imageUrl: e.target.value}))} 
          value={inputPost.imageUrl} 
          type='url' 
          className='bg-zinc-950 placeholder-zinc-600 border border-zinc-700 p-3 w-full outline-none text-white font-medium my-4 focus:border-zinc-400' 
        />

        <button 
          type="submit" 
          className='w-full mt-2 text-black p-3 bg-white font-extrabold border-2 border-white cursor-pointer hover:bg-zinc-300 transition-all uppercase tracking-wider text-base active:translate-y-[2px]'
        >
          Post Transmission
        </button>
      </form>
    </div>
  )
}

export default Post