import type { relationType } from "./types"

export const formattedTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: "2-digit", 
        minute: '2-digit',
        hour12: false,
    })
}

export const clipLongText = (text: string) => {
    if(text.length <= 50) return text

    let clipped = text.slice(0, 50)

    const LastSpace = clipped.lastIndexOf(' ')

    if(LastSpace !== -1){
        clipped =  clipped.slice(0, LastSpace)
        return clipped + "..."
    } else {
        return clipped
    }
}


export const checkRelation:(follwer: string, following: string, relation: relationType) => boolean = (follower: string, following: string, relation: relationType) => {
    return follower.toString() === relation.follower.toString() && following.toString() === relation.following.toString()
}
