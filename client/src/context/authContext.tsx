import { useState, useContext, createContext, type FC, type ReactNode, useEffect } from "react"


interface authContextType {
    token: string,
    setAuth: (token: string) => void,
    logout: () => void,
    isReady: boolean
}

const authContext = createContext<authContextType>({
    token: "",
    setAuth: () => {},
    logout: () => {},
    isReady: false,
})


export const AuthContextProvider: FC<{children: ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('')
    const [isReady, setIsReady] = useState<boolean>(false)


    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token')
    if(tokenFromStorage){
        setToken(tokenFromStorage)
    } 
    setIsReady(true)
    }
    , [])
    
    

    const setAuth = (token: string) => {
        setToken(token)
        localStorage.setItem('token', token)
        console.log("is setAuth:" + token)
    }

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return (
        <authContext.Provider value={{token, setAuth, logout, isReady}}>
            {children}
        </authContext.Provider>
    )
 }


export const useAuth = () => {
    const context = useContext(authContext)
    return context
}