import SideBar from './SideBar'
import { pseudoUsers  } from '../assets/assets'
import { messages } from '../assets/assets'

function Messages() {
  return (
    <div className='w-full flex-row flex min-h-screen bg-black text-white'>
      <SideBar />

      <div className='w-[50%]  border-r border-gray-600'>

        <div className='flex flex-row bg-gray-950 items-center'>
        <p className='p-2 text-2xl cursor-pointer'>⬅️</p>
        <img src={pseudoUsers[2].imageUrl} className='w-20 rounded-full my-2 mx-3'></img>
        <p className='text-white text-2xl font-bold'>{pseudoUsers[2].name}</p>
        </div>

        <div className=' max-h-screen overflow-y-scroll'>
        {
          messages.map((msg, indx) => {
            return (
              <div key={indx} className={`flex flex-row justify-start ${msg.senderId === 'user1' ? '' : 'flex-row-reverse' }`}>
                <p className={` rounded-3xl p-2 mx-2 my-5  bg-gray-900 border-gray-600 border ${msg.senderId === 'user1' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {msg.text}
                </p>
              </div>
            )
          })
        }
        </div>
        
      </div>

      
    </div>
  )
}

export default Messages
