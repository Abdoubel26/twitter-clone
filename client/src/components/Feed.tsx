import { pseudoPosts } from '../assets/assets'

function Feed() {
  return (
    <div className='bg-black w-[50%] h-screen'>
      <div className='flex flex-row justify-between border-b border-b-gray-500'>
        <h1 className='text-white transition-all select-none border-b-4 border-blue-500 flex-1 text-center py-4 font-semibold hover:bg-gray-900' >For you</h1>
        <h1 className='text-white transiton-all flex-1 text-center py-4 font-semibold  hover:bg-gray-900' >Following</h1>
        <h1 className='text-white transition-all flex-1 text-center py-4 font-semibold  hover:bg-gray-900'  >Groups</h1>
      </div>
      <div className='overflow-y-scroll h-[89%]'>
        {
          pseudoPosts.map((post, indx) => {
             return (
              <div key={indx} className='flex flex-row border-b border-b-gray-700'>
                <div className='h-full'>
                <img  className='rounded-full w-13 mt-1 ml-1 border border-gray-500' src={post.poster.imageUrl}></img>
                </div>

                
                <div>
                <div className='flex flex-row'>
                  <p className='text-white font-semibold p-1 text-xl cursor-default hover:underline transition-all '>{post.poster.name}</p>
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
          })
        }

      </div>
    </div>
  )
}

export default Feed
