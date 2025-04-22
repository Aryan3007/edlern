"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  FileText,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  PlusCircle,
  Settings,
  Shield,
  Trash2,
  Upload,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CommunityGrowthChart } from "../comps/community-growth-chart"
import { CommunityEngagementChart } from "../comps/community-engagement-chart"
import { CommunityStatsChart } from "../comps/community-stats-chart"
import { EditCommunityDialog } from "../comps/edit-community-dialog"
import { EditGuidelinesDialog } from "../comps/edit-guidelines-dialog"
import { useLocation, useNavigate, useParams } from "react-router-dom"


export default function ManageCommunityPage() {
const { communityId } = useParams<{ communityId: string }>()
const navigate = useNavigate()
const location = useLocation()
const searchParams = new URLSearchParams(location.search)

  // Get tab from URL or default to "overview"
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState(tabParam || "overview")

  // Update URL when tab changes
  useEffect(() => {
    if (tabParam !== activeTab) {
        navigate(`/community/manage/2?tab=${activeTab}`)
        // navigate(`community/manage/${communityId}?tab=${activeTab}`, { scroll: false })
    }
  }, [activeTab, communityId, navigate, tabParam])

  // Dialog states
  const [editCommunityOpen, setEditCommunityOpen] = useState(false)
  const [editGuidelinesOpen, setEditGuidelinesOpen] = useState(false)

  // Pagination states
  const [membersPage, setMembersPage] = useState(1)
  const [postsPage, setPostsPage] = useState(1)

  const itemsPerPage = 5

  // Sample community data
  const community = {
    id: communityId,
    name: "Mindful Creators",
    description:
      "A community for creative professionals practicing mindfulness. We explore how meditation and mindfulness can enhance creativity, reduce creative blocks, and improve work-life balance for designers, writers, artists, and other creative professionals.",
    image: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=800",
    members: 1243,
    posts: 856,
    events: 24,
    courses: 8,
    categories: ["Creativity", "Professional Development"],
    createdAt: "January 15, 2023",
    rules: [
      "Be respectful and kind to all members",
      "No self-promotion without prior approval",
      "Keep discussions relevant to mindfulness and creativity",
      "No spam or excessive posting",
    ],
    pendingApprovals: 5,
    reportedContent: 2,
    stats: {
      memberGrowth: [120, 145, 165, 210, 250, 310, 380, 450, 520, 620, 780, 1243],
      postActivity: [15, 22, 18, 25, 32, 38, 45, 52, 68, 75, 92, 110],
      engagement: [20, 22, 25, 30, 28, 35, 42, 45, 50, 55, 60, 68],
      newMembers: [10, 15, 20, 25, 40, 70, 65, 70, 75, 100, 160, 463],
    },
  }

  // Sample members data
  const allMembers = [
    {
      id: 1,
      name: "Olivia Martinez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Admin",
      joinedDate: "Jan 15, 2023",
      lastActive: "Today",
    },
    {
      id: 2,
      name: "Jasmine Turner",
      image: "/placeholder.svg?height=40&width=40",
      role: "Moderator",
      joinedDate: "Jan 20, 2023",
      lastActive: "Yesterday",
    },
    {
      id: 3,
      name: "John Rose",
      image: "/placeholder.svg?height=40&width=40",
      role: "Moderator",
      joinedDate: "Feb 5, 2023",
      lastActive: "2 days ago",
    },
    {
      id: 4,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Mar 10, 2023",
      lastActive: "1 week ago",
    },
    {
      id: 5,
      name: "Sarah Williams",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Apr 2, 2023",
      lastActive: "3 days ago",
    },
    {
      id: 6,
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Apr 15, 2023",
      lastActive: "Today",
    },
    {
      id: 7,
      name: "Emma Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "May 3, 2023",
      lastActive: "Yesterday",
    },
    {
      id: 8,
      name: "David Kim",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "May 20, 2023",
      lastActive: "3 days ago",
    },
    {
      id: 9,
      name: "Lisa Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Jun 5, 2023",
      lastActive: "1 week ago",
    },
    {
      id: 10,
      name: "Robert Smith",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Jun 18, 2023",
      lastActive: "2 weeks ago",
    },
    {
      id: 11,
      name: "Jennifer Lee",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Jul 2, 2023",
      lastActive: "3 days ago",
    },
    {
      id: 12,
      name: "Thomas Brown",
      image: "/placeholder.svg?height=40&width=40",
      role: "Member",
      joinedDate: "Jul 15, 2023",
      lastActive: "Today",
    },
  ]

  // Paginated members
  const paginatedMembers = allMembers.slice((membersPage - 1) * itemsPerPage, membersPage * itemsPerPage)
  const totalMemberPages = Math.ceil(allMembers.length / itemsPerPage)

  // Sample content data
  const allPosts = [
    {
      id: 1,
      title: "How mindfulness improved my design process",
      author: "Jasmine Turner",
      date: "2 days ago",
      comments: 12,
      likes: 45,
      status: "published",
    },
    {
      id: 2,
      title: "Weekly meditation challenge: Day 5 reflections",
      author: "John Rose",
      date: "3 days ago",
      comments: 8,
      likes: 32,
      status: "published",
    },
    {
      id: 3,
      title: "Creative block? Try these mindfulness exercises",
      author: "Olivia Martinez",
      date: "5 days ago",
      comments: 15,
      likes: 67,
      status: "published",
    },
    {
      id: 4,
      title: "Upcoming workshop announcement",
      author: "Alex Johnson",
      date: "1 week ago",
      comments: 5,
      likes: 28,
      status: "published",
    },
    {
      id: 5,
      title: "Mindfulness for remote work: Finding balance",
      author: "Sarah Williams",
      date: "1 week ago",
      comments: 18,
      likes: 52,
      status: "published",
    },
    {
      id: 6,
      title: "My journey from burnout to mindful productivity",
      author: "Michael Chen",
      date: "2 weeks ago",
      comments: 22,
      likes: 78,
      status: "published",
    },
    {
      id: 7,
      title: "Book review: The Mindful Designer",
      author: "Emma Wilson",
      date: "2 weeks ago",
      comments: 7,
      likes: 34,
      status: "published",
    },
    {
      id: 8,
      title: "Mindful communication in creative teams",
      author: "David Kim",
      date: "3 weeks ago",
      comments: 14,
      likes: 41,
      status: "published",
    },
  ]

  // Paginated posts
  const paginatedPosts = allPosts.slice((postsPage - 1) * itemsPerPage, postsPage * itemsPerPage)
  const totalPostPages = Math.ceil(allPosts.length / itemsPerPage)

  // Sample events data
  const allEvents = [
    {
      id: 1,
      title: "Mindful Mornings - Sunrise Meditation Series",
      date: "Feb 24, 2024",
      time: "8:00 AM (EST)",
      attendees: 42,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Creative Flow Workshop",
      date: "Mar 3, 2024",
      time: "6:00 PM (EST)",
      attendees: 28,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Monthly Community Meetup",
      date: "Mar 15, 2024",
      time: "7:00 PM (EST)",
      attendees: 0,
      status: "draft",
    },
    {
      id: 4,
      title: "Mindfulness for Creative Professionals",
      date: "Jan 15, 2024",
      time: "6:00 PM (EST)",
      attendees: 38,
      status: "past",
    },
    {
      id: 5,
      title: "Stress Management Workshop",
      date: "Mar 22, 2024",
      time: "5:00 PM (EST)",
      attendees: 15,
      status: "upcoming",
    },
    {
      id: 6,
      title: "Mindful Leadership Panel",
      date: "Apr 5, 2024",
      time: "7:00 PM (EST)",
      attendees: 0,
      status: "draft",
    },
    {
      id: 7,
      title: "Deep Relaxation: Extended Yoga Nidra Practice",
      date: "Dec 20, 2023",
      time: "8:00 PM (EST)",
      attendees: 65,
      status: "past",
    },
    {
      id: 8,
      title: "Mindfulness and Creativity Symposium",
      date: "Nov 10, 2023",
      time: "10:00 AM (EST)",
      attendees: 120,
      status: "past",
    },
  ]

  // Filter events by status
  const upcomingEvents = allEvents.filter((event) => event.status === "upcoming")
  const draftEvents = allEvents.filter((event) => event.status === "draft")
  const pastEvents = allEvents.filter((event) => event.status === "past")

  // Sample pending approvals
  const allPendingApprovals = [
    {
      id: 1,
      type: "join_request",
      user: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "2 hours ago",
    },
    {
      id: 2,
      type: "post_approval",
      user: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Sharing my mindfulness journey",
      date: "5 hours ago",
    },
    {
      id: 3,
      type: "event_approval",
      user: {
        name: "David Kim",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Mindful Writing Workshop",
      date: "1 day ago",
    },
    {
      id: 4,
      type: "join_request",
      user: {
        name: "Lisa Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
      date: "1 day ago",
    },
    {
      id: 5,
      type: "post_approval",
      user: {
        name: "Robert Smith",
        image: "/placeholder.svg?height=40&width=40",
      },
      title: "Meditation techniques for beginners",
      date: "2 days ago",
    },
  ]

  // Sample reported content
  const allReportedContent = [
    {
      id: 1,
      type: "post",
      title: "Off-topic promotional content",
      reporter: "John Rose",
      reported: "Emma Wilson",
      date: "1 day ago",
      reason: "Spam/Self-promotion",
    },
    {
      id: 2,
      type: "comment",
      title: "Inappropriate comment on meditation thread",
      reporter: "Sarah Williams",
      reported: "Anonymous User",
      date: "3 days ago",
      reason: "Inappropriate content",
    },
    {
      id: 3,
      type: "post",
      title: "Unrelated political discussion",
      reporter: "Michael Chen",
      reported: "Thomas Brown",
      date: "4 days ago",
      reason: "Off-topic",
    },
  ]

  return (
    <div className="container py-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
              <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{community.name}</h1>
                <Badge className="bg-lime-700">Admin</Badge>
              </div>
              <p className="text-muted-foreground">Community Management Dashboard</p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm" onClick={() => navigate(`/community/manage/${communityId}?tab=settings}`)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button> */}
            <Button className="bg-lime-600 hover:bg-lime-700 text-white" size="sm" onClick={() => setEditCommunityOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
            Quick Edit
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Members</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden md:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="moderation" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Moderation</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{community.members.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+24 this week</p>
                <Progress value={70} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{community.posts}</div>
                <p className="text-xs text-muted-foreground">+12 this week</p>
                <Progress value={45} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{community.events}</div>
                <p className="text-xs text-muted-foreground">2 upcoming</p>
                <Progress value={60} className="mt-2 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
                <Progress value={68} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest posts and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>By {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{post.comments} comments</Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
                  size="sm"
                  onClick={() => navigate(`/community/manage/${communityId}/activity`)}
                >
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allPendingApprovals.length > 0 ? (
                  allPendingApprovals.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.user.image || "/placeholder.svg"} alt={item.user.name} />
                          <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {item.type === "join_request"
                              ? `${item.user.name} requested to join`
                              : item.type === "post_approval"
                                ? `Post approval: ${item.title}`
                                : `Event approval: ${item.title}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white p-2"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white p-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No pending actions</p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
                  size="sm"
                  onClick={() => navigate(`/community/manage/${communityId}/pending`)}
                >
                  View All Pending
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>New members over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <CommunityGrowthChart data={community.stats.memberGrowth} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Monthly engagement percentage</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <CommunityEngagementChart data={community.stats.engagement} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Activity</CardTitle>
              <CardDescription>Posts, comments, and reactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <CommunityStatsChart posts={community.stats.postActivity} newMembers={community.stats.newMembers} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Community Members</h2>
              <p className="text-muted-foreground">Manage your community members and roles</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Input placeholder="Search members..." className="max-w-sm" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Role: All
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Roles</DropdownMenuItem>
                <DropdownMenuItem>Admin</DropdownMenuItem>
                <DropdownMenuItem>Moderator</DropdownMenuItem>
                <DropdownMenuItem>Member</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Member</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">Joined</th>
                      <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">Last Active</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {paginatedMembers.map((member) => (
                      <tr key={member.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={member.role === "Admin" ? "default" : "outline"}
                            className={member.role === "Admin" ? "bg-lime-600 text-white" : ""}
                          >
                            {member.role}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle hidden md:table-cell">{member.joinedDate}</td>
                        <td className="p-4 align-middle hidden md:table-cell">{member.lastActive}</td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{paginatedMembers.length}</strong> of <strong>{allMembers.length}</strong> members
              </div>
              <div className="flex items-center gap-2">
                <Button
                                className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"

                  variant="outline"
                  size="sm"
                  onClick={() => setMembersPage((prev) => Math.max(prev - 1, 1))}
                  disabled={membersPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {membersPage} of {totalMemberPages}
                </span>
                <Button
                className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
                  variant="outline"
                  size="sm"
                  onClick={() => setMembersPage((prev) => Math.min(prev + 1, totalMemberPages))}
                  disabled={membersPage === totalMemberPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Content Management</h2>
              <p className="text-muted-foreground">Manage posts, discussions, and other content</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </div>
          </div>

          <Tabs defaultValue="posts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search posts..." className="max-w-sm" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Status: All
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Published</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                    <DropdownMenuItem>Archived</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Author</th>
                          <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium hidden md:table-cell">
                            Engagement
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {paginatedPosts.map((post) => (
                          <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{post.title}</td>
                            <td className="p-4 align-middle">{post.author}</td>
                            <td className="p-4 align-middle hidden md:table-cell">{post.date}</td>
                            <td className="p-4 align-middle hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                <span>{post.comments}</span>
                                <span className="mx-1">•</span>
                                <span className="text-red-600">{post.likes} likes</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 text-white hover:bg-lime-700 hover:text-white bg-lime-600 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Post</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Post</DropdownMenuItem>
                                  <DropdownMenuItem>Pin to Top</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{paginatedPosts.length}</strong> of <strong>{allPosts.length}</strong> posts
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"

                      size="sm"
                      onClick={() => setPostsPage((prev) => Math.max(prev - 1, 1))}
                      disabled={postsPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {postsPage} of {totalPostPages}
                    </span>
                    <Button
                                          className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"

                      variant="outline"
                      size="sm"
                      onClick={() => setPostsPage((prev) => Math.min(prev + 1, totalPostPages))}
                      disabled={postsPage === totalPostPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="discussions">
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No active discussions found</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No resources found</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Event Management</h2>
              <p className="text-muted-foreground">Create and manage community events</p>
            </div>
            <div className="flex gap-2">
              <Button                       className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
 size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
              <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {event.date} at {event.time}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees} attendees registered</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                                            className="border-lime-700 text-lime-700"

                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/manage/${communityId}/events/${event.id}`)}
                      >
                        View Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button  variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="drafts" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {draftEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {event.date} at {event.time}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">Draft</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit Draft
                      </Button>
                      <Button                       className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
 size="sm">Publish</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {pastEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {event.date} at {event.time}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button                       className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white"
 variant="outline" size="sm">
                        View Summary
                      </Button>
                     
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Moderation</h2>
              <p className="text-muted-foreground">Manage approvals, reports, and community guidelines</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items waiting for your approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allPendingApprovals.length > 0 ? (
                  allPendingApprovals.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.user.image || "/placeholder.svg"} alt={item.user.name} />
                          <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {item.type === "join_request"
                              ? `${item.user.name} requested to join`
                              : item.type === "post_approval"
                                ? `Post approval: ${item.title}`
                                : `Event approval: ${item.title}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button                       className="bg-lime-600 h-8 hover:bg-lime-700 text-white hover:text-white"
 variant="outline" size="sm" >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="bg-red-600 h-8 hover:bg-red-700 text-white hover:text-white">
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No pending approvals</p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="bg-lime-600 w-full h-8 hover:bg-lime-700 text-white hover:text-white"
                
                  size="sm"
                  onClick={() => navigate(`/manage/${communityId}/pending`)}
                >
                  View All Pending ({allPendingApprovals.length})
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reported Content</CardTitle>
                <CardDescription>Content flagged by community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allReportedContent.length > 0 ? (
                  allReportedContent.map((item) => (
                    <div key={item.id} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{item.title}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Reported by {item.reporter} • {item.date}
                          </p>
                          <p>Reason: {item.reason}</p>
                        </div>
                      </div>
                      <Button className="border border-lime-700 text-lime-700" variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No reported content</p>
                )}
              </CardContent>
              <CardFooter>
                <Button
                                  className="bg-lime-600 w-full h-8 hover:bg-lime-700 text-white hover:text-white"

                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/manage/${communityId}/reports`)}
                >
                  View All Reports
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
              <CardDescription>Rules and guidelines for your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {community.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <p>{rule}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="border border-lime-700 text-lime-700" size="sm" onClick={() => setEditGuidelinesOpen(true)}>
                <Edit className="mr-2  h-4 w-4" />
                Edit Guidelines
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Community Settings</h2>
              <p className="text-muted-foreground">Configure your community preferences</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your community details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="community-name">Community Name</Label>
                <Input id="community-name" defaultValue={community.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="community-description">Description</Label>
                <Textarea id="community-description" defaultValue={community.description} rows={4} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Community Avatar</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
                      <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
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
                    style={{ backgroundImage: `url(${community.coverImage})` }}
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
            </CardContent>
            <CardFooter>
              <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Permissions</CardTitle>
              <CardDescription>Control who can join and what they can do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Community Visibility</Label>
                  <p className="text-sm text-muted-foreground">Who can see your community</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="border border-lime-700 text-lime-700" variant="outline">Public</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Public</DropdownMenuItem>
                    <DropdownMenuItem>Private</DropdownMenuItem>
                    <DropdownMenuItem>Hidden</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Membership</Label>
                  <p className="text-sm text-muted-foreground">How members can join</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="border border-lime-700 text-lime-700"  variant="outline">Request to Join</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Request to Join</DropdownMenuItem>
                    <DropdownMenuItem>Invite Only</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Member Permissions</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-permission" className="flex-1">
                      Members can create posts
                    </Label>
                    <Switch id="post-permission" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comment-permission" className="flex-1">
                      Members can comment on posts
                    </Label>
                    <Switch id="comment-permission" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="event-permission" className="flex-1">
                      Members can create events
                    </Label>
                    <Switch id="event-permission" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="invite-permission" className="flex-1">
                      Members can invite others
                    </Label>
                    <Switch id="invite-permission" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white">Save Permissions</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure community notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Member Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify admins when new members join</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Post Approval Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify admins when posts need approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send reminders about upcoming events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-lime-600 hover:bg-lime-700 text-white hover:text-white">Save Notification Settings</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  These actions are permanent and cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Archive Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Make the community read-only. No new content can be added.
                  </p>
                </div>
                <Button variant="outline" className="border-destructive text-destructive">
                  Archive
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Delete Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this community and all its content.
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Community Dialog */}
      <EditCommunityDialog
        open={editCommunityOpen}
        onOpenChange={setEditCommunityOpen}
        community={{ 
          ...community, 
          id: community.id || "", 
          members: community.members.toString(), 
          posts: community.posts.toString(), 
          events: community.events.toString(), 
          courses: community.courses.toString(), 
          pendingApprovals: community.pendingApprovals.toString(), 
          reportedContent: community.reportedContent.toString(),
          stats: JSON.stringify(community.stats) // Convert stats object to a string
        }}
      />

      {/* Edit Guidelines Dialog */}
      <EditGuidelinesDialog open={editGuidelinesOpen} onOpenChange={setEditGuidelinesOpen} rules={community.rules} />
    </div>
  )
}
