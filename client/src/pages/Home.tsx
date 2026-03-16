import Profile from "../components/Profile"
import SideBar from "../components/SideBar"
import { Outlet } from 'react-router-dom'


function Home() {
  return (
    <div className="flex flex-row min-h-screen  ">
      <SideBar />
      <Outlet />
      <Profile />
                
      
      
    </div>
  )
}

export default Home
