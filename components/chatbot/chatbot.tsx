"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Namaste! I'm KrishiMitra, your agricultural assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return

    setMessages((prev) => [...prev, { role: "user", content: input }])
    setIsProcessing(true)
    setInput("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "bot", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "I apologize, but I'm having trouble processing your request. Please try again." },
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      if ("webkitSpeechRecognition" in window) {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-IN"
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsRecording(false)
        }
        recognition.onerror = () => setIsRecording(false)
        recognition.start()
      } else {
        alert("Speech recognition is not supported in your browser")
        setIsRecording(false)
      }
    } else {
      setIsRecording(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90",
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-lg shadow-xl z-40 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "opacity-100 scale-100 h-[500px]" : "opacity-0 scale-95 h-0 pointer-events-none",
        )}
      >
        <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary-foreground">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-wbVrNIyxkKZ50A4KOk0zCZ6v5Mbp6g.jpeg"
              alt="KrishiMitra"
            />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">KrishiMitra AI</h3>
            <p className="text-xs opacity-90">Your agricultural assistant</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("mb-4 max-w-[80%] animate-fade-in", message.role === "user" ? "ml-auto" : "mr-auto")}
            >
              <div
                className={cn(
                  "p-3 rounded-lg",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border rounded-bl-none",
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className="text-xs text-muted-foreground mt-1 px-1">
                {message.role === "user" ? "You" : "KrishiMitra"} •{" "}
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleRecording}
              className={cn(isRecording && "bg-red-100 text-red-500 animate-pulse")}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about farming..."
              className="min-h-10 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isProcessing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isRecording && (
            <div className="mt-2 text-xs text-center text-muted-foreground">Listening... Speak clearly</div>
          )}
          {isProcessing && (
            <div className="mt-2 text-xs text-center text-muted-foreground">Processing your question...</div>
          )}
        </div>
      </div>
    </>
  )
}

