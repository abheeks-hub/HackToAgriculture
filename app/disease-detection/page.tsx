"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DiseaseDetectionPage() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!image) return

    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("image", image)

    try {
      const response = await fetch("/api/disease-detection", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setResult("An error occurred while processing the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Crop Disease Detection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Upload an image of your crop for disease detection</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Crop Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                {preview && (
                  <div className="mt-4">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded-lg" />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={!image || loading} className="w-full">
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Detect Disease
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detection Result</CardTitle>
            <CardDescription>Analysis of the uploaded crop image</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="prose">
                <h3 className="text-lg font-semibold mb-2">Analysis:</h3>
                <p>{result}</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">Upload an image to see the detection result</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

