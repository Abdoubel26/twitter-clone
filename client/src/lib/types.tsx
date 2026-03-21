export interface userType {
    _id: string
    name: string,
    email?: string,
    password?: string,
    bio: string,
    imageUrl: string,
    bannerImageUrl: string
}

export interface postType {
    text: string,
    _id: string,
    imageUrl?: string,
    likes: string[],
    poster: userType
}

export interface relationType {
    _id: string,
    follower: string,
    following: string,
}


export interface notifType {
    _id: string, 
    type: "follow" | "like",
    from: userType,
    to: userType,
    CreatedAt: Date,
    seen: boolean
}

export interface messageType {
    _id?: string,
    senderId: string,
    receiverId: string,
    text: string,
    seen?: boolean,
    createdAt?: Date,
}