"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Check, ChevronLeft, X } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export default function PendingApprovalsPage() {
  const { communityId } = useParams<{ communityId: string }>()
  const navigate = useNavigate()

  // Sample pending approvals data
  const joinRequests = [
    {
      id: 1,
      type: "join_request",
      user: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
        bio: "Graphic designer interested in mindfulness practices for creativity",
      },
      date: "2 hours ago",
    },
    {
      id: 4,
      type: "join_request",
      user: {
        name: "Lisa Johnson",
        image: "/placeholder.svg?height=40&width=40",
        bio: "Yoga instructor looking to connect with other mindfulness practitioners",
      },
      date: "1 day ago",
    },
  ]

  const contentApprovals = [
    {
      id: 2,
      type: "post_approval",
      user: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Sharing my mindfulness journey",
      preview:
        "I've been practicing mindfulness for the past 6 months and wanted to share my experience with the community...",
      date: "5 hours ago",
    },
    {
      id: 5,
      type: "post_approval",
      user: {
        name: "Robert Smith",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Meditation techniques for beginners",
      preview:
        "A collection of simple meditation techniques that helped me when I was starting my mindfulness journey...",
      date: "2 days ago",
    },
  ]

  const eventApprovals = [
    {
      id: 3,
      type: "event_approval",
      user: {
        name: "David Kim",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Mindful Writing Workshop",
      description:
        "A 2-hour workshop exploring how mindfulness can enhance your writing practice and help overcome writer's block.",
      date: "1 day ago",
      eventDate: "Mar 20, 2024",
      eventTime: "6:00 PM (EST)",
    },
  ]

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" onClick={() => navigate(`/community/manage/${communityId}`)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">Pending Approvals</h1>
        <p className="text-muted-foreground">Items waiting for your approval</p>
      </div>

      <Tabs defaultValue="join_requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="join_requests">Join Requests ({joinRequests.length})</TabsTrigger>
          <TabsTrigger value="content">Content Approvals ({contentApprovals.length})</TabsTrigger>
          <TabsTrigger value="events">Event Approvals ({eventApprovals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="join_requests" className="space-y-4">
          {joinRequests.length > 0 ? (
            joinRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.user.image || "/placeholder.svg"} alt={request.user.name} />
                        <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{request.user.name}</CardTitle>
                        <CardDescription>{request.date}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Join Request</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>{request.user.bio}</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="border-destructive text-destructive">
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No pending join requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {contentApprovals.length > 0 ? (
            contentApprovals.map((content) => (
              <Card key={content.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={content.user.image || "/placeholder.svg"} alt={content.user.name} />
                        <AvatarFallback>{content.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{content.user.name}</CardTitle>
                        <CardDescription>{content.date}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Post Approval</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-semibold">{content.title}</h3>
                  <p className="text-muted-foreground">{content.preview}</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Full Post
                    </Button>
                    <Button variant="outline" size="sm" className="border-destructive text-destructive">
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No pending content approvals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {eventApprovals.length > 0 ? (
            eventApprovals.map((event) => (
              <Card key={event.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={event.user.image || "/placeholder.svg"} alt={event.user.name} />
                        <AvatarFallback>{event.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{event.user.name}</CardTitle>
                        <CardDescription>{event.date}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Event Approval</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {event.eventDate} at {event.eventTime}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Event Details
                    </Button>
                    <Button variant="outline" size="sm" className="border-destructive text-destructive">
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No pending event approvals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
