import { useEffect, useState } from 'react'
import { checkRelation, clipLongText } from '../lib/utils'
import { getAllUsers, getFollows, follow, unfollow} from '../lib/services'
import { type userType, type relationType } from '../lib/types'
import { useThisUser } from '../context/thisUserContext'
import { useAuth } from '../context/authContext'

function Follow() {
  const { token } = useAuth()
  const { thisUser } = useThisUser()
  const [allUsers, setAllUsers] = useState<userType[]>([])
  const [follows, setFollows] = useState<relationType[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      const response = await getAllUsers()
      if(response.success){
        setAllUsers(response.users)
      } else {
        alert(response.message)
      }
    }

    const loadFollows = async () => {
      const response = await getFollows()
      if(response.success){
        setFollows(response.follows)
      } else {
        alert(response.message)
      }
    }
    loadUsers()
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

  return (
    <div className='bg-black w-full h-screen overflow-hidden flex flex-col border-r border-r-gray-700'>
      <div className='flex flex-col bg-zinc-950 border-b border-zinc-800 p-5 shrink-0'>
        <h1 className='text-2xl font-bold uppercase tracking-widest text-white'>Who to Follow</h1>
      </div>
      <div className='flex-1 overflow-y-auto flex flex-col pb-10'>
        {allUsers.map((user, indx) => {
          const iFollow = follows.some(follow => checkRelation(thisUser._id, user._id, follow))
          if(thisUser._id === user._id) return null
          
          return (
            <div key={indx} className='flex flex-col p-4 border-b border-zinc-800 hover:bg-zinc-900/10 transition-colors'>
              <div className='flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center'>
                <div className='flex flex-row gap-3 items-start min-w-0'>
                  <img className='w-14 h-14 object-cover border border-zinc-700' src={user.imageUrl} alt={user.name} />
                  <div className="min-w-0">
                    <p className='text-white font-bold cursor-pointer hover:underline text-lg truncate'>{user.name}</p>
                    <p className='text-zinc-400 text-sm mt-1 wrap-break-word'>{clipLongText(user.bio)}</p>
                  </div>
                </div>
                
                <button 
                  className={`w-full sm:w-auto font-bold py-2 px-6 uppercase text-sm tracking-wider border-2 transition-colors cursor-pointer ${
                    iFollow 
                    ? "bg-zinc-950 text-zinc-400 border-zinc-700 hover:text-white hover:border-white" 
                    : "bg-white text-black border-white hover:bg-zinc-300"
                  }`} 
                  onClick={iFollow ? () => unfollowUser(follows.find(follow => (follow.follower === thisUser._id && follow.following === user._id))?._id!) : () => followUser(user._id)}
                >
                  {iFollow ? "unfollow" : "follow"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Follow