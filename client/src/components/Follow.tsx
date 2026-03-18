import React from 'react'
import { pseudoUsers } from '../assets/assets'
import { clipLongText } from '../lib/utils'

function Follow() {
  return (
    <div className='bg-black w-[50%] '>

      <div className='flex flex-col bg-gray-900 '>
        <h1 className='text-4xl font-extrabold text-white p-5' >Who to Follow</h1>
      </div>
      <div className='flex flex-col overflow-y-scroll max-h-[14.5%]'>
        {pseudoUsers.map((user, indx) => {
          return (
            <div key={indx} className='flex flex-col  border-b-white border-[0.25px]'>
              <div className=' py-5 px-5'>
                <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  <img  className='rounded-full w-16' src={user.imageUrl}></img>
                  <div>
                    <p className='text-white font-medium cursor-pointer hover:underline px-2'>{user.name}</p>
                    <p className='text-white font-normal p-2'>{clipLongText(user.bio)}</p>
                  </div>
                  
                </div>
                
                <button className='bg-white rounded-full font-bold h-fit py-2 px-5 select-none hover:bg-gray-200 '>
                  follow
                </button>
                </div>
                
              </div>
            </div>
          )
        })}
      </div>

     
    </div>
  )
}

export default Follow
