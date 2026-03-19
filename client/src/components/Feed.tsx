import { useEffect, useState } from "react"
import { getPosts, deletePost } from "../lib/services"
import { useThisUser } from "../context/thisUserContext"
import { useAuth } from "../context/authContext"


type post = {
  _id: string,
  text: string,
  imageUrl: string,
  likeCount: number,
  poster: {
    name: string,
    imageUrl: string
    _id: string
  }
}



function Feed() {

  const { token } = useAuth()

  const { thisUser } = useThisUser()

    const [posts, setPosts] = useState<post[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const response = await getPosts()
      if(response.success){
        setPosts(response.posts)
      } else {
        console.log(response.message)
      }
    }
    loadPosts()
  }, [])

  const removePost = async (id: string) => {
    const response = await deletePost(id, token)
    if(response.success) {
      setPosts(posts.filter(post => post._id !== id))
    } else {
      alert(response.message)
    }
  }




  return (
    <div className='bg-black w-[50%] h-screen'>
      <div className='flex flex-row justify-between border-b border-b-gray-500'>
        <h1 className='text-white transition-all select-none border-b-4 border-blue-500 flex-1 text-center py-4 font-semibold hover:bg-gray-900' >For you</h1>
        <h1 className='text-white transiton-all flex-1 text-center py-4 font-semibold  hover:bg-gray-900' >Following</h1>
        <h1 className='text-white transition-all flex-1 text-center py-4 font-semibold  hover:bg-gray-900'  >Groups</h1>
      </div>
      <div className='overflow-y-scroll h-[89%]'>
        {
          posts.map((post, indx) => {
             return (
              <div key={indx} className='flex flex-row border-b border-b-gray-700'>
                <div className='h-full'>
                <img  className='rounded-full w-13 h-13 mt-1 ml-1 border border-gray-500' src={post.poster.imageUrl}></img>
                </div>

                
                <div className="w-full">

                <div className='flex flex-row justify-between w-full'>
                  <p className='text-white font-semibold p-2 text-lg  cursor-default hover:underline transition-all '>{post.poster.name}</p>  <span className={`p-2  cursor-pointer text-2xl ${thisUser._id === post.poster._id ? '' : 'hidden'}`} onClick={() => removePost(post._id)}>🗑️</span>
                </div>
                  <p className='text-white p-1 text-xl font-medium'>{post.text}</p>
                  <img className='w-100 border-gray-800 border max-h-120 mt-1 rounded-2xl' src={post.imageUrl}></img>
                  <div className='flex flex-row justify-between w-100 '>
                  <p className='text-white text-lg  cursor-pointer'>💬{Math.floor(post.likeCount - (post.likeCount/2))}</p>
                  <p className='text-lg text-white  cursor-pointer'>🔖{Math.floor(Math.abs(post.likeCount - Math.sqrt(post.likeCount)))}</p>
                  <p className='text-white text-lg  cursor-pointer'>❤️<span>{post.likeCount}</span></p>
                </div>
                </div>
                
              </div>
             )
          })
        }

      </div>
    </div>
  )
}

export default Feed
