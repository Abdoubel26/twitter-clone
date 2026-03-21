import { useEffect, useState } from "react"
import { searchPosts, searchUsers, toggleLike, getFollows, follow, unfollow } from "../lib/services"
import { type userType,type postType, type relationType } from "../lib/types"
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
        console.log(responsePosts.posts)
      } else {
        alert( 'posts_api: ' + responsePosts.message + ' users_api: '  + responseUsers.message)
      } 

    }
    search()
  } }, [debounceSearchInput])




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
  })

  const followUser = async (followingId: string) => {
        const response = await follow(followingId, token )
        if(response.success){
          setFollows(prev => [...prev, response.relation])
          console.log( "after follow " + [...follows, response.relation])
        } else {
          alert(response.message)
        }
  }
  
  const unfollowUser = async (relationId: string) => {
        const response = await unfollow(relationId, token)
        if(response.success){
          setFollows(prev => prev.filter(follow => (follow._id !== relationId) ))
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
        } else (
          post.likes = post.likes.filter(like => like !== thisUser._id)
        )
        return post
        })
        setSearchResultsPosts(newPosts)
      }
    }


  return (
    <div className='bg-black w-[50%] h-screen'>
      <div className=' bg-gray-900  px-5 items-center justify-center py-5  flex flex-row'>
        <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='rounded-full w-[85%] p-2 pl-4 bg-gray-800 text-2xl placeholder:text-gray-600 text-white font-medium outline-none border-gray-700 border' placeholder='Search'></input>
    </div>

     { showSearchResults ?  
     <div className="flex flex-col flex-1 overflow-y-scroll h-screen">

      <div>
        <h1>Posts</h1>
        {searchResultsPosts.map((post, indx) => {
             return (
              <div key={indx} className='flex flex-row border-b pb-20 border-b-gray-700'>
                <div className='h-full'>
                <img  className='rounded-full w-13 h-13 mt-1 ml-1 border border-gray-500' src={post.poster.imageUrl}></img>
                </div>

                
                <div className="w-full">

                <div className='flex flex-row justify-between'>
                  <p className='text-white font-semibold p-2 text-lg  cursor-default hover:underline transition-all '>{post.poster.name}</p>  
                </div>
                  <p className='text-white p-1 text-xl font-medium'>{post.text}</p>
                { post.imageUrl ?  <img className='w-100 border-gray-800 border max-h-120 mt-1 rounded-2xl' src={post.imageUrl}></img> : null }
                  <div className='flex flex-row justify-between w-100 '>
                  <p className='text-white text-lg  cursor-pointer'>💬{}</p>
                  <p className='text-lg text-white  cursor-pointer'>🔖{}</p>
                  <p className='text-white text-lg  cursor-pointer' onClick={() => clickLike(post._id)}>❤️<span>{post.likes.length}</span></p>
                </div>
                </div>
                
              </div>
             )
          })}
      </div>

      <div>
        <h1>Users</h1>
        {searchResultsUsers.map((user, indx) => {
                  const iFollow = follows.some(follow => checkRelation(thisUser._id, user._id, follow))
                    if(thisUser._id === user._id) return null
                  return (
                    <div key={indx} className='flex flex-col  border-b-white border-[0.25px]'>
                      <div className=' py-5 px-5'>
                        <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row'>
                          <img  className='rounded-full h-16 object-cover w-16' src={user.imageUrl}></img>
                          <div>
                            <p className='text-white font-medium cursor-pointer hover:underline px-2'>{user.name}</p>
                            <p className='text-white font-normal p-2'>{clipLongText(user.bio)}</p>
                          </div>
                          
                        </div>
                        
                        <button className={` rounded-full font-bold h-fit py-2 px-5 select-none cursor-pointer transition-all  ${ iFollow ? "bg-black text-white border-2 border-gray-600 hover:bg-gray-900 " : "bg-white hover:bg-gray-300" }`} onClick={ iFollow ? () => unfollowUser(follows.find(follow => ( follow.follower === thisUser._id && follow.following === user._id ))?._id!) : () => followUser(user._id)}>
                          { iFollow  ? "following" : "follow"}
                        </button>
                        </div>
                      </div>
                    </div>
                  )
                })}

      </div>


     </div>
     :
      <div className='flex-col flex items-center w-full flex-1 justify-center'>
        <h1 className='text-white text-5xl p-3 font-bold flex-1'>Search For Other Users' Posts...</h1>
      </div>
      }
      
    </div>
  )
}

export default SearchInterface
