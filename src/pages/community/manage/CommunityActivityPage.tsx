"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronLeft, ChevronRight, MessageSquare, MoreHorizontal } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"

export default function CommunityActivityPage() {
  const params = useParams()
  const navigate = useNavigate()
  const communityId = params.communityId as string
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // Sample activity data
  const allActivity = [
    {
      id: 1,
      type: "post",
      title: "How mindfulness improved my design process",
      author: {
        name: "Jasmine Turner",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 days ago",
      comments: 12,
      likes: 45,
    },
    {
      id: 2,
      type: "post",
      title: "Weekly meditation challenge: Day 5 reflections",
      author: {
        name: "John Rose",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "3 days ago",
      comments: 8,
      likes: 32,
    },
    {
      id: 3,
      type: "post",
      title: "Creative block? Try these mindfulness exercises",
      author: {
        name: "Olivia Martinez",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "5 days ago",
      comments: 15,
      likes: 67,
    },
    {
      id: 4,
      type: "event_created",
      title: "Mindful Mornings - Sunrise Meditation Series",
      author: {
        name: "Olivia Martinez",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "1 week ago",
      eventDate: "Feb 24, 2024",
    },
    {
      id: 5,
      type: "member_joined",
      author: {
        name: "Alex Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "1 week ago",
    },
    {
      id: 6,
      type: "post",
      title: "Mindfulness for remote work: Finding balance",
      author: {
        name: "Sarah Williams",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "1 week ago",
      comments: 18,
      likes: 52,
    },
    {
      id: 7,
      type: "event_created",
      title: "Creative Flow Workshop",
      author: {
        name: "John Rose",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 weeks ago",
      eventDate: "Mar 3, 2024",
    },
    {
      id: 8,
      type: "post",
      title: "My journey from burnout to mindful productivity",
      author: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 weeks ago",
      comments: 22,
      likes: 78,
    },
    {
      id: 9,
      type: "member_joined",
      author: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 weeks ago",
    },
    {
      id: 10,
      type: "post",
      title: "Book review: The Mindful Designer",
      author: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 weeks ago",
      comments: 7,
      likes: 34,
    },
    {
      id: 11,
      type: "post",
      title: "Mindful communication in creative teams",
      author: {
        name: "David Kim",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "3 weeks ago",
      comments: 14,
      likes: 41,
    },
    {
      id: 12,
      type: "member_joined",
      author: {
        name: "Lisa Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "3 weeks ago",
    },
  ]

  // Paginated activity
  const paginatedActivity = allActivity.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(allActivity.length / itemsPerPage)

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" onClick={() => navigate(`community/manage/${communityId}`)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Community Activity</h1>
        <p className="text-muted-foreground">All activity in your community</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Input placeholder="Search activity..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Type: All
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Activity</DropdownMenuItem>
              <DropdownMenuItem>Posts</DropdownMenuItem>
              <DropdownMenuItem>Events</DropdownMenuItem>
              <DropdownMenuItem>New Members</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort: Newest
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Oldest</DropdownMenuItem>
            <DropdownMenuItem>Most Engagement</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {paginatedActivity.map((activity) => (
          <Card key={activity.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.author.image || "/placeholder.svg"} alt={activity.author.name} />
                    <AvatarFallback>{activity.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{activity.author.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {activity.type === "post"
                          ? "Created Post"
                          : activity.type === "event_created"
                            ? "Created Event"
                            : "Joined Community"}
                      </Badge>
                    </div>
                    <CardDescription>{activity.date}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {activity.type === "post" && (
                      <>
                        <DropdownMenuItem>View Post</DropdownMenuItem>
                        <DropdownMenuItem>Edit Post</DropdownMenuItem>
                        <DropdownMenuItem>Delete Post</DropdownMenuItem>
                      </>
                    )}
                    {activity.type === "event_created" && (
                      <>
                        <DropdownMenuItem>View Event</DropdownMenuItem>
                        <DropdownMenuItem>Edit Event</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                      </>
                    )}
                    {activity.type === "member_joined" && (
                      <>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Message Member</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {activity.type === "post" && (
                <div>
                  <h3 className="font-semibold mb-2">{activity.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {activity.comments} comments
                    </div>
                    <div>{activity.likes} likes</div>
                  </div>
                </div>
              )}
              {activity.type === "event_created" && (
                <div>
                  <h3 className="font-semibold mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">Event scheduled for {activity.eventDate}</p>
                </div>
              )}
              {activity.type === "member_joined" && <p>Joined the community</p>}
            </CardContent>
            <CardFooter>
              {activity.type === "post" && (
                <Button variant="outline" size="sm">
                  View Post
                </Button>
              )}
              {activity.type === "event_created" && (
                <Button variant="outline" size="sm">
                  View Event
                </Button>
              )}
              {activity.type === "member_joined" && (
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{paginatedActivity.length}</strong> of <strong>{allActivity.length}</strong> activities
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
