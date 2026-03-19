import { pseudoNotifications } from '../assets/assets'
import FollowIcon from '../icons/FollowIcon'

function Notifications() {
  return (
    <div className='w-[50%] bg-black max-h-screen'>
      <div className='flex flex-col bg-gray-900  '>
        <h1 className='text-4xl font-extrabold text-white p-5' >Notifications</h1>
      </div>
            <div className='flex-col overflow-y-scroll max-h-[85%]'>
              {pseudoNotifications.map((notification, indx) => {
                return (
                  <div key={indx} className='flex flex-col border-b-white border-[0.25px]'>
                    <div className=' py-5 px-5'>
                      <div className='flex flex-row justify-between items-center'>
                      <div className='flex flex-row'>
                        <img  className='rounded-full w-16' src={notification.from.imageUrl}></img>
                          <p className='text-white font-medium flex-row flex mx-1'><span className='cursor-pointer hover:underline'>{notification.from.name}</span><span className='font-normal mx-1'>{notification.type === 'follow' ? ' followed you' : ' liked your post'}</span>  <span className=' mx-4 text-3xl'>{notification.type === 'follow' ? <div className='w-5 h-4'><FollowIcon/></div> : '❤️'}</span></p>
                      </div>
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
