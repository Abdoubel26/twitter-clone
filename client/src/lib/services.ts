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

export const deletePost = async (id, token) => {
    const res = await fetch(`${URL}/api/post/delete?postId=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", 
            "authorization": `Bearer ${token}`
        }
    })
    return res.json()
}