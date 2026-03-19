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
    imageUrl: string,
    likes: string[],
    poster: userType
}

export interface relationType {
    _id: string,
    follower: string,
    following: string,
}