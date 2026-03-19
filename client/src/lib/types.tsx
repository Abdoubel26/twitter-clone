export interface userType {
    _id?: string
    name: string,
    email?: string,
    password?: string,
    bio: string,
    imageUrl: string,
    bannerImageUrl: string
}

export interface postType {
    text: string,
    imageUrl: string,
    likeCount: number,
    poster: userType
}