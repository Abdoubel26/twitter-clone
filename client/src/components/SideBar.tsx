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

function SideBar() {
  const navigate = useNavigate()
  const { logout, token, isReady } = useAuth()
  const baseClasses = "hover:bg-slate-900 rounded-full p-2 transition-all "
  const activeClasses = ' bg-gray-800 '

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

  const handlLogoutClick = () => {
    logout()
    navigate('/login')
  }

  

  return (
    <div className=" flex flex-col pr-2 pt-2 gap-4 min-h-screen scroll-m-0 w-40 items-end overflow-hidden border-r-5 border-r-gray-700">
        <NavLink to='/home' className={({ isActive }) => isActive ? baseClasses : baseClasses} ><div><HomeIcon /></div></NavLink>
        <NavLink to='/home/search' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div><SearchIcon /></div></NavLink>

        <NavLink to='/home/notifications' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}  onClick={() => setUnseenNotifs(0)}>
        <div  className="relative">
          <span className={`bg-blue-500 top-4 right-0.5 w-4.5 text-center rounded-full text-sm text-white absolute ${unseenNotifs === 0 ? 'hidden' : '*:'}`}>{unseenNotifs}</span>
          <BellIcon />
        </div></NavLink>

        <NavLink to='/home/follow' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div><FollowIcon /></div></NavLink>
        <NavLink to='/messages' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div ><ChatIcon /></div></NavLink>
        <NavLink to='/home/ai' className={({ isActive }) => isActive ? activeClasses + baseClasses : baseClasses}><div ><AiIcon /></div></NavLink>
        <div onClick={() => setIsVisible(prev => !prev)}  className="hover:bg-gray-900 rounded-full p-2"><ThreeDots /></div>
        <NavLink to='/home/post'><div className="bg-white hover:bg-gray-200 transition-all mr-1 mt-1 rounded-full"><PenIcon /></div></NavLink>

        <div onClick={handlLogoutClick} className={` ${isVisible ? 'absolute' : 'hidden'} text-white text-xl bottom-23 left-1.5 font-bold bg-black border-2 border-gray-600 p-2 rounded-2xl select-none`}>
          Logout
        </div>
    </div>

  )
}

export default SideBar
