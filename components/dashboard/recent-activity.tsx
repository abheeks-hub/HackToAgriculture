"use client"

import { Activity, ShoppingCart, Upload, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Purchase Completed",
      description: "You purchased 5kg of wheat seeds.",
      time: "2 hours ago",
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Disease Detection",
      description: "You uploaded a photo for disease detection.",
      time: "Yesterday",
      icon: Upload,
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Product Listed",
      description: "You listed 100kg of rice for sale.",
      time: "3 days ago",
      icon: Tag,
      color: "bg-green-500",
    },
  ]

  return (
    <Card className="animate-fade-in delay-400">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </div>
          <Activity className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              <div className={`${activity.color} p-2 rounded-full text-white mt-1`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:underline">View all activity</button>
        </div>
      </CardContent>
    </Card>
  )
}

