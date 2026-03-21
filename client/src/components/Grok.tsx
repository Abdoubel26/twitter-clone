import { useState, useEffect, useRef, useCallback } from "react"
import AiIcon from "../assets/ai-svgrepo-com.svg"
import { CallAi } from "../lib/services"
import ReactMarkdown from 'react-markdown'

type aiMessagesType = {
  text: string,
  fromAi: boolean,
  createdAt: Date,
}

type convaElementType = {
  ISaid: string,
  youSaid: string,
}

function Grok() {

  const [aiMessages, setAiMessages] = useState<aiMessagesType[]>([{text: "Hi, how can I help you today?", fromAi: true, createdAt: new Date()}])
  const [inputText, setInputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const lastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastRef.current?.scrollIntoView()
  }, [aiMessages])

  const HandleSend = () => {
    console.log('hanlde send called')
    if(inputText !== '' && !isLoading){
      const Send = async () => {
      const userMessage: aiMessagesType = {
        text: inputText,
        fromAi: false,
        createdAt: new Date()
      }
      setIsLoading(true)
      setAiMessages(prev => [...prev, userMessage])
      setInputText('')
      const airesponse = await CallAi(inputText)
      console.log(airesponse)
      if(airesponse.success){
        const aimessage: aiMessagesType = {
          text: airesponse.response.candidates[0].content.parts[0].text,
          fromAi: true,
          createdAt: new Date()
        }
        setAiMessages(prev => [...prev, aimessage])
      } else {
        const errorMessage: aiMessagesType = {
          text: "Sorry, I couldn't process your request. Please try again",
          fromAi: true,
          createdAt: new Date()
        }
        setAiMessages(prev => [...prev, errorMessage])
      }
      setIsLoading(false)
    }
    Send()
    } }

  useEffect(() => {
      const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          HandleSend()
        }
      }
      window.addEventListener('keydown', handleEnter)
  
      return () => {
        removeEventListener('keydown', handleEnter)
      }
    }, [inputText])

  return (
    <div className='w-[50%] flex flex-col  text-white h-screen relative'>

     <div className='flex flex-row bg-linear-to-t from-gray-950 to-gray-900  items-center '>
        <p className='p-2 text-3xl cursor-pointer'>⬅️</p>
            <img src={AiIcon} className='w-20 bg-white rounded-full my-2 mx-3'></img>
        <p className='text-white text-2xl font-bold'>Grok</p>
      </div>

      <div className=' flex-1 pb-10 bg-linear-to-t from-gray-950 to-gray-900 overflow-y-scroll '>
              {
                aiMessages.map((msg, indx) => {
                  const cleanText = msg.text.replace(/\\\*/g, "*").replace(/\\\_/g, "_")
                  return (
                    <div key={indx} className={`flex flex-row justify-start mb-7 ${msg.fromAi ? '' : 'flex-row-reverse' }`}>
                      <div className='flex flex-col'>
                        <div className={` rounded-3xl p-2 overflow-x-clip mx-1 max-w-150 my-2 bg-gray-900 border-gray-600 border ${msg.fromAi  ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                        <ReactMarkdown>{cleanText}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            {
              isLoading ?
            <div className="loader my-5 mx-2 mb-10">
                <div className="circle">
                  <div className="dot"></div>
                  <div className="outline"></div>
                </div>
                <div className="circle">
                  <div className="dot"></div>
                  <div className="outline"></div>
                </div>
                <div className="circle">
                  <div className="dot"></div>
                  <div className="outline"></div>
                </div>
                  <div className="circle">
                  <div className="dot"></div>
                <div className="outline"></div>
              </div>
            </div> : null }
            <div ref={lastRef}></div>
      </div>

      <div className='w-full bottom-0 absolute flex flex-col items-center justify-center bg-gray-900 h-15'>
          <div className='w-full flex-row items-center justify-center py-2 '>
            <input onChange={e => setInputText(e.target.value)} value={inputText}  type='text' className='p-2 pl-4 mx-4 my-1 text-xl text-white outline-none bg-gray-800 w-[80%] rounded-full border border-gray-700' placeholder='Write your prompt here'></input>
            <button onClick={HandleSend} className='bg-blue-950 hover:bg-gray-800 transition-all text-white font-medium rouned-full p-3 mx-3 rounded-3xl'>
              Send
            </button>
          </div>
          
        </div>




    </div>
  )
}

export default Grok
