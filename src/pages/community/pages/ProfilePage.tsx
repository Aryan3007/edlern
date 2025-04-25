import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MapPin, Calendar, Link2, Edit, Settings, Heart, MessageSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-lime-600">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User profile" />
                  <AvatarFallback className="text-2xl">AT</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">Aryan Tyagi</h2>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline" className="bg-lime-600/10 text-lime-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    <span className="text-xs">Level 1</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">
                  On a journey to become the best version of myself
                </p>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2023</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Link2 className="h-4 w-4" />
                  <span>instagram.com/aryantyagi</span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  <div>
                    <div className="font-semibold">156</div>
                    <div className="text-xs text-gray-500">Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold">2.4k</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="font-semibold">348</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6 w-full">
                  <Button className="flex-1">Follow</Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Self-improvement enthusiast focused on fitness, mindset, and productivity. Currently working on building
                my aesthetic physique and growing my online business.
              </p>

              <div>
                <h3 className="text-sm font-medium mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Fitness</Badge>
                  <Badge variant="outline">Entrepreneurship</Badge>
                  <Badge variant="outline">Mindfulness</Badge>
                  <Badge variant="outline">Reading</Badge>
                  <Badge variant="outline">Martial Arts</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Current Goals</h3>
                <ul className="text-sm space-y-1 list-disc pl-4">
                  <li>Reach 12% body fat</li>
                  <li>Read 24 books this year</li>
                  <li>Launch online coaching program</li>
                  <li>Master Brazilian Jiu-Jitsu basics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Aryan's Activity</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="posts">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6 space-y-6">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User profile" />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Aryan Tyagi</span>
                            <span className="text-xs text-gray-500">{post * 2} days ago</span>
                          </div>
                          <p className="mt-1">
                            {post === 1
                              ? "Just completed my first week of the new workout program. Already seeing some gains! 💪"
                              : post === 2
                                ? "Reading 'Atomic Habits' by James Clear. Game-changing insights on building better habits."
                                : "Morning meditation has been a game-changer for my productivity. 20 minutes of mindfulness sets the tone for the entire day."}
                          </p>
                          {post === 1 && (
                            <div className="mt-3 rounded-md overflow-hidden">
                              <img
                                src="/placeholder.svg?height=200&width=400&text=Workout+Progress"
                                alt="Workout progress"
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-4 mt-3">
                            <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
                              <Heart className="h-4 w-4" />
                              <span>{42 - post * 10}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
                              <MessageSquare className="h-4 w-4" />
                              <span>{12 - post * 3}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      {post < 3 && <Separator className="mt-4" />}
                    </div>
                  ))}
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">View More Posts</Button>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="mt-6 space-y-6">
                  {[1, 2, 3, 4].map((comment) => (
                    <div key={comment} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User profile" />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Aryan Tyagi</span>
                            <span className="text-xs text-gray-500">commented on Hamza's post</span>
                            <span className="text-xs text-gray-500">{comment} day ago</span>
                          </div>
                          <p className="mt-1 text-sm">
                            {comment === 1
                              ? "This is exactly what I needed to hear today. Thanks for sharing your wisdom!"
                              : comment === 2
                                ? "I've been implementing this strategy for a few weeks now and it's been a game-changer."
                                : comment === 3
                                  ? "Great point about consistency. That's the key that most people miss."
                                  : "Would love to see a more detailed breakdown of this in a future post."}
                          </p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                            <span className="font-medium">Hamza Ahmed</span>:{" "}
                            {comment === 1
                              ? "The most important thing in self-improvement is showing up every day, even when you don't feel like it."
                              : comment === 2
                                ? "Here's my 5-step morning routine that has transformed my productivity..."
                                : comment === 3
                                  ? "Consistency beats intensity every time. Small daily improvements lead to massive results."
                                  : "Three key principles that helped me build a successful online business from scratch..."}
                          </div>
                        </div>
                      </div>
                      {comment < 4 && <Separator className="mt-4" />}
                    </div>
                  ))}
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">View More Comments</Button>
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Aesthetic Body 2.0",
                        image: "/placeholder.svg?height=150&width=300&text=Aesthetic+Body",
                        progress: 35,
                        lastActivity: "2 days ago",
                      },
                      {
                        title: "Full Health Guide",
                        image: "/placeholder.svg?height=150&width=300&text=Health+Guide",
                        progress: 68,
                        lastActivity: "1 week ago",
                      },
                      {
                        title: "Start Martial Arts",
                        image: "/placeholder.svg?height=150&width=300&text=Martial+Arts",
                        progress: 12,
                        lastActivity: "3 days ago",
                      },
                      {
                        title: "Male Advantage",
                        image: "/placeholder.svg?height=150&width=300&text=Male+Advantage",
                        progress: 0,
                        lastActivity: "Not started",
                      },
                    ].map((course, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{course.title}</h3>
                          <div className="flex items-center justify-between mt-2 mb-1">
                            <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                            <span className="text-xs text-gray-500">Last activity: {course.lastActivity}</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <Button variant="outline" className="w-full mt-4">
                            Continue
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "First Post",
                        description: "Published your first post",
                        icon: "🏆",
                        date: "Mar 15, 2023",
                      },
                      {
                        title: "Rising Star",
                        description: "Reached Level 1",
                        icon: "⭐",
                        date: "Apr 2, 2023",
                      },
                      {
                        title: "Consistent Contributor",
                        description: "Posted for 7 days in a row",
                        icon: "🔥",
                        date: "Apr 10, 2023",
                      },
                      {
                        title: "Knowledge Seeker",
                        description: "Started first course",
                        icon: "📚",
                        date: "Apr 18, 2023",
                      },
                      {
                        title: "Community Builder",
                        description: "Made 10 meaningful comments",
                        icon: "🤝",
                        date: "May 5, 2023",
                      },
                      {
                        title: "Fitness Enthusiast",
                        description: "Completed 25% of Aesthetic Body 2.0",
                        icon: "💪",
                        date: "May 22, 2023",
                      },
                    ].map((achievement, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-lime-600/10 flex items-center justify-center text-2xl">
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
