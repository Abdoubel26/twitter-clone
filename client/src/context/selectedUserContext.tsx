import React, { createContext, type FC , useContext, useState } from "react";
import { type userType } from "../lib/types";

type selectedUserContextType = {
    selectedUser: userType,
    setSelectedUser: (user: userType) => void
    initState: userType,
}

const initState = {
        _id: '',
        name: '',
        bio: '',
        imageUrl: '',
        bannerImageUrl: ''
    }

const selectedUserContext = createContext<selectedUserContextType>({
    selectedUser: initState ,
    setSelectedUser: () => {},
    initState: initState,
})


export const SelectedUserContextProvider: FC<{children: React.ReactNode}> = ({children}) => {

    const [selectedUser, setSelectedUser] = useState<userType>(initState)


    return (
        <selectedUserContext.Provider value={{ selectedUser, setSelectedUser, initState}}>
            {children}
        </selectedUserContext.Provider>
    )
}

export const useSelectedUser = () => {
    return useContext(selectedUserContext)
}