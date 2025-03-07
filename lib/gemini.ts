import axios from "axios"

export async function getAgricultureResponse(prompt: string) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  
  // Check if API key exists
  if (!GEMINI_API_KEY) {
    console.error("Missing Gemini API key")
    return "API key configuration error. Please check server settings."
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    console.log("API Response Status:", response.status)
    
    const generatedText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."
    return generatedText
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error details:", error.response.data)
    }
    console.error("Error calling Gemini API:", error)
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later."
  }
}