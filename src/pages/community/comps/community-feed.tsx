"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Star,
  CheckCircle2,
  Filter,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Send,
  MoreVertical,
  X,
} from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { PostCreationDialog } from "./post-creation-dialog"

// Mock data for sample images - in a real app this would come from your API
const mockImages = {
  1: ["/placeholder.svg?height=600&width=600&text=Image+1"],
  2: [
    "/placeholder.svg?height=600&width=600&text=Video+Thumbnail",
    "/placeholder.svg?height=600&width=600&text=Additional+Image",
  ],
  4: [
    "/placeholder.svg?height=600&width=600&text=Before+Image",
    "/placeholder.svg?height=600&width=600&text=After+Image",
    "/placeholder.svg?height=600&width=600&text=Progress+Image",
  ],
} as const

// Mock comments data
const mockComments = {
  1: [
    {
      id: 1,
      author: "Mike T",
      avatar: "/placeholder.svg?height=32&width=32&text=MT",
      content: "This community has been life-changing!",
      timestamp: "1h ago",
    },
    {
      id: 2,
      author: "Sarah L",
      avatar: "/placeholder.svg?height=32&width=32&text=SL",
      content: "Just signed up! Excited to be here.",
      timestamp: "30m ago",
    },
  ],
  2: [
    {
      id: 1,
      author: "David K",
      avatar: "/placeholder.svg?height=32&width=32&text=DK",
      content: "When is the next course dropping?",
      timestamp: "2h ago",
    },
    {
      id: 2,
      author: "Emma R",
      avatar: "/placeholder.svg?height=32&width=32&text=ER",
      content: "Already subscribed. Worth every penny!",
      timestamp: "1h ago",
    },
  ],
  3: [
    {
      id: 1,
      author: "James P",
      avatar: "/placeholder.svg?height=32&width=32&text=JP",
      content: "Been following this routine for a month. Great results!",
      timestamp: "3h ago",
    },
  ],
  4: [
    {
      id: 1,
      author: "Linda M",
      avatar: "/placeholder.svg?height=32&width=32&text=LM",
      content: "Amazing transformation!",
      timestamp: "5h ago",
    },
    {
      id: 2,
      author: "Carlos D",
      avatar: "/placeholder.svg?height=32&width=32&text=CD",
      content: "What was your diet like?",
      timestamp: "4h ago",
    },
  ],
  5: [
    {
      id: 1,
      author: "Priya N",
      avatar: "/placeholder.svg?height=32&width=32&text=PN",
      content: "I moved out at 22 and it was the best decision.",
      timestamp: "10h ago",
    },
    {
      id: 2,
      author: "Tom W",
      avatar: "/placeholder.svg?height=32&width=32&text=TW",
      content: "Have you tried explaining your goals to them?",
      timestamp: "8h ago",
    },
  ],
}

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
  const [selectedPost, setSelectedPost] = useState<{ id: number; author: { name: string; image: string; verified: boolean }; content: string; time: string; likes: number; comments: number; pinned?: boolean; media?: string } | null>(null)
  const [newComment, setNewComment] = useState("")
  const [postComments, setPostComments] = useState<{ [key: number]: { id: number; author: string; avatar: string; content: string; timestamp: string; }[] }>(mockComments)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "pinned" && !post.pinned) return false
    if (filters.verified && !post.author.verified) return false
    if (filters.withMedia && !post.media) return false
    if (filters.popular && post.likes < 100) return false
    return true
  })

  interface Comment {
    id: number
    author: string
    avatar: string
    content: string
    timestamp: string
  }


  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Math.max(...postComments[postId].map((c) => c.id), 0) + 1,
      author: "You",
      avatar: "/placeholder.svg?height=32&width=32&text=You",
      content: newComment,
      timestamp: "Just now",
    }

    setPostComments({
      ...postComments,
      [postId]: [...postComments[postId], newCommentObj],
    })

    setNewComment("")
  }

  const nextImage = () => {
    if (!selectedPost) return
    const images = selectedPost ? mockImages[selectedPost.id as keyof typeof mockImages] || [] : []
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!selectedPost) return
    const images = mockImages[selectedPost.id as keyof typeof mockImages] || []
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setCurrentImageIndex(0)
    setShowComments(false) // Reset comments view when opening a new post
  }

  const closePostDetail = () => {
    setSelectedPost(null)
    setCurrentImageIndex(0)
  }

  interface Post {
    id: number
    author: {
      name: string
      image: string
      verified: boolean
    }
    content: string
    time: string
    likes: number
    comments: number
    pinned?: boolean
    media?: string
  }

  const toggleComments = (postId: number) => {
    if (selectedPost?.id === postId) {
      setShowComments(!showComments)
    } else {
      openPostDetail(posts.find((p) => p.id === postId) as Post)
      setShowComments(true)
    }
  }

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
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Save post</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Hide</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Button to open post popup */}
                <Dialog open={selectedPost?.id === post.id} onOpenChange={(open) => !open && closePostDetail()}>

                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openPostDetail(post)}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
                    {/* Post header - always visible */}
                    <div className="p-4 border-b flex items-center gap-3 sticky top-0 bg-background z-10">

                      <Avatar className="h-10 w-10">
                        {selectedPost && (
                          <>
                            <AvatarImage
                              src={selectedPost.author.image || "/placeholder.svg"}
                              alt={selectedPost.author.name}
                            />
                            <AvatarFallback>{selectedPost.author.name.charAt(0)}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{selectedPost?.author.name}</span>
                          {selectedPost?.author.verified && (
                            <Badge variant="outline" className="bg-lime-600/10 text-lime-600 h-5 px-1">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              <span className="text-xs">Verified</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{selectedPost?.time}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 ml-auto">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Save post</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                          <DropdownMenuItem>Hide</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon" className="h-8 w-8 mr-1" onClick={closePostDetail}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Post content */}
                      <div className="p-4">
                        <p className="whitespace-pre-line mb-4">{selectedPost?.content}</p>

                        {/* Media content */}
                        {selectedPost &&
                          (mockImages[selectedPost.id as keyof typeof mockImages]?.length > 0 ? (
                            <div className="relative w-full mb-4">
                              <img
                                src={mockImages[selectedPost.id as keyof typeof mockImages][currentImageIndex] || "/placeholder.svg"}
                                alt={`Media ${currentImageIndex + 1}`}
                                className="w-full h-auto rounded-md"
                              />

                              {/* Navigation arrows - only show if multiple images */}
                              {mockImages[selectedPost.id as keyof typeof mockImages]?.length > 1 && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      prevImage()
                                    }}
                                  >
                                    <ChevronLeft className="h-6 w-6" />
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      nextImage()
                                    }}
                                  >
                                    <ChevronRight className="h-6 w-6" />
                                  </Button>
                                </>
                              )}

                              {/* Image counter */}
                              {mockImages[selectedPost.id as keyof typeof mockImages].length > 1 && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                                  {currentImageIndex + 1} / {mockImages[selectedPost.id as keyof typeof mockImages].length}
                                </div>
                              )}
                            </div>
                          ) : null)}
                      </div>

                      {/* Post engagement stats */}
                      <div className="px-4 py-2 border-t border-b flex justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex -space-x-1 overflow-hidden mr-2">
                            <img
                              alt=""
                              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="inline-block size-5 rounded-full ring-2 ring-white"
                            />
                            <img
                              alt=""
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="inline-block size-5 rounded-full ring-2 ring-white"
                            />
                            <img
                              alt=""
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                              className="inline-block size-5 rounded-full ring-2 ring-white"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            Liked by Aryan and {(selectedPost?.likes ?? 0) - 1} others
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{selectedPost?.comments} comments</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="px-4 py-1 border-b flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 gap-2 text-gray-600 hover:text-blue-600 rounded-full"
                        >
                          <Heart className="h-5 w-5" />
                          <span>Like</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 gap-2 text-gray-600 hover:text-blue-600 rounded-full"
                        >
                          <MessageSquare className="h-5 w-5" />
                          <span>Comment</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 gap-2 text-gray-600 hover:text-blue-600 rounded-full"
                        >
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </Button>
                      </div>

                      {/* Comments section */}
                      <div className="p-4">
                        <h3 className="font-medium mb-4">Comments</h3>
                        <div className="space-y-4">
                          {selectedPost &&
                            postComments[selectedPost.id]?.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8 mt-1">
                                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-background rounded-2xl p-3">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="font-medium text-sm">{comment.author}</span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    <button className="hover:text-gray-800 font-medium">Like</button>
                                    <button className="hover:text-gray-800 font-medium">Reply</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Add comment section - fixed at bottom */}
                    <div className="p-3 border-t mt-auto bg-background sticky bottom-0">
                      <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" alt="Your Avatar" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="relative flex-grow">
                          <Input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="pr-10 rounded-full bg-gray-100 border-gray-200"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && selectedPost) {
                                e.preventDefault()
                                handleAddComment(selectedPost.id)
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-blue-600"
                            onClick={() => selectedPost && handleAddComment(selectedPost.id)}
                            disabled={!newComment.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-4 flex flex-col lg:flex-row gap-8">
                <div className="flex-1 whitespace-pre-line">{post.content}</div>
                {post.media && (
                  <div onClick={() => toggleComments(post.id)} className="rounded-md overflow-hidden w-full lg:w-56">
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
                  <Button variant="ghost" size="sm" className="gap-1 text-gray-600 hover:text-pink-600">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-gray-600 hover:text-sky-600"
                    onClick={() => toggleComments(post.id)}
                  >
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
                  <h1 className="text-gray-600 lg:flex hidden">Liked by Aryan and {post.likes - 1} others</h1>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-sky-600">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
              <h1 className="text-gray-600 px-4 pb-2 flex lg:hidden">Liked by Aryan and {post.likes - 1} others</h1>
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
