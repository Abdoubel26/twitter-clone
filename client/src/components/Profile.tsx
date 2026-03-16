import { pseudoUsers  } from '../assets/assets'
import { pseudoPosts } from '../assets/assets'

function Profile() {

  const thisUser = pseudoUsers[20]
  const thisUsersPost = pseudoPosts.filter((post) => post.poster.name === thisUser.name )

  return (
    
    <div className='bg-black text-white flex-1 overflow-y-scroll max-h-screen border-l border-l-gray-700 flex flex-col '>

      <div className='w-full h-40 relative select-none'>
          <img src={thisUser.bannerImageUrl} />
          <img src={thisUser.imageUrl} className='rounded-full absolute top-23 left-3 z-10 border-3 border-black' />
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-white text-2xl font-bold mt-15 ml-3 '>{thisUser.name}</p>
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
                <img  className='rounded-full w-13 mt-1 ml-1 border border-gray-500' src={post.poster.imageUrl}></img>
                </div>

                
                <div>
                <div className='flex flex-row'>
                  <p className='text-white font-semibold p-1 text-xl cursor-default hover:underline transition-all px-2'>{post.poster.name}</p>
                </div>
                  <p className='text-white p-1 font-medium'>{post.text}</p>
                  <img className='w-100 border-gray-800 border max-h-120 mt-1 rounded-2xl' src={post.imageUrl}></img>
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
              <h1 className='text-white font-bold text-3xl p-3'>This user doesn't have any posts...</h1>
            )

          }
          
        </div>

    </div>
  )
}

export default Profile
