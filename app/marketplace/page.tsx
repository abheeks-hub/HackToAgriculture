"use client"

import { useState } from "react"
import { Search, ShoppingCart, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    category: "Fertilizers",
    price: 500,
    unit: "per 50kg bag",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340092/user_uploads/aWEOpKOoRUOzitd/fertilizer.jpg",
  },
  {
    id: 2,
    name: "Wheat Seeds",
    category: "Seeds",
    price: 200,
    unit: "per kg",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340364/user_uploads/RPVcPIHnCwPmhRZ/wheat.jpg",
  },
  {
    id: 3,
    name: "Tractor",
    category: "Equipment",
    price: 500000,
    unit: "per unit",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340364/user_uploads/tLbHldPMBXFNsLu/tractor.jpg",
  },
  {
    id: 4,
    name: "Pesticide Sprayer",
    category: "Tools",
    price: 1500,
    unit: "per unit",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340441/user_uploads/DVykMaIHHZgIjxS/pesticide_sprayer.jpg",
  },
  {
    id: 5,
    name: "Drip Irrigation System",
    category: "Equipment",
    price: 15000,
    unit: "per set",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340082/user_uploads/tYbLzknPQVcDqSB/drip_irrigation.jpg",
  },
  {
    id: 6,
    name: "Tomato Seeds",
    category: "Seeds",
    price: 150,
    unit: "per 100g",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340364/user_uploads/IHEpvlyXmqggxwO/tomato.jpg",
  },
  {
    id: 7,
    name: "Harvester",
    category: "Equipment",
    price: 750000,
    unit: "per unit",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340092/user_uploads/ozUICWnxvGXDkgR/harvester.jpg",
  },
  {
    id: 8,
    name: "Soil Testing Kit",
    category: "Tools",
    price: 2000,
    unit: "per kit",
    image: "https://pplx-res.cloudinary.com/image/upload/v1741340441/user_uploads/YHGfyysMmXtMhqf/soil_tester.jpg",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "all" || product.category.toLowerCase() === category.toLowerCase()),
  )

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { id: productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Agricultural Marketplace</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fertilizers">Fertilizers</SelectItem>
            <SelectItem value="seeds">Seeds</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
              <p className="text-lg font-bold mt-2">
                ₹{product.price.toLocaleString()} {product.unit}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => addToCart(product.id)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="fixed bottom-6 right-6 gap-2">
              <ShoppingCart />
              <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>Review your items before checkout</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.id)
                if (!product) return null
                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
              <div className="pt-4 border-t">
                <p className="font-bold text-lg">Total: ₹{cartTotal.toLocaleString()}</p>
              </div>
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

