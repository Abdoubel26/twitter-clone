import type { postType } from "./types"


const URL = "http://localhost:5000"


export const signup = async (name: string, password: string, email: string, bio: string) => {
    const res = await fetch(URL+'/api/user/signup', {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password, bio })
    })
    return res.json()
} 
 
export const login = async (email: string, password: string) => {
    const res = await fetch(URL+ '/api/user/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password})
    })
    return res.json()
}


export const updateUser = async (bio: string, name: string, imageUrl: string, bannerImageUrl: string, token: string) => {
    console.log("token in update user: " + token)
    const res = await fetch(URL+ '/api/user/update',  {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bio, name, imageUrl, bannerImageUrl})
    })
    return res.json()
}

export const getUser = async (token: string) => {
    const res = await fetch(URL+ '/api/user/me',  {
        method: 'GET',
        headers: {"Content-Type": "application/json", "authorization": `Bearer ${token}`}})
    return res.json()
}

export const getAllUsers = async () => {
    const res = await fetch(URL+ '/api/user/all', {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    return res.json()
}


export const getPosts = async () => {
    const res = await fetch(`${URL}/api/post`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    return res.json()
}


export const addPost = async (post: postType, token: string) => {
    const res = await fetch(`${URL}/api/post/create`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    return res.json()
}

export const deletePost = async (id: string, token: string) => {
    const res = await fetch(`${URL}/api/post/delete?postId=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", 
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}

export const toggleLike = async (postId: string, token: string) => {
    const res = await fetch(`${URL}/api/post/like`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({postId: postId})
    })
    return res.json()
}

export const getFollows = async () => {
    const res = await fetch(`${URL}/api/follow/get`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })
    return res.json()
}

 
export const follow = async (followingId: string, token: string) => {
    const res = await fetch(`${URL}/api/follow/post`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({followingId: followingId})
    })
    return res.json()
}

export const unfollow = async (relationId: string, token: string) => { 
    const res = await fetch(`${URL}/api/follow/unfollow`, {
        method: "DELETE", 
        headers:  {"Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({relationId: relationId})
    })
    return res.json()
}

export const getNotifications = async (token: string) => {
    const res = await fetch(`${URL}/api/notification/get`, {
        method: 'GET',
        headers:  {"Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}

export const countUnseen = async (token: string) => {
    const res = await fetch(`${URL}/api/notification/count`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}

export const seeNotifs = async (token: string) => {
    const res = await fetch(`${URL}/api/notification/see`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}