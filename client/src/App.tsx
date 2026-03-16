import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Follow from "./components/Follow"
import Messages from "./components/Messages"
import Grok from "./components/Grok"
import Profile from "./components/Profile"
import Post from './components/Post'
import Feed from "./components/Feed"
import SearchInterface from "./components/SearchInterface"
import Notifications from "./components/Notifications"


function App() {

  return (
    <div className='fixed'>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}>
        <Route index element={<Feed />}></Route>
        <Route path="search" element={<SearchInterface />}></Route>
        <Route path="notifications" element={<Notifications />} ></Route>
        <Route path="follow" element={<Follow />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="post" element={<Post />}></Route>
      </Route>
      <Route path="/messages" element={<Messages />}></Route>
      <Route path="/ai" element={<Grok />}></Route>
    </Routes>
    </div>
  )
}

export default App
