import { NextResponse } from "next/server"
import { getAgricultureResponse } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const buffer = await image.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString("base64")

    // Prepare prompt for Gemini
    const prompt = `Analyze this image of a crop and identify any diseases or issues. 
    Provide a detailed explanation of the findings, potential causes, and recommended treatments. 
    If the crop appears healthy, state that as well.

    [IMAGE]${base64Image}[/IMAGE]`

    const response = await getAgricultureResponse(prompt)

    return NextResponse.json({ result: response })
  } catch (error) {
    console.error("Error in disease detection API:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

