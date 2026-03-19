

export const signup = async (name: string, password: string, email: string, bio: string) => {
    const res = await fetch('http://localhost:5000/api/user/signup', {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password, bio })
    })
    return res.json()
} 
 
export const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password})
    })
    return res.json()
}


export const updateUser = async (bio: string, name: string, ImageUrl: string, bannerImageUrl: string, token: string) => {
    const res = await fetch('http://localhost:5000',  {
        method: 'PUT',
        headers: {"Content-Type": "application/json", "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bio, name, ImageUrl, bannerImageUrl})
    })
    return res.json()
}

export const getUser = async (token: string) => {
    const res = await fetch('http://localhost:5000/api/user/me',  {
        method: 'GET',
        headers: {"Content-Type": "application/json", "authorization": `Bearer ${token}`}})
    return res.json()
}

export const getAllUsers = async () => {
    const res = await fetch('http://localhost:5000/api/user/all', {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    return res.json()
}