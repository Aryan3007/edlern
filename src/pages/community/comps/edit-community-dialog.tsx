/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon } from "lucide-react"

interface Community {
  id: string
  name: string
  description: string
  image: string
  coverImage: string
  categories: string[]
  [key: string]: string | string[]
}

interface EditCommunityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  community: Community
}

export function EditCommunityDialog({ open, onOpenChange, community }: EditCommunityDialogProps) {
  const [name, setName] = useState(community.name)
  const [description, setDescription] = useState(community.description)
  const [categories, setCategories] = useState(community.categories.join(", "))
  const [image] = useState(community.image)
  const [coverImage] = useState(community.coverImage)

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving community changes:", {
      id: community.id,
      name,
      description,
      categories: categories.split(",").map((cat) => cat.trim()),
      image,
      coverImage,
    })

    // Close the dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Community</DialogTitle>
          <DialogDescription>Make changes to your community. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="community-name">Community Name</Label>
            <Input id="community-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="community-description">Description</Label>
            <Textarea
              id="community-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="community-categories">Categories (comma separated)</Label>
            <Input id="community-categories" value={categories} onChange={(e) => setCategories(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Community Avatar</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={image || "/placeholder.svg"} alt="Community avatar" />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Change Avatar
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div
                className="h-24 w-full rounded-md border bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImage})` }}
              >
                <div className="flex h-full items-center justify-center">
                  <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Change Cover
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
