import { createContext, useContext, useState, type FC, type ReactNode } from "react";
import { type Socket, io } from "socket.io-client";

interface socketContextType {
    socket: Socket,
}

const initState = {} as Socket

const socketContext = createContext<socketContextType>({
    socket: initState,
})



export const SocketContextProvider: FC<{children: ReactNode}> = ({children}) => {
    
    const socket = io('http://localhost:5000')

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}


export const useSocket = () => {
    const context = useContext(socketContext)
    return context
}