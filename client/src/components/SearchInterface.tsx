import { useEffect, useState } from "react"
import { searchPosts, searchUsers, toggleLike, getFollows, follow, unfollow } from "../lib/services"
import { type userType, type postType, type relationType } from "../lib/types"
import { useThisUser } from "../context/thisUserContext"
import { checkRelation, clipLongText } from "../lib/utils"
import { useAuth } from "../context/authContext"

function SearchInterface() {
  const { thisUser } = useThisUser()
  const { token } = useAuth()

  const [searchInput, setSearchInput] = useState<string>('')
  const [debounceSearchInput, setDebounceSearchInput] = useState<string>('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResultsUsers, setSearchResultsUsers] = useState<userType[]>([])
  const [searchResultsPosts, setSearchResultsPosts] = useState<postType[]>([])
  const [follows, setFollows] = useState<relationType[]>([])

  useEffect(() => {
    if(!searchInput) {
      setShowSearchResults(false)
      return 
    }
    const timer = setTimeout(() => {
      setDebounceSearchInput(searchInput)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    if(searchInput === ''){
      setShowSearchResults(false)
    }
  }, [searchInput])

  useEffect(() => {
    if(debounceSearchInput && searchInput) {
      const search = async () => {
        const responseUsers = await searchUsers(debounceSearchInput)
        const responsePosts = await searchPosts(debounceSearchInput)
        if(responseUsers.success && responsePosts.success){
          setSearchResultsPosts(responsePosts.posts)
          setSearchResultsUsers(responseUsers.users)
          setShowSearchResults(true)
        } else {
          alert('posts_api: ' + responsePosts.message + ' users_api: ' + responseUsers.message)
        } 
      }
      search()
    }
  }, [debounceSearchInput])

  useEffect(() => {
    const loadFollows = async () => {
      const response = await getFollows()
      if(response.success){
        setFollows(response.follows)
      } else {
        alert(response.message)
      }
    }
    loadFollows()
  }, [])

  const followUser = async (followingId: string) => {
    const response = await follow(followingId, token)
    if(response.success){
      setFollows(prev => [...prev, response.relation])
    } else {
      alert(response.message)
    }
  }
  
  const unfollowUser = async (relationId: string) => {
    const response = await unfollow(relationId, token)
    if(response.success){
      setFollows(prev => prev.filter(follow => (follow._id !== relationId)))
    } else {
      alert(response.message)
    }
  }

  const clickLike = async (postId: string) => {
    const response = await toggleLike(postId, token)
    if(response.success){
      const newPosts = searchResultsPosts.map((post) => {
        if(response.added){
          post.likes.push(thisUser._id)
        } else {
          post.likes = post.likes.filter(like => like !== thisUser._id)
        }
        return post
      })
      setSearchResultsPosts(newPosts)
    }
  }

  return (
    <div className='bg-black w-full h-screen overflow-hidden flex flex-col border-r border-green-950 font-mono text-green-400'>
      <div className='bg-zinc-950 px-4 py-5 flex flex-row border-b border-green-950 shrink-0'>
        <span className="text-xl mr-2 flex items-center select-none text-green-500">&gt;_</span>
        <input 
          onChange={(e) => setSearchInput(e.target.value)} 
          value={searchInput} 
          type='text' 
          className='w-full p-2.5 bg-black text-lg placeholder:text-green-900 text-green-400 outline-none border border-green-900 focus:border-green-500 font-mono uppercase tracking-widest' 
          placeholder='SEARCH DIRECTORY...'
        />
      </div>

      {showSearchResults ? (
        <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-6 pb-12">
          <div>
            <h2 className='text-xs text-green-600 font-bold uppercase tracking-widest mb-3 border-b border-green-950 pb-1'>
              &gt; MATCHING_TRANSMISSIONS:
            </h2>
            {searchResultsPosts.length === 0 ? (
              <p className="text-xs text-green-800 p-2">NO POST_DATA MATCHED QUERY</p>
            ) : (
              searchResultsPosts.map((post, indx) => (
                <div key={indx} className='flex flex-row border border-green-900/40 bg-green-950/5 p-4 mb-3'>
                  <div className='mr-3 shrink-0'>
                    <img className='w-10 h-10 border border-green-800 object-cover filter grayscale' src={post.poster.imageUrl} alt="" />
                  </div>
                  <div className="w-full min-w-0">
                    <p className='text-green-500 font-bold text-xs uppercase tracking-wider mb-1'>{post.poster.name}</p>
                    <p className='text-green-100 text-sm font-semibold mb-3'>{post.text}</p>
                    {post.imageUrl && (
                      <div className="border border-green-900/60 p-1 bg-black max-w-sm mb-3">
                        <img className='w-full filter grayscale contrast-110' src={post.imageUrl} alt="" />
                      </div>
                    )}
                    <div className='flex flex-row gap-6 text-xs font-bold text-green-500'>
                      <button className='hover:text-green-300'>💬 COMM</button>
                      <button className='hover:text-green-300'>🔖 SAVE</button>
                      <button className='hover:text-green-300' onClick={() => clickLike(post._id)}>
                        ❤️ {post.likes.length} LIKES
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <h2 className='text-xs text-green-600 font-bold uppercase tracking-widest mb-3 border-b border-green-950 pb-1'>
              &gt; MATCHING_USER_NODES:
            </h2>
            {searchResultsUsers.length === 0 ? (
              <p className="text-xs text-green-800 p-2">NO NODE_DATA MATCHED QUERY</p>
            ) : (
              searchResultsUsers.map((user, indx) => {
                const iFollow = follows.some(follow => checkRelation(thisUser._id, user._id, follow))
                if(thisUser._id === user._id) return null
                return (
                  <div key={indx} className='flex flex-col border border-green-950 bg-black p-4 mb-3'>
                    <div className='flex flex-row justify-between items-center gap-3'>
                      <div className='flex flex-row items-center gap-3 min-w-0'>
                        <img className='h-12 w-12 border border-green-800 object-cover filter grayscale' src={user.imageUrl} alt="" />
                        <div className="min-w-0">
                          <p className='text-green-400 font-bold text-sm uppercase tracking-wider truncate'>{user.name}</p>
                          <p className='text-green-700 text-xs truncate mt-0.5'>{clipLongText(user.bio)}</p>
                        </div>
                      </div>
                      
                      <button 
                        className={`font-bold text-xs uppercase px-3 py-1.5 transition-all shadow-[2px_2px_0px_#22c55e] border cursor-pointer ${ 
                          iFollow 
                            ? "bg-transparent text-red-500 border-red-900 shadow-[2px_2px_0px_#ef4444] hover:bg-red-950/20" 
                            : "bg-transparent text-green-400 border-green-500 hover:bg-green-500/20" 
                        }`}
                        onClick={iFollow 
                          ? () => unfollowUser(follows.find(f => (f.follower === thisUser._id && f.following === user._id))?._id!) 
                          : () => followUser(user._id)
                        }
                      >
                        {iFollow ? "[ unfollow ]" : "[ follow ]"}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center flex-1 p-6 text-center'>
          <h1 className='text-green-500 text-xl md:text-2xl font-bold uppercase tracking-widest leading-relaxed max-w-md border border-dashed border-green-900 p-6'>
            &gt; SYSTEM STATUS: IDLE<br/>
            <span className="text-xs text-green-700 block mt-2 font-semibold">AWAITING TRANSLATION SEARCH QUERY PARAMETERS...</span>
          </h1>
        </div>
      )}
    </div>
  )
}

export default SearchInterface