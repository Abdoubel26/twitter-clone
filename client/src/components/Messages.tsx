import SideBar from './SideBar'
import Profile from '../components/Profile'
import { formattedTime, clipLongText } from '../lib/utils'
import { useSelectedUser } from '../context/selectedUserContext'
import { useState, useEffect, useRef, useCallback } from 'react'
import { getAllUsers, getMessages, getUnseenMessages, seeMessages } from '../lib/services'
import { type userType, type messageType } from '../lib/types'
import { useSocket } from '../context/socketContext'
import { useThisUser } from '../context/thisUserContext'
import { useAuth } from '../context/authContext'

function Messages() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { token, isReady } = useAuth()
  const { thisUser } = useThisUser()
  const { socket } = useSocket()
  const { selectedUser, setSelectedUser, initState } = useSelectedUser()

  const [inputText, setInputText] = useState<string>('')
  const [messages, setMessages] = useState<messageType[]>([])
  const [allUsers, setAllUsers] = useState<userType[]>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [unseenMessages, setUnseenMessages] = useState<messageType[]>([])

  const LastRef = useRef<HTMLDivElement>(null)
  const isUserSelected = selectedUser !== initState

  useEffect(() => {
    LastRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    socket.on('receive-message', (message) => {
      if (message.senderId !== thisUser._id && message.senderId === selectedUser._id) {
        setMessages(prev => [...prev, message])
      } else if(message.senderId !== selectedUser._id){
        setUnseenMessages(prev => [...prev, message])
      }
    })

    return () => {
      socket.off('receive-message')
    }
  }, [socket, selectedUser])

  useEffect(() => {
    const runSeeMessages = async () => {
      const response = await seeMessages(selectedUser._id, token)
      if(response.success){
        setUnseenMessages(prev => prev.filter(unsnmsg => unsnmsg.senderId !== selectedUser._id))
      } else {
        alert(response.message)
      }
    }
    if(isReady && isUserSelected) runSeeMessages()
  }, [isReady, selectedUser])

  useEffect(() => {
    const loadUnseenMessages = async () => {
      const response = await getUnseenMessages(token) 
      if(response.success){
        setUnseenMessages(response.unseenMessages)
      } else {
        alert(response.message)
      }
    }
    if(isReady) loadUnseenMessages()
  }, [isReady])

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

  const sendMessage = useCallback(() => {
    if(inputText !== "" && isUserSelected){
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
  }, [inputText, selectedUser])

  useEffect(() => {
    const loadMessages = async () => {
      const response = await getMessages(thisUser._id, selectedUser._id)
      if (response.success) {
        setMessages(response.messages)
      } else {
        alert(response.message)
      }
    }

    if (isUserSelected) loadMessages()
  }, [selectedUser])

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    }
    window.addEventListener('keydown', handleEnter)

    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [sendMessage])

  return (
    <div className='w-full flex flex-row h-screen overflow-hidden bg-black text-green-400 font-mono selection:bg-green-500 selection:text-black relative'>
      
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out h-full overflow-y-auto md:relative md:translate-x-0 md:flex shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <SideBar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        <div className="flex md:hidden items-center justify-between p-4 border-b border-green-950 bg-zinc-950 shrink-0 z-20">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="text-green-400 font-mono text-xl focus:outline-none border border-green-900 px-2 py-0.5 hover:bg-green-950/20 active:bg-green-500 active:text-black"
          >
            [ MENU ]
          </button>
          <span className="font-mono font-bold text-sm tracking-widest text-green-500">&gt;_ LOG_MAIN</span>
          <button 
            onClick={() => setIsProfileOpen(true)} 
            className="text-green-400 font-mono text-xl focus:outline-none border border-green-900 px-2 py-0.5 hover:bg-green-950/20 active:bg-green-500 active:text-black"
          >
            [ USER ]
          </button>
        </div>

        <div className="flex-1 flex flex-row h-full overflow-hidden">
          
          <div className={`w-full md:w-[55%] h-full relative border-r border-green-950 flex flex-col ${!isUserSelected ? 'hidden md:flex' : 'flex'}`}>
            <div className='flex flex-row bg-zinc-950 border-green-950 border-b items-center p-3 justify-between shrink-0'>
              <div className="flex flex-row items-center min-w-0">
                <button 
                  className='text-red-500 font-bold text-xs uppercase px-2 py-1 border border-red-900 hover:bg-red-950/30 active:translate-y-[1px] mr-3' 
                  onClick={() => {
                    setSelectedUser(initState)
                    setMessages([])
                    setInputText('')
                  }}
                >
                  [ BACK ]
                </button>
                
                {isUserSelected && (
                  <>
                    <img
                      src={selectedUser.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      className='w-10 h-10 border border-green-800 object-cover filter grayscale mr-3'
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className='text-green-400 text-sm font-bold uppercase tracking-wider truncate'>{selectedUser.name}</p>
                      <p className="text-[10px] text-green-700">COMMS_LINK: ESTABLISHED</p>
                    </div>
                  </>
                )}
              </div>
              <span className="text-xs text-green-700 animate-pulse hidden sm:inline">● SYS_LIVE</span>
            </div>

            <div className='bg-black flex-1 overflow-y-auto p-4 flex flex-col gap-3 pb-24'>
              {isUserSelected ? (
                messages.map((msg, indx) => {
                  const messageTime = formattedTime(msg.createdAt!)
                  const hasTheSameTimeWithNextMessage = indx !== messages.length - 1 ? messageTime === formattedTime(messages[indx + 1].createdAt!) : false
                  const hasTheSameTimeWithPreviousMessage = indx !== 0 ? messageTime === formattedTime(messages[indx - 1].createdAt!) : false

                  return (
                    <div key={indx} className={`flex flex-row w-full ${msg.senderId === selectedUser._id ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex flex-col max-w-[85%] ${hasTheSameTimeWithNextMessage ? '' : "my-1"} ${hasTheSameTimeWithPreviousMessage ? '' : "my-1"}`}>
                        <p className={`p-3 text-xs md:text-sm border ${
                          msg.senderId !== thisUser._id 
                            ? 'bg-zinc-950 border-green-950 text-green-300' 
                            : 'bg-green-950/20 border-green-500 text-green-200 shadow-[1px_1px_0px_#22c55e]'
                        }`}>
                          {msg.text}
                        </p>
                        <p className={`text-[9px] text-green-700 mt-1 uppercase ${msg.senderId === selectedUser._id ? 'text-left' : 'text-right'} ${hasTheSameTimeWithNextMessage ? 'hidden' : ''}`}>
                          {messageTime}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-green-800 tracking-widest text-xs border border-dashed border-green-950/50 m-2 p-6">
                  <span>[ AWAITING ACTIVE SELECTION SIGNAL ]</span>
                  <span className="text-[10px] text-green-900 mt-2">CHOOSE A NODE FROM THE RIGHT DIRECTORY</span>
                </div>
              )}
              <div ref={LastRef}></div>
            </div>

            {isUserSelected && (
              <div className='w-full border-t border-green-950 bottom-0 absolute bg-zinc-950 p-3 z-10'>
                <div className='flex flex-row items-center gap-2'>
                  <input
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                    type='text'
                    className='flex-1 p-2 text-sm text-green-400 outline-none bg-black border border-green-900 focus:border-green-500 font-mono'
                    placeholder='TRANSMIT STATEMENT...'
                  />
                  <button
                    onClick={() => sendMessage()}
                    className='bg-transparent text-green-400 font-bold py-2 px-4 border border-green-500 hover:bg-green-500/20 active:translate-y-[1px] text-xs uppercase tracking-wider shadow-[2px_2px_0px_#22c55e]'
                  >
                    [ SEND ]
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={`h-full flex flex-col flex-1 bg-black ${isUserSelected ? 'hidden md:flex' : 'flex'}`}>
            <div className='p-3 bg-zinc-950 border-b border-green-950 shrink-0 flex items-center gap-2'>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className='text-xs flex-1 bg-black border border-green-900 focus:border-green-500 p-2.5 outline-none font-mono text-green-400 placeholder-green-950 uppercase tracking-widest'
                placeholder='FILTER COGNITIVE DIRECTORY...'
              />
            </div>

            <div className='flex-1 overflow-y-auto flex flex-col pb-6'>
              {allUsers.map((user, indx) => {
                if (user._id === thisUser._id) return null
                const unseenMessagesFromThisUser = unseenMessages.filter(msg => msg.senderId === user._id)
                return (
                  <div
                    key={indx}
                    onClick={() => setSelectedUser(user)}
                    className={`border-b border-green-950/40 cursor-pointer relative transition-all duration-200 ${
                      user._id === selectedUser?._id 
                        ? 'bg-green-950/15 border-l-2 border-l-green-500' 
                        : 'bg-black hover:bg-green-950/5'
                    } ${
                      user.name.toLowerCase().includes(searchInput.toLowerCase()) ? '' : 'hidden'
                    }`}
                  >
                    <div className='p-4'>
                      <div className='flex flex-row justify-between items-center gap-3'>
                        <div className='flex flex-row items-center gap-3 min-w-0'>
                          <img
                            className='w-11 h-11 border border-green-800 object-cover shrink-0 filter grayscale'
                            src={user.imageUrl}
                            alt=""
                          />
                          <div className="min-w-0">
                            <p className='text-green-400 font-bold truncate text-sm uppercase tracking-wider'>{user.name}</p>
                            <p className='text-green-700 text-[10px] truncate mt-0.5'>{clipLongText(user.bio)}</p>
                          </div>
                        </div>
                        {unseenMessagesFromThisUser.length > 0 && (
                          <span className='bg-green-500 text-black px-1.5 py-0.5 font-bold text-[10px] border border-green-500 animate-pulse shrink-0'>
                            {unseenMessagesFromThisUser.length} NEW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      <div className={`
        fixed inset-y-0 right-0 z-40 w-[85%] sm:w-100 transform transition-transform duration-300 ease-in-out h-full
        lg:relative lg:translate-x-0 lg:w-[350px] lg:flex lg:z-0 shrink-0
        ${isProfileOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>

      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}

    </div>
  )
}

export default Messages