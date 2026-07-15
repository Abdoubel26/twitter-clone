import { useEffect, useState } from "react"
import { getPosts, toggleLike } from "../lib/services"
import { useThisUser } from "../context/thisUserContext"
import { useAuth } from "../context/authContext"

type post = {
  _id: string,
  text: string,
  imageUrl: string,
  likes: string[],
  poster: {
    name: string,
    imageUrl: string,
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

  const clickLike = async (postId: string) => {
    const response = await toggleLike(postId, token)
    if(response.success){
      const newPosts = posts.map((post) => {
        if(response.added){
          post.likes.push(thisUser._id)
        } else {
          post.likes = post.likes.filter(like => like !== thisUser._id)
        }
        return post
      })
      setPosts(newPosts)
    }
  }

  return (
    <div className='bg-black w-full h-screen overflow-hidden flex flex-col border-r border-green-950 font-mono text-green-400'>

      <div className='flex flex-row justify-between border-b border-zinc-800 bg-zinc-950 shrink-0'>
        <h1 className='text-white select-none border-b-2 border-white flex-1 text-center py-4 font-bold text-sm tracking-widest uppercase hover:bg-zinc-900 cursor-pointer' >For you</h1>
        <h1 className='text-zinc-500 flex-1 text-center py-4 font-semibold text-sm tracking-widest uppercase hover:bg-zinc-900 cursor-pointer hover:text-white transition-colors' >Following</h1>
        <h1 className='text-zinc-500 flex-1 text-center py-4 font-semibold text-sm tracking-widest uppercase hover:bg-zinc-900 cursor-pointer hover:text-white transition-colors' >Groups</h1>
      </div>

      <div className='overflow-y-auto flex-1 flex flex-col pb-10'>
        {[...posts].reverse().map((post, indx) => {
           return (
            <div key={indx} className='flex flex-row p-4 border-b border-zinc-800 hover:bg-zinc-900/20 transition-colors gap-3'>
              <div className='shrink-0'>
                <img className='w-12 h-12 object-cover border-2 border-zinc-700' src={post.poster.imageUrl} alt={post.poster.name} />
              </div>

              <div className="flex-1 min-w-0">
                <div className='flex flex-row justify-between items-baseline'>
                  <p className='text-white font-bold text-base cursor-pointer hover:underline truncate'>{post.poster.name}</p>  
                </div>
                <p className='text-zinc-100 py-1 text-lg font-medium break-words'>{post.text}</p>
                
                {post.imageUrl && (
                  <div className="my-2 max-w-full overflow-hidden border border-zinc-800">
                    <img className='w-full max-h-96 object-cover hover:scale-101 transition-transform' src={post.imageUrl} alt="Post content" />
                  </div>
                )}

                <div className='flex flex-row justify-between w-full max-w-xs mt-3 text-zinc-500'>
                  <button className='hover:text-white text-lg transition-colors cursor-pointer'>💬</button>
                  <button className='hover:text-white text-lg transition-colors cursor-pointer'>🔖</button>
                  <button className='hover:text-red-500 text-lg transition-colors cursor-pointer flex items-center gap-1.5' onClick={() => clickLike(post._id)}>
                    ❤️ <span className="text-sm font-bold">{post.likes.length}</span>
                  </button>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  )
}

export default Feed