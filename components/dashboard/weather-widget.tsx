"use client"

import { useState } from "react"
import { Cloud, CloudRain, Search, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WeatherWidget() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getWeather = async () => {
    if (!location) return

    setLoading(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, you would fetch from a weather API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock weather data
      const mockWeather = {
        location: location,
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
        condition: Math.random() > 0.5 ? "Sunny" : "Cloudy",
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        wind: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        advice: "Good weather for most farming activities. Consider irrigation in the afternoon.",
      }

      setWeather(mockWeather)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden animate-fade-in delay-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Weather Forecast</CardTitle>
          <Cloud className="h-6 w-6" />
        </div>
        <CardDescription className="text-blue-100">Get real-time weather updates</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button onClick={getWeather} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}

        {weather && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{weather.location}</h3>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{weather.temperature}°C</div>
                <p className="text-sm">{weather.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted/50 p-2 rounded-md">
                <p className="text-muted-foreground">Humidity</p>
                <p className="font-medium">{weather.humidity}%</p>
              </div>
              <div className="bg-muted/50 p-2 rounded-md">
                <p className="text-muted-foreground">Wind</p>
                <p className="font-medium">{weather.wind} km/h</p>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Farming Advice:</span> {weather.advice}
              </p>
            </div>
          </div>
        )}

        {!weather && !error && !loading && (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <CloudRain className="h-12 w-12 mb-2 text-muted" />
            <p>Enter your location to see the weather forecast</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        Updated every hour • Powered by KrishiSevak Weather
      </CardFooter>
    </Card>
  )
}

