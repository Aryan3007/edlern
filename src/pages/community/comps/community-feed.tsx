"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, MoreHorizontal, Share2, Star, CheckCircle2, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PostCreationDialog } from "./post-creation-dialog"

const posts = [
  {
    id: 1,
    author: {
      name: "Hamza Ahmed",
      image: "/placeholder.svg?height=40&width=40&text=HA",
      verified: true,
    },
    content:
      "🔥 SIGN UP NOW! 🔥 Join the ultimate community for self-improvement. We're all about helping you level up in every aspect of life. Fast forward to today, I'm the envy goal for my life. I want to give back to the community which has helped me grow. Post more of what you want to see!",
    time: "2h ago",
    likes: 174,
    comments: 34,
    pinned: true,
  },
  {
    id: 2,
    author: {
      name: "Hamza Ahmed",
      image: "/placeholder.svg?height=40&width=40&text=HA",
      verified: true,
    },
    content:
      "Netflix, but for self improvement\n\nJust go take a look at this video where I explain what my new product is. I think you'll really like it. It's the best deal on courses for young men. And you'll be able to make progress faster than ever. Just go take a look at this video where I explain what my new product is. I think you'll really like it. It's the best deal on courses for young men. And you'll be able to make progress faster than ever. Just go take a look at this video where I explain what my new product is. I think you'll really like it. It's the best deal on courses for young men. And you'll be able to make progress faster than ever.",
    time: "5h ago",
    likes: 128,
    comments: 26,
    media: "/placeholder.svg?height=200&width=400&text=Video+Thumbnail",
  },
  {
    id: 3,
    author: {
      name: "Aaron Barayeyan",
      image: "/placeholder.svg?height=40&width=40&text=AB",
      verified: false,
    },
    content:
      "✅ THE BEST EXERCISE FOR EACH MUSCLE GROUP\n\nGetting strong is the foundation for everything else you're going to do. You build discipline, just getting up and completing ability everyday, strength, power, and finally confidence.",
    time: "8h ago",
    likes: 95,
    comments: 12,
  },
  {
    id: 4,
    author: {
      name: "Sergio Pereira",
      image: "/placeholder.svg?height=40&width=40&text=SP",
      verified: false,
    },
    content:
      "Old physique vs New 🔥 🔥 🔥\n\nFound some old photos of myself... Looking at them makes be a bit upset that I'm not at that level anymore. Yes I was injured. Yes I couldn't train properly, but still sad 😔",
    time: "12h ago",
    likes: 57,
    comments: 8,
    media: "/placeholder.svg?height=200&width=400&text=Before+and+After",
  },
  {
    id: 5,
    author: {
      name: "Rahul S",
      image: "/placeholder.svg?height=40&width=40&text=RS",
      verified: false,
    },
    content:
      "I want to move out from my parents house\n\nI know that if I'm allowed to move out from my parent's house to gain more life experience, I'll be able to grow faster. But my parents are stopping me from leaving...",
    time: "1d ago",
    likes: 42,
    comments: 15,
  },
]

export function CommunityFeed() {
  const [activeTab, setActiveTab] = useState("all")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filters, setFilters] = useState({
    verified: false,
    withMedia: false,
    popular: false,
  })

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "pinned" && !post.pinned) return false
    if (filters.verified && !post.author.verified) return false
    if (filters.withMedia && !post.media) return false
    if (filters.popular && post.likes < 100) return false
    return true
  })

  return (
    <div className="space-y-4">
      <Card className="p-2">
        <CardContent className="p-0">
          <PostCreationDialog />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 justify-between">
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="value">Value posts</TabsTrigger>
          </TabsList>
        </Tabs>

        <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Posts</DialogTitle>
              <DialogDescription>Select options to filter the posts you see</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified}
                  onCheckedChange={(checked) => setFilters({ ...filters, verified: checked === true })}
                />
                <Label htmlFor="verified">Verified authors only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="media"
                  checked={filters.withMedia}
                  onCheckedChange={(checked) => setFilters({ ...filters, withMedia: checked === true })}
                />
                <Label htmlFor="media">Posts with media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={filters.popular}
                  onCheckedChange={(checked) => setFilters({ ...filters, popular: checked === true })}
                />
                <Label htmlFor="popular">Popular posts (100+ likes)</Label>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    verified: false,
                    withMedia: false,
                    popular: false,
                  })
                }
              >
                Reset
              </Button>
              <Button onClick={() => setShowFilterDialog(false)}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden gap-0 p-0">
              <CardHeader className="p-4 flex flex-row items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.author.name}</span>
                    {post.author.verified && (
                      <Badge variant="outline" className="bg-lime-600/10 text-lime-600 h-5 px-1">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">Verified</span>
                      </Badge>
                    )}
                    {post.pinned && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 h-5 px-1">
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        <span className="text-xs">Pinned</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Save post</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Hide</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-4 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 whitespace-pre-line">{post.content}</div>
                {post.media && (
                  <div className="rounded-md overflow-hidden w-full lg:w-56">
                    <img
                      src={post.media || "/placeholder.svg"}
                      alt="Post media"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-600 hover:text-lime-600">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-600 hover:text-lime-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <div className="flex -space-x-1 p-2 overflow-hidden">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="inline-block size-6 rounded-full ring-2 ring-white"
                    />
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="inline-block size-6 rounded-full ring-2 ring-white"
                    />
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                      className="inline-block size-6 rounded-full ring-2 ring-white"
                    />
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="inline-block size-6 rounded-full ring-2 ring-white"
                    />
                  </div>
                  <h1 className="text-gray-600 lg:flex hidden">Liked by Aryan and {post.likes-1} others</h1>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-lime-600">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
              <h1 className="text-gray-600 px-4 pb-2 flex lg:hidden">Liked by Aryan and {post.likes-1} others</h1>

            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No posts match your current filters</p>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("all")
                setFilters({
                  verified: false,
                  withMedia: false,
                  popular: false,
                })
              }}
            >
              Reset filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
