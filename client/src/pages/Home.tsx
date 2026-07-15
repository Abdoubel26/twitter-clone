import { useState } from "react"
import Profile from "../components/Profile"
import SideBar from "../components/SideBar"
import { Outlet } from 'react-router-dom'

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="flex flex-row h-screen w-screen bg-black text-white relative overflow-hidden">
      
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out h-full overflow-y-auto
        md:relative md:translate-x-0 md:flex shrink-0
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

        <main className="flex-1 h-full overflow-y-auto">
          <Outlet context={{ setIsSidebarOpen }} />
        </main>
      </div>

      <div className={`
        fixed inset-y-0 right-0 z-40 w-[85%] sm:w-100 transform transition-transform duration-300 ease-in-out h-full
        lg:relative lg:translate-x-0 lg:w-87.5 lg:flex lg:z-0 shrink-0
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

export default Home