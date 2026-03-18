import SideBar from './SideBar'
import { pseudoUsers  } from '../assets/assets'
import { messages } from '../assets/assets'
import { formattedTime, clipLongText } from '../lib/utils'
import { useSelectedUser } from '../context/selectedUserContext'
import { useState } from 'react'

function Messages() {

  const { selectedUser, setSelectedUser } = useSelectedUser()
  const [searchInput, setSearchInput] = useState<string>('')


  return (
    <div className='w-full flex-row flex min-h-screen bg-black text-white'>
      <SideBar />

      <div className='w-[50%]  border-r border-gray-600'>

        <div className='flex flex-row bg-linear-to-t from-gray-950 to-gray-900 border-gray-700 border-b items-center '>
        <p className='p-2 text-2xl cursor-pointer'>⬅️</p>
        <img src={selectedUser.imageUrl || pseudoUsers[20].imageUrl} className='w-20 rounded-full my-2 mx-3'></img>
        <p className='text-white text-2xl font-bold'>{selectedUser.name}</p>
        </div>

        <div className=' bg-linear-to-l from-gray-950 to-gray-900 overflow-y-scroll max-h-[38.2%]'>
        {
          messages.map((msg, indx) => {
            return (
              <div key={indx} className={`flex flex-row justify-start ${msg.senderId === 'user1' ? '' : 'flex-row-reverse' } `}>
                <div className='flex flex-col my-4'>
                  <p className={` rounded-3xl p-2 mx-1 bg-gray-900 border-gray-600 border ${msg.senderId === 'user1' ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {msg.text}
                  </p>
                  <p  className={`p-1 ${msg.senderId === 'user1' ? 'text-left' : 'text-right' }`}>{formattedTime(msg.createdAt)}</p>
                </div>
              </div>
            )
          })
        }
        </div>
        
        <div className='w-full flex flex-col items-center justify-center bg-gray-900 '>
          <div className='w-full flex-row items-center justify-center py-2 '>
            <input type='text' className='p-2 pl-4 mx-4 my-1 text-xl text-white outline-none bg-gray-800 w-[80%] rounded-full border border-gray-700' placeholder='Write your message here'></input>
            <button className='bg-blue-950 hover:bg-gray-800 transition-all text-white font-medium rouned-full p-3 mx-3 rounded-3xl'>
              Send
            </button>
          </div>
          
        </div>
        
      </div>


        <div className='h-screen flex flex-col flex-1'>
          <div className='p-3 bg-gray-800'>
            <input onChange={(e) => setSearchInput(e.target.value) } value={searchInput}  className=' text-xl w-full bg-gray-900 p-2 outline-none pl-4 rounded-full' placeholder='Search for users'></input>
          </div>
      <div className='flex flex-col overflow-scroll  '>

        {pseudoUsers.map((user, indx) => {
          return ( 
          <div key={indx} onClick={() => setSelectedUser(user)}  className={`hover:bg-gray-800 cursor-pointer transition-all duration-200 ${ user.name === selectedUser?.name ? ' bg-gray-900 hover:bg-gray-900' : 'bg-black'} ${ user.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ? '' : 'hidden' }`}>
              <div className='py-5 px-5'>
                <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  <img  className='rounded-full w-16' src={user.imageUrl}></img>
                  <div>
                    <p className='text-white font-medium cursor-pointer px-2'>{user.name}</p>
                    <p className='text-white font-normal p-2 '>{clipLongText(user.bio)}</p>
                  </div>
                </div>
                </div>
              </div>
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
