import { callGemini } from "../config/gemini.js";



export const getTextAndCallAI = async (req, res) => {
    const { text } = req.body
    try  {
        const aiRes = await callGemini(text)
        if(aiRes.name === "ApiError") return res.status(429).json({ success: false, message: "API ERROR!", response: aiRes})
        return res.status(200).json({ success: true, response: aiRes, message: "AI Replied Fetched succesffuly"})
    }
    catch(e) {
        return res.status(500).json({ success: false, message: `Server Error: ${e.message}`})
    }
}
