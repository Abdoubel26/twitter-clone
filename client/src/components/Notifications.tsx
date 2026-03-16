import { pseudoNotifications } from '../assets/assets'

function Notifications() {
  return (
    <div className='w-[50%] bg-black max-h-screen'>
      <div className='flex flex-col bg-gray-900  '>
        <h1 className='text-4xl font-extrabold text-white p-5' >Notifications</h1>
      </div>

            <div className='flex-col overflow-y-scroll max-h-screen'>
              {pseudoNotifications.map((notification, indx) => {
                return (
                  <div key={indx} className='flex flex-col  border-b-white border-[0.25px]'>
                    <div className=' py-5 px-5'>
                      <div className='flex flex-row justify-between items-center'>
                      <div className='flex flex-row'>
                        <img  className='rounded-full w-16' src={notification.from.imageUrl}></img>
                        <div>
                          <p className='text-white font-medium'><span className='cursor-pointer hover:underline'>{notification.from.name} </span><span className='font-normal'>{notification.type === 'follow' ? 'followed you' : 'liked your post'}</span></p>
                          <p className='text-white font-normal p-2'></p>
                        </div>
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
