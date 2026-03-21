import { useState } from "react"
import AiIcon from "../assets/ai-svgrepo-com.svg"

type aiMessagesType = {
  text: string,
  fromAi: boolean,
  createdAt: Date,
}

function Grok() {

  const [aiMessages, setAiMessages] = useState<aiMessagesType[]>([])

  return (
    <div className='w-[50%] text-white'>

     <div className='flex flex-row bg-linear-to-t from-gray-950 to-gray-900  items-center '>
        <p className='p-2 text-3xl cursor-pointer'>⬅️</p>
            <img src={AiIcon} className='w-20 bg-white rounded-full my-2 mx-3'></img>
        <p className='text-white text-2xl font-bold'>Grok</p>
      </div>

      <div className=' bg-linear-to-t from-gray-950 to-gray-900 overflow-y-scroll max-h-[53%]'>
              {
                aiMessages.map((msg, indx) => {
                  return (
                    <div key={indx} className={`flex flex-row justify-start ${msg.fromAi ? '' : 'flex-row-reverse' }`}>
                      <div className='flex flex-col my-4'>
                        <p className={` rounded-3xl p-2 mx-1  bg-gray-900 border-gray-600 border ${msg.fromAi  ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                        {msg.text}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
      </div>

      <div className='w-full flex flex-col items-center justify-center bg-gray-900 h-15'>
          <div className='w-full flex-row items-center justify-center py-2 '>
            <input type='text' className='p-2 pl-4 mx-4 my-1 text-xl text-white outline-none bg-gray-800 w-[80%] rounded-full border border-gray-700' placeholder='Write your prompt here'></input>
            <button className='bg-blue-950 hover:bg-gray-800 transition-all text-white font-medium rouned-full p-3 mx-3 rounded-3xl'>
              Send
            </button>
          </div>
          
        </div>




    </div>
  )
}

export default Grok
