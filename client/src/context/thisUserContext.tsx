import { createContext, useContext, type FC, useState, type ReactNode } from "react";

interface thisUserContextType {
    thisUser: {
        name: string,
        bio: string,
        imageUrl: string,
        bannerImageUrl: string,
        email?: string
    },
    setThisUser: React.Dispatch<React.SetStateAction<{
    name: string;
    bio: string;
    imageUrl: string;
    bannerImageUrl: string;
    email: string;
}>>
}

const thisUserContext = createContext<thisUserContextType>({
    thisUser: {
        name: '',
        bio: '', 
        imageUrl: '',
        bannerImageUrl: '',
    }, 
    setThisUser: () => {}
})


export const ThisUserContextProvider: FC<{children: ReactNode}> = ({children}) => {

    const [thisUser, setThisUser] = useState({
        name: "",
        bio: "",
        imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        bannerImageUrl: "",
        email: "",
    })


    return (
        <thisUserContext.Provider value={{ thisUser, setThisUser}}>
            {children}
        </thisUserContext.Provider>
    )
}


export const useThisUser = () => {
    const context = useContext(thisUserContext)
    return context
}
