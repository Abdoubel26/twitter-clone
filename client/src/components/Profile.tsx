import { useEffect, useState } from 'react'
import { getUser, getPosts, toggleLike, deletePost } from '../lib/services'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useThisUser } from '../context/thisUserContext'
import type { postType } from '../lib/types'

function Profile() {
  const navigate = useNavigate()

  const { token } = useAuth()
  const { thisUser, setThisUser} = useThisUser()
  const [posts, setPosts] = useState<postType[]>([])

  useEffect(() => {
    if (!token) return
    const loadUser = async () => {
      const response = await getUser(token)
      if(response.success){
        setThisUser(response.user)
      } else {
        alert(response.message || 'Failed to load user profile')
      }
    }
    loadUser()

  }, [token])

  
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

    const clickLike = async (postId: string) => {
        const response = await toggleLike(postId, token)
        if(response.success){
          const newPosts = posts.map((post) => {
          if(response.added){
            post.likes.push(thisUser._id)
          } else (
            post.likes = post.likes.filter(like => like !== thisUser._id)
          )
          return post
          })
          setPosts(newPosts)
        }
      }
    


  const thisUsersPost = posts.filter((post) => post.poster._id === thisUser._id )

  return (
    
    <div className='bg-black text-white flex-1 overflow-y-scroll max-h-screen border-l border-l-gray-700 flex flex-col '>

      <div className='w-full h-40 relative select-none'>
          <img className='h-40 w-full' src={thisUser.bannerImageUrl || ' '} />
          <img src={thisUser.imageUrl} className='rounded-full w-33 h-33 absolute top-23 left-3 z-10 border-3 border-black' />
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-white text-2xl font-bold mt-17 ml-3 '>{thisUser.name}</p>
        <div>
          <button onClick={() => navigate('/home/edit_profile')} className='bg-black border py-2 px-4 m-2 rounded-full border-gray-500 font-semibold text-white cursor-pointer'>
          Edit Profile
        </button>
        </div>
        </div>

        <div className='border-b border-b-gray-600'>
          <p className='text-white px-2 py-5'>{thisUser.bio}</p>
        </div>

        <div>
          {  thisUsersPost.length !== 0 ? 
          thisUsersPost.map((post, indx) => {
            if(post.poster.name === thisUser.name){
            return (
              <div key={indx} className='flex flex-row border-b border-b-gray-700'>
                <div className='h-full'>
                <img  className='rounded-full w-12  h-12 mt-1 ml-1 border border-gray-500' src={post.poster.imageUrl}></img>
                </div>
                
                <div className='w-full'>
                <div className='flex justify-between flex-row w-full'>
                  <p className='text-white font-semibold p-1 text-md cursor-default hover:underline transition-all px-2'>{post.poster.name}</p> <span className={`p-2  cursor-pointer text-2xl ${thisUser._id === post.poster._id ? '' : 'hidden'}`} onClick={() => removePost(post._id)}>🗑️</span>
                </div>
                  <p className='text-white p-1 text-lg font-medium'>{post.text}</p>
                  <img className='w-100 border-gray-800 border max-h-120 mt-1 rounded-2xl' src={post.imageUrl}></img>
                  <div className='flex w-100 flex-row justify-between '>
                  <p className='text-white text-lg  cursor-pointer'>💬{}</p>
                  <p className='text-lg text-white  cursor-pointer'>🔖{}</p>
                  <p className='text-white text-lg cursor-pointer' onClick={() => clickLike(post._id)}>❤️<span>{post.likes.length}</span></p>
                </div>
                </div>
                
              </div>
            )

          } 
        }

        ) :  (
              <h1 className='text-white font-bold text-3xl p-3'>{thisUser.name.split(" ")[0] || "This user"} doesn't have any posts yet...</h1>
            )

          }
          
        </div>

    </div>
  )
}

export default Profile
