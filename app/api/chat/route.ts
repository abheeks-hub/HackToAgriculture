import { NextResponse } from "next/server"
import { getAgricultureResponse } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const response = await getAgricultureResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

