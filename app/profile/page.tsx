"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [name, setName] = useState("Rajesh Kumar")
  const [bio, setBio] = useState("Passionate farmer with 10 years of experience in sustainable agriculture.")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src="/placeholder.svg" alt={name} />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <Button>Change Profile Picture</Button>
          </div>
        </div>
        <div className="col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter your location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="crops">Crops Grown</Label>
            <Input id="crops" placeholder="Enter the crops you grow" />
          </div>
          <Button>Save Profile</Button>
        </div>
      </div>
    </div>
  )
}

