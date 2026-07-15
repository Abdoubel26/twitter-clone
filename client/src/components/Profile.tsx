import { useEffect, useState } from 'react'
import { getUser, getPosts, toggleLike, deletePost } from '../lib/services'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useThisUser } from '../context/thisUserContext'
import type { postType } from '../lib/types'

interface ProfileProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Profile({ isOpen = true, onClose }: ProfileProps) {
  const navigate = useNavigate()

  const { token } = useAuth()
  const { thisUser, setThisUser } = useThisUser()
  const [posts, setPosts] = useState<postType[]>([])

  useEffect(() => {
    if (!token) return
    const loadUser = async () => {
      const response = await getUser(token)
      if (response.success) {
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
      if (response.success) {
        setPosts(response.posts)
      } else {
        console.log(response.message)
      }
    }
    loadPosts()
  }, [])

  const removePost = async (id: string) => {
    const response = await deletePost(id, token)
    if (response.success) {
      setPosts(posts.filter(post => post._id !== id))
    } else {
      alert(response.message)
    }
  }

  const clickLike = async (postId: string) => {
    const response = await toggleLike(postId, token)
    if (response.success) {
      const newPosts = posts.map((post) => {
        if (response.added) {
          post.likes.push(thisUser._id)
        } else {
          post.likes = post.likes.filter(like => like !== thisUser._id)
        }
        return post
      })
      setPosts(newPosts)
    }
  }

  const thisUsersPost = posts.filter((post) => post.poster._id === thisUser._id)

  return (
    <>
      {isOpen && onClose && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <div className={`
        bg-black text-green-400 font-mono h-screen overflow-y-auto border-l border-green-900/50 flex flex-col
        fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] transition-transform duration-300 ease-in-out
        md:static md:w-full md:max-w-none md:translate-x-0 md:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {onClose && (
          <div className="flex justify-between items-center p-3 border-b border-green-950 bg-zinc-950 md:hidden">
            <span className="text-xs text-green-700 uppercase tracking-widest">&gt; PROFILER_SYS:</span>
            <button 
              className="text-red-500 border border-red-900 hover:bg-red-950/30 px-2 py-0.5 text-xs font-bold"
              onClick={onClose}
            >
              [ CLOSE_X ]
            </button>
          </div>
        )}

        <div className='w-full h-40 relative select-none border-b border-green-900/50 shrink-0'>
          <img 
            className='h-40 w-full object-cover filter grayscale contrast-125 brightness-75' 
            src={thisUser.bannerImageUrl || ' '} 
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          
          <div className='absolute top-20 left-4 z-10 p-1 bg-black border-2 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'>
            <img 
              src={thisUser.imageUrl} 
              className='w-24 h-24 object-cover filter grayscale contrast-110' 
              alt="Avatar"
            />
          </div>
        </div>

        <div className='mt-8 px-4 flex flex-col gap-2 shrink-0'>
          <div className='flex flex-row justify-between items-center flex-wrap gap-2'>
            <div>
              <h2 className='text-green-400 text-xl md:text-2xl font-bold tracking-wider uppercase'>
                {thisUser.name}
              </h2>
              <p className='text-xs text-green-600 font-semibold'>ID // {thisUser._id?.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <button 
                onClick={() => navigate('/home/edit_profile')} 
                className='bg-transparent border border-green-500 hover:bg-green-500/20 active:bg-green-500 active:text-black transition-all duration-150 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400 cursor-pointer shadow-[2px_2px_0px_#22c55e]'
              >
                [ Edit_Profile ]
              </button>
            </div>
          </div>

          <div className='border-y border-dashed border-green-950 my-3 py-3'>
            <p className='text-xs text-green-600 uppercase font-bold mb-1'>&gt; BIO_DATA_SYS:</p>
            <p className='text-sm text-green-300 leading-relaxed font-semibold'>{thisUser.bio || "NO BIO DATA DETECTED"}</p>
          </div>
        </div>

        <div className='px-4 pb-12'>
          <p className='text-xs text-green-600 font-bold tracking-widest uppercase mb-4'>&gt; TRANSMITTED_LOGS:</p>
          
          {thisUsersPost.length !== 0 ? (
            thisUsersPost.map((post, indx) => {
              if (post.poster.name === thisUser.name) {
                return (
                  <div 
                    key={indx} 
                    className='flex flex-col border border-green-900/40 bg-green-950/5 p-4 mb-4 relative hover:border-green-500/40 transition-all duration-200'
                  >
                    <div className='flex flex-row items-start gap-3 mb-3'>
                      <img 
                        className='w-10 h-10 border border-green-800 shrink-0' 
                        src={post.poster.imageUrl} 
                        alt="User Avatar"
                      />
                      <div>
                        <p className='text-green-400 font-bold text-xs uppercase'>{post.poster.name}</p>
                        <p className='text-[10px] text-green-700'>LOG_{indx}</p>
                      </div>
                    </div>
                    
                    <div className='w-full'>
                      <p className='text-green-100 text-sm font-medium leading-relaxed mb-3'>{post.text}</p>
                      
                      {post.imageUrl && (
                        <div className="border border-green-900/60 p-1 bg-black w-full mb-4">
                          <img 
                            className='w-full filter grayscale contrast-120' 
                            src={post.imageUrl} 
                            alt="Attached file"
                          />
                        </div>
                      )}
                      
                      <div className='flex flex-row justify-between text-xs font-bold text-green-500 border-t border-green-950/40 pt-2 w-full'>
                        <button className='hover:text-green-300 transition-colors flex items-center gap-1'>
                          💬 <span className="text-[10px]">COMM</span>
                        </button>
                        <button className='hover:text-green-300 transition-colors flex items-center gap-1'>
                          🔖 <span className="text-[10px]">SAVE</span>
                        </button>
                        <button 
                          className='hover:text-green-300 transition-colors flex items-center gap-1' 
                          onClick={() => clickLike(post._id)}
                        >
                          ❤️ <span className="text-[10px]">{post.likes.length}</span>
                        </button>
                      </div>
                    </div>

                    {thisUser._id === post.poster._id && (
                      <button 
                        className="absolute top-2 right-2 text-red-500 font-bold text-xs"
                        onClick={() => removePost(post._id)}
                      >
                        [✕]
                      </button>
                    )}
                  </div>
                )
              }
              return null
            })
          ) : (
            <div className='border border-dashed border-green-900 p-6 text-center my-6'>
              <h1 className='text-green-500 font-bold text-sm uppercase tracking-widest'>
                &gt; SYSTEM WARNING: NO LOG_DATA_FOUND
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile