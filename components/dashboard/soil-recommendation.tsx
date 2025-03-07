"use client"

import { useState } from "react"
import { Sprout, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function SoilRecommendation() {
  const [soilType, setSoilType] = useState("")
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "silty", label: "Silty" },
    { value: "peaty", label: "Peaty" },
    { value: "chalky", label: "Chalky" },
  ]

  const soilRecommendations = {
    clay: {
      crops: ["Rice", "Wheat", "Lentils", "Cabbage", "Broccoli"],
      properties: "High in nutrients, retains water well, slow draining",
      tips: "Add organic matter to improve drainage. Avoid overwatering.",
    },
    sandy: {
      crops: ["Carrots", "Potatoes", "Peanuts", "Watermelon", "Radishes"],
      properties: "Low in nutrients, drains quickly, warms up fast in spring",
      tips: "Add compost to improve water retention. Frequent light watering is better than occasional deep watering.",
    },
    loamy: {
      crops: ["Corn", "Tomatoes", "Soybeans", "Peppers", "Most vegetables"],
      properties: "Balanced soil with good drainage and water retention",
      tips: "Ideal soil type. Maintain with regular addition of organic matter.",
    },
    silty: {
      crops: ["Strawberries", "Lettuce", "Onions", "Cabbage", "Leafy greens"],
      properties: "Fertile, good water retention, compacts easily",
      tips: "Avoid walking on soil when wet. Add organic matter to improve structure.",
    },
    peaty: {
      crops: ["Cabbage", "Turnips", "Radishes", "Legumes", "Root vegetables"],
      properties: "High organic content, acidic, retains moisture well",
      tips: "May need lime to reduce acidity. Excellent for acid-loving plants.",
    },
    chalky: {
      crops: ["Spinach", "Beets", "Cabbage", "Sweet corn", "Calendula"],
      properties: "Alkaline, stony, free-draining, can cause nutrient deficiencies",
      tips: "Add organic matter to improve water retention. Watch for signs of nutrient deficiency.",
    },
  }

  const getRecommendation = () => {
    if (!soilType) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setRecommendation(soilRecommendations[soilType as keyof typeof soilRecommendations])
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="overflow-hidden animate-fade-in delay-200">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Soil Recommendation</CardTitle>
          <Sprout className="h-6 w-6" />
        </div>
        <CardDescription className="text-green-100">Get crop recommendations based on soil type</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger>
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={getRecommendation} disabled={!soilType || loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Get Recommendation
          </Button>
        </div>

        {recommendation && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-muted/50 p-3 rounded-md">
              <h4 className="font-medium mb-1">Soil Properties:</h4>
              <p className="text-sm">{recommendation.properties}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recommended Crops:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.crops.map((crop: string) => (
                  <Badge key={crop} variant="outline" className="bg-green-50">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <h4 className="font-medium mb-1 text-green-800">Farming Tips:</h4>
              <p className="text-sm text-green-700">{recommendation.tips}</p>
            </div>
          </div>
        )}

        {!recommendation && !loading && (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <Sprout className="h-12 w-12 mb-2 text-muted" />
            <p>Select your soil type to get crop recommendations</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        Based on agricultural research • Updated seasonally
      </CardFooter>
    </Card>
  )
}

