import Message from '../Models/messageModel.js'



export const addMessage = async (message) => {
    try {
        const newMessage = new Message(message)
        await newMessage.save()
        console.log('Message added' + message)
    } catch(e) {
        console.log(e.message)
    }
}

export const getMessages = async (req, res) => {
    const {senderId, receiverId} = req.query
    if(!senderId  || !receiverId) res.status(400).json({ success: false, message: 'Missing required fields'})
    try { 
        const messages = await Message.find({ 
            $or: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: receiverId, receiverId: senderId}
            ]})
        return res.status(200).json({ success: true, message: 'Messages fetched from DB', messages: messages})}
    catch(e) {
        return res.status(500).json({ success: false, message: `Server Error ${e.message}`})
        }
}