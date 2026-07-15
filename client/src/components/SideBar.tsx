import AiIcon from "../icons/AiIcon"
import BellIcon from "../icons/BellIcon"
import ChatIcon from "../icons/ChatIcon"
import FollowIcon from "../icons/FollowIcon"
import HomeIcon from "../icons/HomeIcon"
import SearchIcon from "../icons/SearchIcon"
import ThreeDots from "../icons/ThreeDots"
import PenIcon from "../icons/PenIcon"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { countUnseen } from "../lib/services"

interface SideBarProps {
  closeSidebar?: () => void;
}

function SideBar({ closeSidebar }: SideBarProps) {
  const navigate = useNavigate()
  const { logout, token, isReady } = useAuth()
  
  const baseClasses = "hover:bg-green-950/30 border border-transparent hover:border-green-800 p-2 sm:p-3 transition-all flex items-center gap-3 sm:gap-4 text-green-400 font-bold text-xs sm:text-sm tracking-wider uppercase"
  const activeClasses = 'bg-green-950/50 border-green-500 text-green-300 shadow-[2px_2px_0px_#22c55e] '

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [unseenNotifs, setUnseenNotifs] = useState<number>(0)

  useEffect(() => {
    const loadUnseenNotifs = async () => {
      const response = await countUnseen(token)
      if(response.success){
        setUnseenNotifs(response.count)
      } else {
        alert(response.messages)
      }
    }
    if(isReady) loadUnseenNotifs()
  }, [isReady])

  const handleLogoutClick = () => {
    logout()
    navigate('/login')
    if (closeSidebar) closeSidebar()
  }

  const handleItemClick = () => {
    if (closeSidebar) closeSidebar()
  }

  return (
    <div className="flex flex-col px-3 pt-3 pb-8 gap-2 sm:gap-3 h-full bg-black w-64 md:w-20 lg:w-64 border-r border-green-950 overflow-y-auto shrink-0">
        
        <button className="self-end md:hidden text-red-500 font-mono text-xs p-1 border border-red-900 mb-1 uppercase" onClick={closeSidebar}>
          [ Close_X ]
        </button>

        <NavLink to='/home' onClick={handleItemClick} className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses} >
          <HomeIcon /><span className="md:hidden lg:inline">Home</span>
        </NavLink>
        
        <NavLink to='/home/search' onClick={handleItemClick} className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}>
          <SearchIcon /><span className="md:hidden lg:inline">Search</span>
        </NavLink>

        <NavLink to='/home/notifications' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses} onClick={() => { setUnseenNotifs(0); handleItemClick(); }}>
          <div className="relative flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <span className={`bg-green-500 -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[10px] text-black font-bold border border-black absolute animate-pulse ${unseenNotifs === 0 ? 'hidden' : ''}`}>{unseenNotifs}</span>
              <BellIcon />
            </div>
            <span className="md:hidden lg:inline">Notifications</span>
          </div>
        </NavLink>

        <NavLink to='/home/follow' onClick={handleItemClick} className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}>
          <FollowIcon /><span className="md:hidden lg:inline">Follows</span>
        </NavLink>
        
        <NavLink to='/messages' onClick={handleItemClick} className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}>
          <ChatIcon /><span className="md:hidden lg:inline">Messages</span>
        </NavLink>
        
        <NavLink to='/home/ai' onClick={handleItemClick} className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}>
          <AiIcon /><span className="md:hidden lg:inline">AI Assistant</span>
        </NavLink>
        
        <div onClick={() => setIsVisible(prev => !prev)} className="hover:bg-green-950/30 border border-transparent hover:border-green-800 p-2 sm:p-3 flex items-center gap-3 sm:gap-4 cursor-pointer text-green-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
          <ThreeDots /><span className="md:hidden lg:inline">More</span>
        </div>
        
        <NavLink to='/home/post' onClick={handleItemClick}>
          <div className="bg-green-500 hover:bg-green-400 text-black font-bold p-2.5 sm:p-3 flex justify-center items-center gap-2 tracking-wider uppercase text-xs sm:text-sm shadow-[2px_2px_0px_#22c55e] active:translate-y-px">
            <PenIcon /><span className="md:hidden lg:inline">Post</span>
          </div>
        </NavLink>

        <div onClick={handleLogoutClick} className={` ${isVisible ? 'absolute' : 'hidden'} text-red-500 text-xs font-mono uppercase font-bold bottom-20 left-4 bg-black border border-red-900 p-3 cursor-pointer select-none z-50 shadow-[2px_2px_0px_#ef4444]`}>
          [ LOG_OUT ]
        </div>
    </div>
  )
}

export default SideBar