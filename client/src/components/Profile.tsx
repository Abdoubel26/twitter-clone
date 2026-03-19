import { useEffect, useState } from 'react'
import { getUser } from '../lib/services'
import { pseudoPosts } from '../assets/assets'
import { useAuth } from '../context/authContext'

function Profile() {

  const { token } = useAuth()

  useEffect(() => {
    const loadUser = async () => {
      const response = await getUser(token)
      if(response.success){
        setThisUser(response.user)
      } else {
        alert(response.detail)
      }
    }
    loadUser()

  }, [])

  const [thisUser, setThisUser] = useState({name: "", bannerImageUrl: "", ImageUrl: " ", bio: "" })


  const thisUsersPost = pseudoPosts.filter((post) => post.poster.name === thisUser.name )

  return (
    
    <div className='bg-black text-white flex-1 overflow-y-scroll max-h-screen border-l border-l-gray-700 flex flex-col '>

      <div className='w-full h-40 relative select-none'>
          <img src={thisUser.bannerImageUrl} />
          <img src={thisUser.ImageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" } className='rounded-full w-33 absolute top-23 left-3 z-10 border-3 border-black' />
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-white text-2xl font-bold mt-17 ml-3 '>{thisUser.name}</p>
        <div>
          <button className='bg-black border py-2 px-4 m-2 rounded-full border-gray-500 font-semibold text-white cursor-pointer'>
          Edit Profile
        </button>
        </div>
        </div>

        <div className='border-b border-b-gray-600'>
          <p className='text-white px-2 py-5'>{thisUser.bio}</p>
        </div>

        <div>
          {  thisUsersPost.length !== 0 ? 
          thisUsersPost.map((post, indx) => {
            if(post.poster.name === thisUser.name){
            return (
              <div key={indx} className='flex flex-row border-b border-b-gray-700'>
                <div className='h-full'>
                <img  className='rounded-full w-13 mt-1 ml-1 border border-gray-500' src={post.poster.ImageUrl}></img>
                </div>

                
                <div>
                <div className='flex flex-row'>
                  <p className='text-white font-semibold p-1 text-xl cursor-default hover:underline transition-all px-2'>{post.poster.name}</p>
                </div>
                  <p className='text-white p-1 font-medium'>{post.text}</p>
                  <img className='w-100 border-gray-800 border max-h-120 mt-1 rounded-2xl' src={post.ImageUrl}></img>
                  <div className='flex flex-row justify-between '>
                  <p className='text-white text-lg  cursor-pointer'>💬{Math.floor(post.likeCount - (post.likeCount/2))}</p>
                  <p className='text-lg text-white  cursor-pointer'>🔖{Math.floor(Math.abs(post.likeCount - Math.sqrt(post.likeCount)))}</p>
                  <p className='text-white text-lg  cursor-pointer'>❤️<span>{post.likeCount}</span></p>
                </div>
                </div>
                
              </div>
            )

          } 
        }

        ) :  (
              <h1 className='text-white font-bold text-3xl p-3'>{thisUser.name.split(" ")[0] || "This user"} doesn't have any posts yet...</h1>
            )

          }
          
        </div>

    </div>
  )
}

export default Profile
