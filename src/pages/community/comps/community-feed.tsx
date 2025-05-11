"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Star,
  Filter,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Send,
  MoreVertical,
  X,
  LinkIcon,
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
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

// Types for API response
interface Post {
  id: number
  author: string
  author_name: string
  content: string
  topic: string
  is_active: boolean
  content_type: number
  object_id: number
  content_object: string
  attachments: Attachment[]
  youtube_links: string[]
  links: string[]
  poll: Poll | null
  created_at: string
  is_pinned: boolean
  comments: Comment[]
  total_likes: number
  total_comments: number
}

interface Attachment {
  id: number
  file: string
  file_type: string
}

interface Poll {
  id: number
  question: string
  options: PollOption[]
  duration: string
  end_date: string
}

interface PollOption {
  id: number
  text: string
  votes: number
}

interface Comment {
  id: number
  author: string
  author_name: string
  content: string
  created_at: string
  total_likes: number
}

interface ApiResponse {
  message: string
  success: boolean
  data: {
    next: string | null
    previous: string | null
    count: number
    limit: number
    current_page: number
    total_pages: number
    results: Post[]
  }
}

export function CommunityFeed({ communityId }: { communityId: string }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // State
  const [activeTab, setActiveTab] = useState("all")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filters, setFilters] = useState({
    verified: false,
    withMedia: false,
    popular: false,
  })
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await axios.get<ApiResponse>(
          `https://edlern.weepul.in.net/api/v1/community/${communityId}/feed/posts/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (response.data.success) {
          // Extract posts from the results array
          setPosts(response.data.data.results || [])
        } else {
          setError("Failed to fetch posts")
        }
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("An error occurred while fetching posts")
      } finally {
        setLoading(false)
      }
    }

    if (accessToken) {
      fetchPosts()
    }
  }, [communityId, accessToken])

  // Filter posts based on active tab and filters
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "pinned" && !post.is_pinned) return false
    if (filters.withMedia && (!post.attachments || post.attachments.length === 0)) return false
    if (filters.popular && post.total_likes < 100) return false
    return true
  })

  // Handle adding a comment
  const handleAddComment = async (postId: number) => {
    if (!newComment.trim()) return

    try {
      // API call to add comment would go here
      // For now, just update the UI optimistically
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments ? [...post.comments] : []
          updatedComments.push({
            id: Math.random(), // Temporary ID until API response
            author: "current_user_id", // This would come from your auth state
            author_name: "You",
            content: newComment,
            created_at: new Date().toISOString(),
            total_likes: 0,
          })

          return {
            ...post,
            comments: updatedComments,
            total_comments: (post.total_comments || 0) + 1,
          }
        }
        return post
      })

      setPosts(updatedPosts)
      setNewComment("")
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  // Image navigation for post with multiple attachments
  const nextImage = () => {
    if (!selectedPost || !selectedPost.attachments || selectedPost.attachments.length <= 1) return
    setCurrentImageIndex((prev) => (prev === selectedPost.attachments.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!selectedPost || !selectedPost.attachments || selectedPost.attachments.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedPost.attachments.length - 1 : prev - 1))
  }

  // Open post detail view
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setCurrentImageIndex(0)
    setShowComments(false)
  }

  // Close post detail view
  const closePostDetail = () => {
    setSelectedPost(null)
    setCurrentImageIndex(0)
  }

  // Toggle comments view
  const toggleComments = (postId: number) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    if (selectedPost?.id === postId) {
      setShowComments(!showComments)
    } else {
      openPostDetail(post)
      setShowComments(true)
    }
  }

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return "Unknown time"

    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) return `${diffInSeconds}s ago`
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
      return `${Math.floor(diffInSeconds / 86400)}d ago`
    } catch (e) {
      console.error("Error formatting date:", e)
      return "Invalid date"
    }
  }

  // Safely get author's first character for avatar fallback
  const getAuthorInitial = (authorName: string | undefined) => {
    if (!authorName || typeof authorName !== "string") return "U"
    return authorName.charAt(0) || "U"
  }

  // Render content based on post type
  const renderPostContent = (post: Post) => {
    if (!post) return null

    return (
      <div className="flex-1 whitespace-pre-line">
        {post.content}

        {/* Render links if present */}
        {post.links && post.links.length > 0 && (
          <div className="mt-3 space-y-2">
            {post.links.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-blue-600 hover:underline">
                <LinkIcon className="h-4 w-4" />
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Render YouTube links if present */}
        {post.youtube_links && post.youtube_links.length > 0 && (
          <div className="mt-3 space-y-3">
            {post.youtube_links.map((link, index) => (
              <div key={index} className="aspect-video rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={link.replace("watch?v=", "embed/")}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}

        {/* Render poll if present */}
        {post.poll && (
          <div className="mt-3 border rounded-md p-3 bg-gray-50">
            <h3 className="font-medium">{post.poll.question}</h3>
            <div className="mt-2 space-y-2">
              {post.poll.options.map((option, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                    <span>{option.text}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${option.votes}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Poll ends: {post.poll.end_date ? new Date(post.poll.end_date).toLocaleDateString() : "Unknown"}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render post skeleton loaders
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Card key={`skeleton-${index}`} className="overflow-hidden gap-0 p-0">
          <CardHeader className="p-4 flex flex-row items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-[200px] w-full rounded-md" />
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardFooter>
        </Card>
      ))
  }

  return (
    <div className="space-y-4">
      <Card className="p-2">
        <CardContent className="p-0">
          <PostCreationDialog communityId={communityId} />
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
        {loading ? (
          renderSkeletons()
        ) : error ? (
          <Card className="p-8 text-center">
            <p className="text-red-500">{error}</p>
            <Button variant="link" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </Card>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden gap-0 p-0">
              <CardHeader className="p-4 flex flex-row items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt={post.author_name || "User"} />
                  <AvatarFallback>{getAuthorInitial(post.author_name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.author_name || "Anonymous"}</span>
                    {post.is_pinned && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 h-5 px-1">
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        <span className="text-xs">Pinned</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{formatRelativeTime(post.created_at)}</p>
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
                <Dialog
                  open={selectedPost?.id === post.id}
                  onOpenChange={(open) => {
                    if (!open) closePostDetail()
                    // Don't set it to open here - only let it be opened via explicit triggers
                  }}
                >
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
                            <AvatarImage src="/placeholder.svg" alt={selectedPost.author_name || "User"} />
                            <AvatarFallback>{getAuthorInitial(selectedPost.author_name)}</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{selectedPost?.author_name || "Anonymous"}</span>
                          {selectedPost?.is_pinned && (
                            <Badge variant="outline" className="bg-amber-100 text-amber-700 h-5 px-1">
                              <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                              <span className="text-xs">Pinned</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {selectedPost && formatRelativeTime(selectedPost.created_at)}
                        </p>
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
                        {selectedPost && renderPostContent(selectedPost)}

                        {/* Media content */}
                        {selectedPost && selectedPost.attachments && selectedPost.attachments.length > 0 && (
                          <div className="relative w-full mb-4 mt-4">
                            <img
                              src={selectedPost.attachments[currentImageIndex]?.file || "/placeholder.svg"}
                              alt={`Media ${currentImageIndex + 1}`}
                              className="w-full h-auto rounded-md"
                            />

                            {/* Navigation arrows - only show if multiple images */}
                            {selectedPost.attachments.length > 1 && (
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
                            {selectedPost.attachments.length > 1 && (
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                                {currentImageIndex + 1} / {selectedPost.attachments.length}
                              </div>
                            )}
                          </div>
                        )}
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
                            {selectedPost &&
                              `Liked by ${selectedPost.total_likes > 0 ? "Aryan and " + (selectedPost.total_likes - 1) + " others" : "no one yet"}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{selectedPost?.total_comments || 0} comments</span>
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
                          {selectedPost && selectedPost.comments && selectedPost.comments.length > 0 ? (
                            selectedPost.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8 mt-1">
                                  <AvatarImage src="/placeholder.svg" alt={comment.author_name || "User"} />
                                  <AvatarFallback>{getAuthorInitial(comment.author_name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-background rounded-2xl p-3">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="font-medium text-sm">{comment.author_name || "Anonymous"}</span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                    <span className="text-xs text-gray-500">
                                      {formatRelativeTime(comment.created_at)}
                                    </span>
                                    <button className="hover:text-gray-800 font-medium">Like</button>
                                    <button className="hover:text-gray-800 font-medium">Reply</button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                          )}
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
                {renderPostContent(post)}

                {post.attachments && post.attachments.length > 0 && (
                  <div onClick={() => toggleComments(post.id)} className="rounded-md overflow-hidden w-full lg:w-56">
                    <img
                      src={post.attachments[0]?.file || "/placeholder.svg"}
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
                    <span>{post.total_likes || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-gray-600 hover:text-sky-600"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.total_comments || 0}</span>
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
                  <h1 className="text-gray-600 lg:flex hidden">
                    Liked by Aryan and {post.total_likes > 0 ? post.total_likes - 1 : 0} others
                  </h1>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-sky-600">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
              <h1 className="text-gray-600 px-4 pb-2 flex lg:hidden">
                Liked by Aryan and {post.total_likes > 0 ? post.total_likes - 1 : 0} others
              </h1>
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
