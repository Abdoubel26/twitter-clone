import { useEffect, useState } from 'react'
import { checkRelation, clipLongText } from '../lib/utils'
import { getAllUsers, getFollows, follow, unfollow} from '../lib/services'
import  { type userType, type relationType } from '../lib/types'
import { useThisUser } from '../context/thisUserContext'
import { useAuth } from '../context/authContext'


function Follow() {
  const  { token } = useAuth()
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
      }}

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
    

  return (
    <div className='bg-black w-[50%] '>

      <div className='flex flex-col bg-gray-900 '>
        <h1 className='text-4xl font-extrabold text-white p-5' >Who to Follow</h1>
      </div>
      <div className='flex flex-col overflow-y-scroll flex-1 '>
        {allUsers.map((user, indx) => {
          const iFollow = follows.some(follow => checkRelation(thisUser._id, user._id, follow))
            if(thisUser._id === user._id) return null
          return (
            <div key={indx} className='flex flex-col  border-b-white border-[0.25px]'>
              <div className=' py-5 px-5'>
                <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  <img  className='rounded-full w-16' src={user.imageUrl}></img>
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
  )
}

export default Follow
