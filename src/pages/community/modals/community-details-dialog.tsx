"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Check, Users } from "lucide-react"

interface Community {
  id: number
  name: string
  image: string
  coverImage: string
  members: number
  description: string
  categories: string[]
  featured: boolean
}

interface CommunityDetailsDialogProps {
  community: Community
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunityDetailsDialog({ community, open, onOpenChange }: CommunityDetailsDialogProps) {
  const [joined, setJoined] = useState(false)

  // Sample data for community details
  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Meditation Session",
      date: "Feb 24th",
      time: "8:00 AM (EST)",
    },
    {
      id: 2,
      title: "Community Discussion: Mindfulness at Work",
      date: "Mar 3rd",
      time: "6:00 PM (EST)",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Welcome to our new members!",
      author: "Community Admin",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Share your mindfulness journey",
      author: "Jasmine Turner",
      date: "5 days ago",
    },
    {
      id: 3,
      title: "Resources for beginners",
      author: "John Rose",
      date: "1 week ago",
    },
  ]

  const moderators = [
    {
      id: 1,
      name: "Olivia Martinez",
      role: "Founder",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jasmine Turner",
      role: "Moderator",
      image: "/placeholder.svg?height=40&width=40",
    },

  ]

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="relative">
          <div className="lg:h-48 h-24 w-full bg-cover bg-black bg-center" style={{ backgroundImage: `url(${community.coverImage})` }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24" />
        </div>

        <div className="px-6 pb-6 pt-0 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
              <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{community.name}</h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {community.members.toLocaleString()} members
                </div>
                <span>•</span>
                <div className="flex flex-wrap gap-1">
                  {community.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs bg-lime-100 text-lime-600">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button className={joined ? "bg-lime-600 hover:bg-lime-700" : ""} onClick={() => setJoined(!joined)}>
              {joined ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Joined
                </>
              ) : (
                "Join Community"
              )}
            </Button>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this community</h3>
                  <p className="text-muted-foreground text-sm">{community.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Community Moderators</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moderators.map((moderator) => (
                      <div key={moderator.id} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={moderator.image || "/placeholder.svg"} alt={moderator.name} />
                          <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{moderator.name}</p>
                          <p className="text-xs text-muted-foreground">{moderator.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border bg-muted text-center">
                          <span className="text-sm font-semibold">{event.date.split(" ")[0]}</span>
                          <span className="text-xs">{event.date.split(" ")[1]}</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            {event.date} at {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming events scheduled.</p>
                )}
              </TabsContent>

              <TabsContent value="discussions" className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Recent Discussions</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="border-b pb-3">
                      <h4 className="font-semibold">{post.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Posted by {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Community Members</h3>
                <p className="text-muted-foreground">
                  This community has {community.members.toLocaleString()} members.
                </p>
                <Button variant="outline" className="w-full">
                  View All Members
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
