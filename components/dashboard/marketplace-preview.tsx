"use client"

import { ShoppingBasket, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MarketplacePreview() {
  const marketplaceItems = [
    {
      name: "Premium Seeds",
      category: "Seeds",
      price: "₹50",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Organic Fertilizer",
      category: "Fertilizers",
      price: "₹200",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Farming Tools",
      category: "Equipment",
      price: "₹500",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <Card className="overflow-hidden animate-fade-in delay-300">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Marketplace</CardTitle>
          <ShoppingBasket className="h-6 w-6" />
        </div>
        <CardDescription className="text-amber-100">Buy and sell agricultural products</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {marketplaceItems.map((item, index) => (
            <div
              key={index}
              className="bg-muted/30 p-3 rounded-lg text-center hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="w-full h-20 flex items-center justify-center mb-2">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="max-h-full object-contain" />
              </div>
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.category}</p>
              <p className="text-sm font-bold mt-1">{item.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <p className="text-sm text-amber-700">
              <span className="font-medium">Market Update:</span> Rice prices have increased by 5% this week. Consider
              selling your produce now.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 px-4 py-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">100+ products available</span>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/marketplace">
            Go to Marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

