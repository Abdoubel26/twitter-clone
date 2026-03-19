import React, { createContext, type FC , useContext, useState } from "react";
import { type userType } from "../lib/types";

type selectedUserContextType = {
    selectedUser: userType,
    setSelectedUser: (user: userType) => void
}


const selectedUserContext = createContext<selectedUserContextType>({
    selectedUser: {
        name: '',
        bio: '',
        imageUrl: '',
        bannerImageUrl: ''
    },
    setSelectedUser: () => {}
})


export const SelectedUserContextProvider: FC<{children: React.ReactNode}> = ({children}) => {

    const [selectedUser, setSelectedUser] = useState<userType>({
        name: '',
        bio: '',
        imageUrl: '',
        bannerImageUrl: '',
    })


    return (
        <selectedUserContext.Provider value={{ selectedUser, setSelectedUser}}>
            {children}
        </selectedUserContext.Provider>
    )
}

export const useSelectedUser = () => {
    return useContext(selectedUserContext)
}