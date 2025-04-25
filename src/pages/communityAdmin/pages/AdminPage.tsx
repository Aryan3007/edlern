import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  FileText,
  Settings,
  Bell,
  Flag,
  UserPlus,
  BookOpen,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"

export default function AdminPage() {
  return (
    <div className="container">
     
        

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your community and monitor performance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="admin-stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground">Total Members</p>
                  <h3 className="text-3xl font-bold mt-1">181,842</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>12% this month</span>
                  </div>
                </div>
                <Users className="admin-stat-icon" />
              </div>
            </Card>
            <Card className="admin-stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground">Active Users</p>
                  <h3 className="text-3xl font-bold mt-1">24,512</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>8% this week</span>
                  </div>
                </div>
                <UserPlus className="admin-stat-icon" />
              </div>
            </Card>
            <Card className="admin-stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground">Course Enrollments</p>
                  <h3 className="text-3xl font-bold mt-1">42,368</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                    <ArrowDownRight className="h-3 w-3" />
                    <span>3% this week</span>
                  </div>
                </div>
                <BookOpen className="admin-stat-icon" />
              </div>
            </Card>
            <Card className="admin-stat-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground">Posts Created</p>
                  <h3 className="text-3xl font-bold mt-1">8,924</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>15% this week</span>
                  </div>
                </div>
                <FileText className="admin-stat-icon" />
              </div>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Community Growth</CardTitle>
                    <CardDescription>Member growth over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-end justify-between">
                      {Array.from({ length: 30 }).map((_, i) => {
                        const height = 30 + Math.random() * 70
                        return (
                          <div key={i} className="relative group">
                            <div
                              className="w-2 bg-primary/80 rounded-t-sm hover:bg-primary transition-colors"
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {Math.floor(height * 10)} users
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest community updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: "join", user: "Samual Benson", time: "5 minutes ago" },
                        { type: "post", user: "Latif Skool", time: "15 minutes ago" },
                        { type: "course", user: "Andrew Heydt", time: "1 hour ago" },
                        { type: "report", user: "Brad Cassidy", time: "2 hours ago" },
                        { type: "join", user: "Joel Morrow", time: "3 hours ago" },
                      ].map((activity, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              activity.type === "join"
                                ? "bg-green-100 dark:bg-green-900"
                                : activity.type === "post"
                                  ? "bg-blue-100 dark:bg-blue-900"
                                  : activity.type === "course"
                                    ? "bg-amber-100 dark:bg-amber-900"
                                    : "bg-red-100 dark:bg-red-900"
                            }`}
                          >
                            {activity.type === "join" && (
                              <UserPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
                            )}
                            {activity.type === "post" && (
                              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            )}
                            {activity.type === "course" && (
                              <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            )}
                            {activity.type === "report" && <Flag className="h-4 w-4 text-red-600 dark:text-red-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              {activity.type === "join" && " joined the community"}
                              {activity.type === "post" && " created a new post"}
                              {activity.type === "course" && " enrolled in a course"}
                              {activity.type === "report" && " reported a post"}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Courses</CardTitle>
                    <CardDescription>Most popular courses by enrollment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Aesthetic Body 2.0", enrollments: 12580, growth: 8 },
                        { title: "Full Health Guide", enrollments: 9845, growth: 5 },
                        { title: "Start Martial Arts", enrollments: 7632, growth: 12 },
                        { title: "Full Dating Guide", enrollments: 6921, growth: -2 },
                        { title: "Male Advantage", enrollments: 5487, growth: 3 },
                      ].map((course, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="font-medium text-lg">{i + 1}</div>
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {course.enrollments.toLocaleString()} enrollments
                              </div>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              course.growth > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {course.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span>{Math.abs(course.growth)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                    <CardDescription>Most active community members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Latif Skool",
                          image: "/placeholder.svg?height=40&width=40&text=LS",
                          posts: 156,
                          level: 9,
                        },
                        {
                          name: "Samual Benson",
                          image: "/placeholder.svg?height=40&width=40&text=SB",
                          posts: 124,
                          level: 8,
                        },
                        {
                          name: "Andrew Heydt",
                          image: "/placeholder.svg?height=40&width=40&text=AH",
                          posts: 98,
                          level: 7,
                        },
                        {
                          name: "Brad Cassidy",
                          image: "/placeholder.svg?height=40&width=40&text=BC",
                          posts: 87,
                          level: 6,
                        },
                        {
                          name: "Joel Morrow",
                          image: "/placeholder.svg?height=40&width=40&text=JM",
                          posts: 76,
                          level: 6,
                        },
                      ].map((user, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.posts} posts</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Level {user.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Member Management</CardTitle>
                      <CardDescription>View and manage community members</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search members..." className="pl-9 w-[250px]" />
                      </div>
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button>Add Member</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">Member</div>
                      <div>Level</div>
                      <div>Status</div>
                      <div>Joined</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        name: "Latif Skool",
                        image: "/placeholder.svg?height=40&width=40&text=LS",
                        level: 9,
                        status: "active",
                        joined: "Mar 2022",
                      },
                      {
                        name: "Samual Benson",
                        image: "/placeholder.svg?height=40&width=40&text=SB",
                        level: 8,
                        status: "active",
                        joined: "Apr 2022",
                      },
                      {
                        name: "Andrew Heydt",
                        image: "/placeholder.svg?height=40&width=40&text=AH",
                        level: 7,
                        status: "active",
                        joined: "May 2022",
                      },
                      {
                        name: "Brad Cassidy",
                        image: "/placeholder.svg?height=40&width=40&text=BC",
                        level: 6,
                        status: "inactive",
                        joined: "Jun 2022",
                      },
                      {
                        name: "Joel Morrow",
                        image: "/placeholder.svg?height=40&width=40&text=JM",
                        level: 6,
                        status: "active",
                        joined: "Jul 2022",
                      },
                      {
                        name: "Charlie Herod",
                        image: "/placeholder.svg?height=40&width=40&text=CH",
                        level: 5,
                        status: "active",
                        joined: "Aug 2022",
                      },
                      {
                        name: "Nelson Rodriguez",
                        image: "/placeholder.svg?height=40&width=40&text=NR",
                        level: 5,
                        status: "active",
                        joined: "Sep 2022",
                      },
                      {
                        name: "Moiz Abbasi",
                        image: "/placeholder.svg?height=40&width=40&text=MA",
                        level: 4,
                        status: "inactive",
                        joined: "Oct 2022",
                      },
                      {
                        name: "Lorenzo Bertotti",
                        image: "/placeholder.svg?height=40&width=40&text=LB",
                        level: 4,
                        status: "active",
                        joined: "Nov 2022",
                      },
                      {
                        name: "Douglas W",
                        image: "/placeholder.svg?height=40&width=40&text=DW",
                        level: 3,
                        status: "active",
                        joined: "Dec 2022",
                      },
                    ].map((member, i) => (
                      <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{member.name}</div>
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Level {member.level}
                          </Badge>
                        </div>
                        <div>
                          <Badge className={member.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{member.joined}</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">Showing 10 of 181,842 members</div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Content Management</CardTitle>
                      <CardDescription>Manage posts, courses, and other content</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search content..." className="pl-9 w-[250px]" />
                      </div>
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button>Add Content</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="posts">Posts</TabsTrigger>
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                        <div className="col-span-2">Title</div>
                        <div>Author</div>
                        <div>Status</div>
                        <div>Date</div>
                        <div className="text-right">Actions</div>
                      </div>
                      {[
                        {
                          title: "🔥 SIGN UP NOW! 🔥 Join the ultimate community for self-improvement",
                          author: "Hamza Ahmed",
                          status: "published",
                          date: "2h ago",
                          pinned: true,
                        },
                        {
                          title: "Netflix, but for self improvement",
                          author: "Hamza Ahmed",
                          status: "published",
                          date: "5h ago",
                        },
                        {
                          title: "✅ THE BEST EXERCISE FOR EACH MUSCLE GROUP",
                          author: "Aaron Barayeyan",
                          status: "published",
                          date: "8h ago",
                        },
                        {
                          title: "Old physique vs New 🔥 🔥 🔥",
                          author: "Sergio Pereira",
                          status: "published",
                          date: "12h ago",
                        },
                        {
                          title: "I want to move out from my parents house",
                          author: "Rahul S",
                          status: "published",
                          date: "1d ago",
                        },
                        {
                          title: "How to stay consistent with your workouts",
                          author: "Brad Cassidy",
                          status: "draft",
                          date: "1d ago",
                        },
                        {
                          title: "My 30-day dopamine detox results",
                          author: "Joel Morrow",
                          status: "pending",
                          date: "2d ago",
                        },
                        {
                          title: "The ultimate morning routine for productivity",
                          author: "Andrew Heydt",
                          status: "published",
                          date: "3d ago",
                        },
                        {
                          title: "How I went from skinny to muscular in 6 months",
                          author: "Charlie Herod",
                          status: "published",
                          date: "4d ago",
                        },
                        {
                          title: "5 books that changed my life",
                          author: "Latif Skool",
                          status: "published",
                          date: "5d ago",
                        },
                      ].map((post, i) => (
                        <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                          <div className="col-span-2 flex items-center gap-2">
                            <div className="font-medium truncate">{post.title}</div>
                            {post.pinned && (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                              >
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <div className="text-muted-foreground">{post.author}</div>
                          <div>
                            <Badge
                              className={
                                post.status === "published"
                                  ? "bg-green-500"
                                  : post.status === "draft"
                                    ? "bg-gray-500"
                                    : "bg-amber-500"
                              }
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground">{post.date}</div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Reported Content</CardTitle>
                      <CardDescription>Review and moderate reported content</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">Content</div>
                      <div>Reported By</div>
                      <div>Reason</div>
                      <div>Date</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        content: "This is spam content trying to sell products",
                        author: "User 123",
                        reportedBy: "Samual Benson",
                        reason: "Spam",
                        date: "2h ago",
                        severity: "high",
                      },
                      {
                        content: "Inappropriate comment with offensive language",
                        author: "User 456",
                        reportedBy: "Andrew Heydt",
                        reason: "Harassment",
                        date: "5h ago",
                        severity: "high",
                      },
                      {
                        content: "Misleading information about supplements",
                        author: "User 789",
                        reportedBy: "Brad Cassidy",
                        reason: "Misinformation",
                        date: "1d ago",
                        severity: "medium",
                      },
                      {
                        content: "Duplicate post from the same user",
                        author: "User 101",
                        reportedBy: "Joel Morrow",
                        reason: "Spam",
                        date: "2d ago",
                        severity: "low",
                      },
                      {
                        content: "Self-promotion without community contribution",
                        author: "User 202",
                        reportedBy: "Charlie Herod",
                        reason: "Self-promotion",
                        date: "3d ago",
                        severity: "medium",
                      },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium truncate">{report.content}</div>
                          <div className="text-xs text-muted-foreground">By: {report.author}</div>
                        </div>
                        <div className="text-muted-foreground">{report.reportedBy}</div>
                        <div>
                          <Badge
                            className={
                              report.severity === "high"
                                ? "bg-red-500"
                                : report.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }
                          >
                            {report.reason}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{report.date}</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Settings</CardTitle>
                  <CardDescription>Configure your community settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Community Name</label>
                        <Input defaultValue="Adonis Gang" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Community URL</label>
                        <Input defaultValue="adonis-gang" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input defaultValue="Join the #1 masculine self-improvement community" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input defaultValue="Self Improvement" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy & Permissions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Private Community</div>
                          <div className="text-sm text-muted-foreground">Only approved members can join</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline">Public</Button>
                          <Button>Private</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Member Approval</div>
                          <div className="text-sm text-muted-foreground">Require admin approval for new members</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button>Required</Button>
                          <Button variant="outline">Not Required</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Content Posting</div>
                          <div className="text-sm text-muted-foreground">Who can post content</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button>All Members</Button>
                          <Button variant="outline">Level 2+</Button>
                          <Button variant="outline">Admins Only</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Admin Team</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Hamza Ahmed", image: "/placeholder.svg?height=40&width=40&text=HA", role: "Owner" },
                        { name: "Latif Skool", image: "/placeholder.svg?height=40&width=40&text=LS", role: "Admin" },
                        { name: "Samual Benson", image: "/placeholder.svg?height=40&width=40&text=SB", role: "Admin" },
                        {
                          name: "Andrew Heydt",
                          image: "/placeholder.svg?height=40&width=40&text=AH",
                          role: "Moderator",
                        },
                        {
                          name: "Brad Cassidy",
                          image: "/placeholder.svg?height=40&width=40&text=BC",
                          role: "Moderator",
                        },
                      ].map((admin, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={admin.image || "/placeholder.svg"} alt={admin.name} />
                              <AvatarFallback>{admin.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{admin.name}</div>
                              <div className="text-sm text-muted-foreground">{admin.role}</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      ))}
                      <Button className="w-full">Add Admin</Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
     
    </div>
  )
}
