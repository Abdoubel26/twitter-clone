import Follow from '../Models/followModel.js'


export const follow = async (req, res) => {
    const { id } = req.id
    const {followingId } = req.body
    if(!id || !followingId) return res.status(400).json( {success: false, message: "follower or following Id not Provided"})
    try {
        const followRelation = new Follow({follower: id, following: followingId})
        await followRelation.save()
        return res.status(201).json({ success: true, message: "followed successfully", relation: followRelation})
    }  
    catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}

export const unfollow = async  (req, res) => {
    const { id } = req.id
    const {followingId} = req.body
    if(!id || !followingId) return res.status(400).json( {success: false, message: "follower or following Id not Provided"})
    try {
        const deletedRelation = await Follow.findOneAndDelete({follower: id, following: followingId})
        if(!deletedRelation) return res.status(404).json({ success: false, message: 'Relation not found!'})
        return res.status(200).json({ success: false, message:"Relation deleted successfully", relation: deletedRelation})
    } catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})  
    }
}