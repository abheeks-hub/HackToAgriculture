import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { SoilRecommendation } from "@/components/dashboard/soil-recommendation"
import { MarketplacePreview } from "@/components/dashboard/marketplace-preview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CropCalendar } from "@/components/dashboard/crop-calendar"
import { Chatbot } from "@/components/chatbot/chatbot"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="flex-1">
        <DashboardHeader />
        <div className="container py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeatherWidget />
            <SoilRecommendation />
            <MarketplacePreview />
          </div>

          <RecentActivity />

          <CropCalendar />
        </div>
      </main>
      <Chatbot />
    </div>
  )
}

