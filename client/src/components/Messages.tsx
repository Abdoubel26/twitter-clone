import SideBar from './SideBar'
import { formattedTime, clipLongText } from '../lib/utils'
import { useSelectedUser } from '../context/selectedUserContext'
import { useState, useEffect, useRef } from 'react'
import { getAllUsers, getMessages } from '../lib/services'
import { type userType, type messageType } from '../lib/types'
import { useSocket } from '../context/socketContext'
import { useThisUser } from '../context/thisUserContext'

function Messages() {
  const { thisUser } = useThisUser()
  const { socket } = useSocket()
  const { selectedUser, setSelectedUser, initState } = useSelectedUser()

  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<messageType[]>([])
  const [allUsers, setAllUsers] = useState<userType[]>([])
  const [searchInput, setSearchInput] = useState<string>('')

  const LastRef = useRef<HTMLDivElement>(null)

  // Scroll to last message
  useEffect(() => {
    LastRef.current?.scrollIntoView()
  }, [messages])

  // Socket listener
  useEffect(() => {
    socket.on('receive-message', (message) => {
      if (message.senderId !== thisUser._id) {
        setMessages(prev => [...prev, message])
      }
    })

    return () => {
      socket.off('receive-message')
    }
  }, [socket])

  // Load all users
  useEffect(() => {
    const loadUsers = async () => {
      const response = await getAllUsers()
      if (response.success) {
        setAllUsers(response.users)
      } else {
        alert(response.message)
      }
    }
    loadUsers()
  }, [])

  // Load messages with selected user
  useEffect(() => {
    const loadMessages = async () => {
      const response = await getMessages(thisUser._id, selectedUser._id)
      if (response.success) {
        setMessages(response.messages)
      } else {
        alert(response.message)
      }
    }

    if (selectedUser !== initState) loadMessages()
  }, [selectedUser])

  // Enter key handler
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    }
    window.addEventListener('keydown', handleEnter)

    return () => {
      removeEventListener('keydown', handleEnter)
    }
  })

  // Send message
  const sendMessage = () => {
    const messageToSend: messageType = {
      senderId: thisUser._id,
      receiverId: selectedUser._id,
      text: inputText,
      seen: false,
      createdAt: new Date()
    }
    socket.emit('send-message', messageToSend)
    setMessages(prev => [...prev, messageToSend])
    setInputText('')
  }

  return (
    <div className='w-full flex-row flex min-h-screen bg-black text-white'>
      <SideBar />

      {/* Chat window */}
      <div className='w-[50%] h-screen relative border-r flex flex-col border-gray-600'>
        {/* Header */}
        <div className='flex flex-row bg-linear-to-t from-gray-950 to-gray-900 border-gray-700 border-b items-center'>
          <p className='p-2 text-2xl cursor-pointer'>⬅️</p>
          <img
            src={selectedUser.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
            className='w-20 h-20 rounded-full my-2 mx-3'
          />
          <p className='text-white text-2xl font-bold'>{selectedUser.name}</p>
        </div>

        {/* Messages */}
        <div className='bg-linear-to-l flex-1 pb-15 from-gray-950 to-gray-900 overflow-y-scroll'>
          {messages.map((msg, indx) => {
            const messageTime = formattedTime(msg.createdAt!)
            const hasTheSameTimeWithNextMessage = indx !== messages.length - 1 ? messageTime === formattedTime(messages[indx + 1].createdAt!) : false
            const hasTheSameTimeWithPreviousMessage = indx !== 0 ? messageTime === formattedTime(messages[indx - 1].createdAt!) : false

           return (
            <div
              key={indx}
              className={`flex flex-row justify-start ${msg.senderId === selectedUser._id ? '' : 'flex-row-reverse'}`}
            >
              <div className={`flex flex-col ${hasTheSameTimeWithNextMessage ? '' : "my-1"} ${hasTheSameTimeWithPreviousMessage ? '' : "my-1"}`}>
                <p
                  className={`rounded-3xl p-2 mx-1 bg-gray-900 border-gray-600 border ${
                    msg.senderId !== thisUser._id ? 'rounded-bl-none' : 'rounded-br-none'
                  }`}
                >
                  {msg.text}
                </p>
                <p
                  className={`p-1 mb-1 ${msg.senderId === selectedUser._id ? 'text-left' : 'text-right'} ${ hasTheSameTimeWithNextMessage ? 'hidden' : '' }`}
                >
                  {messageTime}
                </p>
              </div>
            </div>
          )})}
          <div ref={LastRef}></div>
        </div>

        {/* Input */}
        <div className='w-full border-t border-red-400 bottom-0 absolute flex flex-col items-center justify-center bg-gray-900'>
          <div className='w-full flex-row items-center justify-center py-2'>
            <input
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              type='text'
              className='p-2 pl-4 mx-4 my-1 text-xl text-white outline-none bg-gray-800 w-[80%] rounded-full border border-gray-700'
              placeholder='Write your message here'
            />
            <button
              onClick={() => sendMessage()}
              className='bg-blue-950 hover:bg-gray-800 transition-all text-white font-medium rouned-full p-3 mx-3 rounded-3xl'
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* User list */}
      <div className='h-screen flex flex-col flex-1'>
        <div className='p-3 bg-gray-800'>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className='text-xl w-full bg-gray-900 p-2 outline-none pl-4 rounded-full'
            placeholder='Search for users'
          />
        </div>

        <div className='flex flex-col overflow-scroll'>
          {allUsers.map((user, indx) => {
            if (user._id === thisUser._id) return null
            return (
              <div
                key={indx}
                onClick={() => setSelectedUser(user)}
                className={`hover:bg-gray-800 cursor-pointer transition-all duration-200 ${
                  user.name === selectedUser?.name ? 'bg-gray-900 hover:bg-gray-900' : 'bg-black'
                } ${
                  user.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ? '' : 'hidden'
                }`}
              >
                <div className='py-5 px-5'>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                      <img
                        className='rounded-full object-cover w-16 h-16'
                        src={user.imageUrl}
                      />
                      <div>
                        <p className='text-white font-medium cursor-pointer px-2'>{user.name}</p>
                        <p className='text-white font-normal p-2'>{clipLongText(user.bio)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Messages
