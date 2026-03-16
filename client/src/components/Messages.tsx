import SideBar from './SideBar'
import { pseudoUsers  } from '../assets/assets'
import { messages } from '../assets/assets'
import { formattedTime } from '../lib/utils'

function Messages() {
  return (
    <div className='w-full flex-row flex min-h-screen bg-black text-white'>
      <SideBar />

      <div className='w-[50%]  border-r border-gray-600'>

        <div className='flex flex-row bg-gray-950 items-center '>
        <p className='p-2 text-2xl cursor-pointer'>⬅️</p>
        <img src={pseudoUsers[2].imageUrl} className='w-20 rounded-full my-2 mx-3'></img>
        <p className='text-white text-2xl font-bold'>{pseudoUsers[2].name}</p>
        </div>

        <div className=' overflow-y-scroll max-h-[40%]'>
        {
          messages.map((msg, indx) => {
            return (
              <div key={indx} className={`flex flex-row justify-start ${msg.senderId === 'user1' ? '' : 'flex-row-reverse' }`}>
                <div className='flex flex-col my-4'>
                  <p className={` rounded-3xl p-2  bg-gray-900 border-gray-600 border ${msg.senderId === 'user1' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {msg.text}
                  </p>
                  <p  className={`p-1 ${msg.senderId === 'user1' ? 'text-left' : 'text-right' }`}>{formattedTime(msg.createdAt)}</p>
                </div>
              </div>
            )
          })
        }
        </div>
        
        <div className='w-full flex flex-col items-center justify-center bg-gray-900 h-14'>
          <div className='w-full flex-row items-center justify-center py-2 '>
            <input type='text' className='p-2 pl-4 mx-4 my-1 text-xl text-white outline-none bg-gray-800 w-[80%] rounded-full border border-gray-700' placeholder='Write your message here'></input>
            <button className='bg-blue-950 hover:bg-gray-800 transition-all text-white font-medium rouned-full p-3 mx-3 rounded-3xl'>
              Send
            </button>
          </div>
          
        </div>
        
      </div>


      <div>

      </div>

      
    </div>
  )
}

export default Messages
