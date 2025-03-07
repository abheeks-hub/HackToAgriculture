"use client"

import { useState } from "react"
import { Calendar, SproutIcon as Seedling } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CropCalendar() {
  const [activeTab, setActiveTab] = useState("kharif")

  const seasons = {
    kharif: {
      title: "Kharif Season (June-October)",
      description: "Monsoon crops that are sown at the beginning of the rainy season",
      crops: [
        {
          name: "Rice",
          sowing: "June-July",
          harvesting: "November-December",
          icon: "🌾",
        },
        {
          name: "Maize",
          sowing: "June-July",
          harvesting: "September-October",
          icon: "🌽",
        },
        {
          name: "Cotton",
          sowing: "May-June",
          harvesting: "November-December",
          icon: "🧶",
        },
        {
          name: "Soybean",
          sowing: "June-July",
          harvesting: "September-October",
          icon: "🫘",
        },
        {
          name: "Sugarcane",
          sowing: "February-March",
          harvesting: "January-March",
          icon: "🍭",
        },
      ],
    },
    rabi: {
      title: "Rabi Season (October-March)",
      description: "Winter crops that are sown at the end of monsoon or beginning of winter",
      crops: [
        {
          name: "Wheat",
          sowing: "October-December",
          harvesting: "April-May",
          icon: "🌾",
        },
        {
          name: "Barley",
          sowing: "October-November",
          harvesting: "March-April",
          icon: "🌿",
        },
        {
          name: "Mustard",
          sowing: "September-October",
          harvesting: "February-March",
          icon: "🌱",
        },
        {
          name: "Peas",
          sowing: "October-November",
          harvesting: "February-March",
          icon: "🫛",
        },
        {
          name: "Gram",
          sowing: "October-November",
          harvesting: "February-March",
          icon: "🌱",
        },
      ],
    },
    zaid: {
      title: "Zaid Season (March-June)",
      description: "Summer crops that are grown between Rabi and Kharif seasons",
      crops: [
        {
          name: "Watermelon",
          sowing: "March",
          harvesting: "May-June",
          icon: "🍉",
        },
        {
          name: "Cucumber",
          sowing: "February-March",
          harvesting: "May-June",
          icon: "🥒",
        },
        {
          name: "Muskmelon",
          sowing: "March",
          harvesting: "May-June",
          icon: "🍈",
        },
        {
          name: "Vegetables",
          sowing: "February-March",
          harvesting: "April-June",
          icon: "🥬",
        },
        {
          name: "Fruits",
          sowing: "Year-round",
          harvesting: "Season-dependent",
          icon: "🍎",
        },
      ],
    },
  }

  return (
    <Card className="animate-fade-in delay-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seasonal Crop Calendar</CardTitle>
            <CardDescription>Plan your farming activities based on the seasonal calendar</CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kharif" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kharif">Kharif Season</TabsTrigger>
            <TabsTrigger value="rabi">Rabi Season</TabsTrigger>
            <TabsTrigger value="zaid">Zaid Season</TabsTrigger>
          </TabsList>

          {Object.entries(seasons).map(([key, season]) => (
            <TabsContent key={key} value={key} className="animate-fade-in">
              <div className="p-4 bg-muted/30 rounded-lg mb-4">
                <h3 className="text-lg font-medium">{season.title}</h3>
                <p className="text-sm text-muted-foreground">{season.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {season.crops.map((crop, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-lg p-4 hover:shadow-md transition-all animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">{crop.icon}</div>
                      <h4 className="font-medium">{crop.name}</h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Seedling className="h-4 w-4 text-green-500" />
                        <span>Sowing: {crop.sowing}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-amber-500" />
                        <span>Harvesting: {crop.harvesting}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

