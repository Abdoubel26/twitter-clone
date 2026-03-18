import { useState, useContext, createContext, FC, type ReactNode } from "react"


interface authContextType {
    token: string,
    setAuth: (token: string) => void,
    logout: () => void,
}

const authContext = createContext<authContextType>({
    token: "",
    setAuth: () => {},
    logout: () => {},
})


export const authContextProvider: FC<{chilren: ReactNode}> = ({chilren}) => {
    const [token, setToken] = useState<string>('')

    const setAuth = (token: string) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    return (
        <authContext.Provider value={{token, setAuth, logout}}>
            {chilren}
        </authContext.Provider>
    )
 }


export const useAuth = () => {
    const context = useContext(authContext)
    return context
}