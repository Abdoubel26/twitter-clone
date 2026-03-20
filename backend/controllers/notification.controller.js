import Notification from "../Models/notificationModel.js"



export const getNotifs = async (req, res) => {
    const { id } = req.id
    try {
        const notifs = await Notification.find({ to: id})
        .populate('from')
        .populate('to')
        return res.status(200).json( { success: true, message: "notifications fetched from database", notifications: notifs })
    }
    catch(e){
        return res.status(500).json({ success: false, message:`Server Error: ${e.message}`})
    }
}

export const seeNotifs = async (req, res) => {
    const { id } = req.id
    try {
        await Notification.updateMany({to: id}, {seen: true}, { new: true})
        return res.status(200).json({ success: true, message: "Notifications seen"})
    } catch(e) {
        return res.status(500).json({ success: false, message:`Server Error: ${e.message}`})
    }
}


export const countUnseenNotifs = async (req, res) => {
    const { id } = req.id
    try {
        const count = await Notification.countDocuments({to: id, seen: false})
        console.log("success in counting")
        return res.status(200).json({ success: true, message: "Unread notifications counted", count: count})
    } catch(e) {
        console.log('Error thrown')
        return res.status(500).json({ success: false, message:`Server Error: ${e.message}`})
    }
}


export const createNotification = async (from, to, type, post) => {
    const notif = {type, to, from, post}
    try {
        const newNotif = new Notification(notif)
        await newNotif.save()
        return newNotif
    } catch(e) {
        return e.message
    }
}
