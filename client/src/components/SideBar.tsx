import AiIcon from "../icons/AiIcon"
import BellIcon from "../icons/BellIcon"
import ChatIcon from "../icons/ChatIcon"
import FollowIcon from "../icons/FollowIcon"
import HomeIcon from "../icons/HomeIcon"
import ProfileIcon from "../icons/ProfileIcon"
import SearchIcon from "../icons/SearchIcon"
import ThreeDots from "../icons/ThreeDots"
import PenIcon from "../icons/PenIcon"
import { NavLink  } from "react-router-dom"
import { useState } from "react"

function SideBar() {
  const baseClasses = "hover:bg-slate-900 rounded-full p-2 transition-all "
  const activeClasses = ' bg-gray-800 '

  const [isVisible, setIsVisible] = useState<boolean>(false)

  return (
    <div className="flex flex-col pr-2 pt-2 gap-4 min-h-screen scroll-m-0 w-40 items-end overflow-hidden bg-black border-r-5 border-r-gray-700">
        <NavLink to='/home' className={({ isActive }) => isActive ? baseClasses : baseClasses} ><div><HomeIcon /></div></NavLink>
        <NavLink to='/home/search' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div><SearchIcon /></div></NavLink>
        <NavLink to='/home/notifications' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div ><BellIcon /></div></NavLink>
        <NavLink to='/home/follow' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div><FollowIcon /></div></NavLink>
        <NavLink to='/messages' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div ><ChatIcon /></div></NavLink>
        <NavLink to='/home/ai' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div ><AiIcon /></div></NavLink>
        <div onClick={() => setIsVisible(prev => !prev)}  className="hover:bg-gray-900 rounded-full p-2"><ThreeDots /></div>
        <NavLink to='/home/post'><div className="bg-white hover:bg-gray-200 transition-all mr-1 mt-1 rounded-full"><PenIcon /></div></NavLink>

        <div className={` ${isVisible ? 'absolute' : 'hidden'} text-white text-2xl bottom-25 left-1.5 font-bold bg-black shadow-gray-500 shadow p-2 rounded-2xl select-none`}>
          Logout
        </div>
    </div>

  )
}

export default SideBar
