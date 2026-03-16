import React from 'react'

function SearchInterface() {
  return (
    <div className='bg-black w-[50%]'>
      <div className=' bg-gray-950  px-5 items-center justify-center py-5  flex flex-row'>
        <input type='text' className='rounded-full w-[85%] p-2 pl-4 bg-gray-900 text-2xl placeholder:text-gray-600 text-white font-medium outline-none border-gray-700 border' placeholder='Search'></input>
        <p className='text-3xl p-1 m-1 hover:bg-gray-200 cursor-pointer  select-none bg-white rounded-full'>🔍</p>
      </div>

      <div className='flex-col flex items-center w-full flex-1 justify-center'>
        <h1 className='text-white text-5xl p-3 font-bold flex-1'>Search For Other Users' Posts...</h1>
      </div>
      
    </div>
  )
}

export default SearchInterface
