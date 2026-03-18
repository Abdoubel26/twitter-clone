
function Post() {
  return (
    <div className='w-[50%] h-screen bg-linear-to-l from-gray-950 to-gray-900'>

      <form className='w-full h-full flex flex-col items-center justify-center'>
      <textarea placeholder='Post Text' rows={3} className='bg-black placeholder:text-gray-500 resize-none border border-gray-700 rounded-2xl p-3 w-100 outline-none text-white font-medium' required ></textarea>
      <input placeholder='Past Post Image URL' type='URL' className='bg-black placeholder:text-gray-500 resize-none border border-gray-700 rounded-2xl p-4 w-100 outline-none text-white font-medium my-4'  required></input>
      <button className=' w-100 my-3 text-black p-2 rounded-full font-extrabold cursor-pointer hover:bg-gray-300 transition-all duration-200 bg-gray-100 active:bg-white'>
        Post
      </button>

      </form>
      
    </div>
  )
}

export default Post
