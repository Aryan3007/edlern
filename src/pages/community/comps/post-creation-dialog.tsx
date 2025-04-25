"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, List, ListOrdered, ImageIcon, Video, Link, AtSign, X, Plus } from "lucide-react"

export function PostCreationDialog() {
  const [open, setOpen] = useState(false)
  const [postContent, setPostContent] = useState("")
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""])
    }
  }

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions]
      newOptions.splice(index, 1)
      setPollOptions(newOptions)
    }
  }

  const handleMediaUpload = (type: "image" | "video") => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll just set a placeholder
    setMediaType(type)
    setMediaPreview(
      type === "image"
        ? "/placeholder.svg?height=300&width=500&text=Image+Preview"
        : "/placeholder.svg?height=300&width=500&text=Video+Preview",
    )
  }

  const handleRemoveMedia = () => {
    setMediaPreview(null)
    setMediaType(null)
  }

  const handleSubmit = () => {
    // In a real app, this would submit the post data
    console.log("Post content:", postContent)
    console.log("Media:", mediaType, mediaPreview)
    console.log("Poll options:", pollOptions)

    // Reset form and close dialog
    setPostContent("")
    setMediaPreview(null)
    setMediaType(null)
    setPollOptions(["", ""])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-0" asChild>
        <div className="flex gap-3 p-2 cursor-pointer transition-colors rounded-md">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center">
            <span className="text-gray-500">Write something...</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-3 mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] p-2 resize-none border-none focus-visible:ring-0 text-base"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            {mediaPreview && (
              <div className="relative mt-3 rounded-md overflow-hidden">
                <img
                  src={mediaPreview || "/placeholder.svg"}
                  alt="Media preview"
                  className="w-full h-auto object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemoveMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="format">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="poll">Poll</TabsTrigger>
            <TabsTrigger value="mention">Mention</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="py-2">
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="media" className="py-2">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={() => handleMediaUpload("image")}>
                <ImageIcon className="h-4 w-4" />
                Add Image
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => handleMediaUpload("video")}>
                <Video className="h-4 w-4" />
                Add Video
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="poll" className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Poll Question</Label>
                <Input placeholder="Ask a question..." className="mt-1" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Options</Label>
                <RadioGroup value="option-0">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <RadioGroupItem value={`option-${index}`} id={`option-${index}`} className="cursor-default" />
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handlePollOptionChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {pollOptions.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500"
                          onClick={() => handleRemovePollOption(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </RadioGroup>

                {pollOptions.length < 5 && (
                  <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={handleAddPollOption}>
                    <Plus className="h-3 w-3" />
                    Add Option
                  </Button>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">Poll Duration</Label>
                <RadioGroup defaultValue="1day" className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1day" id="1day" />
                    <Label htmlFor="1day">1 Day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3days" id="3days" />
                    <Label htmlFor="3days">3 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7days" id="7days" />
                    <Label htmlFor="7days">1 Week</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mention" className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Mention Users</Label>
                <div className="relative mt-1">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search users to mention..." className="pl-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Suggested</Label>
                <div className="space-y-2">
                  {["Hamza Ahmed", "Samual Benson", "Latif Skool"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-2" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
