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

  const handleSubmit = async () => {
    const post = {
      text: inputPost.text,
      imageUrl: inputPost.imageUrl,
      poster: thisUser,
      likeCount: 0,
    }
    const response = await addPost(post, token)
    if(response.success){
      navigate('/home')
    } else {
      alert(response.message)
    }
  }

  return (
    <div className='w-[50%] h-screen bg-linear-to-l from-gray-950 to-gray-900'>

      <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center justify-center'>
      <textarea placeholder='Post Text' onChange={e => setInputPost( prev => ( {...prev, text: e.target.value} ))} value={inputPost.text} rows={3} className='bg-black placeholder:text-gray-500 resize-none border border-gray-700 rounded-2xl p-3 w-100 outline-none text-white font-medium' required ></textarea>
      <input placeholder='Paste Post Image URL'  onChange={e => setInputPost( prev => ( {...prev, imageUrl: e.target.value} ))} value={inputPost.imageUrl} type='URL' className='bg-black placeholder:text-gray-500 resize-none border border-gray-700 rounded-2xl p-4 w-100 outline-none text-white font-medium my-4'></input>
      <button type="submit" className=' w-100 my-3 text-black p-2 rounded-full font-extrabold cursor-pointer hover:bg-gray-300 transition-all duration-200 bg-gray-100 active:bg-white'>
        Post
      </button>

      </form>
      
    </div>
  )
}

export default Post
