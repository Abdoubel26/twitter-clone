import { useState, useEffect, useRef } from "react"
import AiIcon from "../assets/ai-svgrepo-com.svg"
import { runChat } from "../lib/services"
import ReactMarkdown from 'react-markdown'

type aiMessagesType = {
  text: string,
  fromAi: boolean,
  createdAt: Date,
}

type convoElementType = {
  ISaid: string,
  youSaid: string,
}

function Grok() {
  const [convos, setConvos] = useState<convoElementType[]>([])
  const [aiMessages, setAiMessages] = useState<aiMessagesType[]>([{text: "Hi, how can I help you today?", fromAi: true, createdAt: new Date()}])
  const [inputText, setInputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const lastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages])

  const HandleSend = () => {
    const textAndConvos = convos.map(convo => `I Said: ${convo.ISaid}  You Said: ${convo.youSaid}`).join(' ').concat(` prompt: ${inputText}`)
    if(inputText.trim() !== '' && !isLoading){
      const Send = async () => {
      const userMessage: aiMessagesType = {
        text: textAndConvos,
        fromAi: false,
        createdAt: new Date()
      }
      setIsLoading(true)
      setAiMessages(prev => [...prev, {...userMessage, text: inputText}])
      setInputText('')
      const airesponse = await runChat(inputText)
      
      if(airesponse.success){
        const aimessage: aiMessagesType = {
          text: airesponse.text,
          fromAi: true,
          createdAt: new Date()
        }
        setConvos(prev => [...prev, {ISaid: inputText, youSaid: aimessage.text}])
        setAiMessages(prev => [...prev, aimessage])
      } else {
        const errorMessage: aiMessagesType = {
          text: "Sorry, I couldn't process your request. Please try again.",
          fromAi: true,
          createdAt: new Date()
        }
        setConvos(prev => [...prev, {ISaid: inputText, youSaid: '{There was an error reaching you (no reply)}'}])
        setAiMessages(prev => [...prev, errorMessage])
      }
      setIsLoading(false)
    }
    Send()
    } 
  }

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        HandleSend()
      }
    }
    window.addEventListener('keydown', handleEnter)

    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [inputText])

  return (
    <div className='bg-black w-full h-full flex flex-col border-r border-r-gray-700 relative overflow-hidden'>  
    
      <div className='flex flex-row bg-zinc-950 border-b border-zinc-800 items-center p-3 shrink-0'>
        <p className='p-2 text-xl cursor-pointer hover:text-zinc-400 transition-colors'>⬅️</p>
        <img src={AiIcon} className='w-12 h-12 bg-white border border-zinc-700 my-1 mx-3' alt="AI Avatar"></img>
        <p className='text-xl font-bold tracking-widest uppercase'>Grok [v1.0]</p>
      </div>


      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-28'>
        {aiMessages.map((msg, indx) => {
          const cleanText = msg.text.replace(/\\\*/g, "*").replace(/\\\_/g, "_")
          return (
            <div key={indx} className={`flex flex-row w-full ${msg.fromAi ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-3 border-2 text-sm leading-relaxed ${
                msg.fromAi 
                ? 'bg-zinc-900/80 border-zinc-700 text-green-400' 
                : 'bg-zinc-950 border-white text-white'
              }`}>
                <ReactMarkdown >{cleanText}</ReactMarkdown>
              </div>
            </div>
          )
        })}
        
        {isLoading && (
          <div className="flex gap-1.5 p-2 items-center text-zinc-500 text-xs uppercase tracking-widest animate-pulse">
            <span>●</span><span>●</span><span>●</span><span>Analyzing Prompt...</span>
          </div>
        )}
        <div ref={lastRef}></div>
      </div>


      <div className='w-full absolute bottom-0 left-0 bg-zinc-950 border-t border-zinc-800 p-4 z-10'>
        <div className='flex flex-row items-center gap-2 max-w-full'>
          <input 
            onChange={e => setInputText(e.target.value)} 
            value={inputText}  
            type='text' 
            className='flex-1 p-2.5 text-base text-white outline-none bg-black border border-zinc-700 focus:border-zinc-400 font-mono min-w-0' 
            placeholder='Ask Grok something...'
          />
          <button 
            onClick={HandleSend} 
            className='bg-white text-black font-bold py-2.5 px-6 border-2 border-white hover:bg-zinc-300 active:translate-y-[1px] transition-all uppercase text-sm tracking-wider shrink-0'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Grok