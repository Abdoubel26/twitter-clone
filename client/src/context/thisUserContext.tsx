import { createContext, useContext, type FC, useState, type ReactNode } from "react";

interface thisUserContextType {
    thisUser: {
        _id: string
        name: string,
        bio: string,
        imageUrl: string,
        bannerImageUrl: string,
        email?: string
    },
    setThisUser: React.Dispatch<React.SetStateAction<{
    _id: string,
    name: string;
    bio: string;
    imageUrl: string;
    bannerImageUrl: string;
    email: string;
}>>
}

const thisUserContext = createContext<thisUserContextType>({
    thisUser: {
        _id: '',
        name: '',
        bio: '', 
        imageUrl: '',
        bannerImageUrl: '',
    }, 
    setThisUser: () => {}
})


export const ThisUserContextProvider: FC<{children: ReactNode}> = ({children}) => {

    const [thisUser, setThisUser] = useState({
        _id: "",
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
