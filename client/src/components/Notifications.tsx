import { useEffect, useState } from 'react'
import FollowIcon from '../icons/FollowIcon'
import { type notifType } from '../lib/types'
import { getNotifications, seeNotifs } from '../lib/services'
import { useAuth } from '../context/authContext'
import { formattedTime } from '../lib/utils'

function Notifications() {
  const { token, isReady } = useAuth()
  const [notifs, setNotifs] = useState<notifType[]>([])

  useEffect(() => {
    const loadNotifs = async () => {
      const response = await getNotifications(token)
      if(response.success){
        setNotifs(response.notifications)
      }
    }
    const removeBadge = async () => {
     const response = await seeNotifs(token)
      if(response.success){
        console.log(response.message)
      }
    }
    
    if(isReady) {
      loadNotifs()
      removeBadge()
     }
  }, [isReady])

  return (
    <div className='bg-black w-full h-screen overflow-hidden flex flex-col border-r border-r-gray-700'>
      <div className='flex flex-col bg-gray-900 shrink-0'>
        <h1 className='text-4xl font-extrabold text-white p-5' >Notifications</h1>
      </div>
      <div className='flex-col-reverse flex overflow-y-auto flex-1 pb-10'>
        {notifs.map((notification, indx) => {
          return (
            <div key={indx} className='flex flex-col border-b-white border-[0.25px] shrink-0'>
              <div className=' py-5 px-5'>
                <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <img  className='rounded-full w-16 h-16 object-cover' src={notification.from.imageUrl} alt="" />
                    <p className='text-white font-medium flex-row flex mx-1'><span className='cursor-pointer hover:underline'>{notification.from.name}</span></p> <span className='font-normal mx-1 text-white'>{notification.type === 'follow' ? ' followed you' : ' liked your post'}</span>  <span className=' mx-1 text-3xl'>{notification.type === 'follow' ? <div className=' items-center h-full'><FollowIcon/></div> : '❤️'}</span>
                </div>
                <p className='text-white'>{formattedTime(notification.CreatedAt)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Notifications