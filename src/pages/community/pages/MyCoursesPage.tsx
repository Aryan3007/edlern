import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, Clock, Award, CheckCircle2 } from "lucide-react"

export default function MyCoursesPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Courses</h1>
            <p className="text-gray-500">Track your progress and continue learning</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input placeholder="Search courses..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Aesthetic Body 2.0",
                  description: "Build a 10/10 aesthetic body",
                  image: "/placeholder.svg?height=200&width=400&text=Aesthetic+Body",
                  progress: 35,
                  lastActivity: "2 days ago",
                  lessons: 24,
                  completed: 8,
                  timeLeft: "3 hours",
                },
                {
                  title: "Full Health Guide",
                  description: "Master your mental health, sleep, fitness and testosterone",
                  image: "/placeholder.svg?height=200&width=400&text=Health+Guide",
                  progress: 68,
                  lastActivity: "1 week ago",
                  lessons: 32,
                  completed: 22,
                  timeLeft: "2 hours",
                },
                {
                  title: "Start Martial Arts",
                  description: "I won my first fight with a knock out head kick!",
                  image: "/placeholder.svg?height=200&width=400&text=Martial+Arts",
                  progress: 12,
                  lastActivity: "3 days ago",
                  lessons: 18,
                  completed: 2,
                  timeLeft: "4 hours",
                },
              ].map((course, i) => (
                <Card key={i} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <h3 className="font-medium text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>

                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>
                          {course.completed}/{course.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.timeLeft} left</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                        <span className="text-xs text-gray-500">Last activity: {course.lastActivity}</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <Button className="mt-auto">Continue Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Full Dating Guide",
                  description: "How to find a beautiful, feminine woman",
                  image: "/placeholder.svg?height=200&width=400&text=Dating+Guide",
                  completedDate: "March 15, 2023",
                  lessons: 20,
                  certificate: true,
                },
              ].map((course, i) => (
                <Card key={i} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge className="bg-green-500 text-white border-none px-3 py-1 text-sm flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <h3 className="font-medium text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>

                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Completed on {course.completedDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      {course.certificate && (
                        <Button variant="outline" className="flex-1 gap-1">
                          <Award className="h-4 w-4" />
                          Certificate
                        </Button>
                      )}
                      <Button className="flex-1">Review Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Aesthetic Body 2.0",
                  description: "Build a 10/10 aesthetic body",
                  image: "/placeholder.svg?height=200&width=400&text=Aesthetic+Body",
                  progress: 35,
                  status: "in-progress",
                },
                {
                  title: "Full Health Guide",
                  description: "Master your mental health, sleep, fitness and testosterone",
                  image: "/placeholder.svg?height=200&width=400&text=Health+Guide",
                  progress: 68,
                  status: "in-progress",
                },
                {
                  title: "Start Martial Arts",
                  description: "I won my first fight with a knock out head kick!",
                  image: "/placeholder.svg?height=200&width=400&text=Martial+Arts",
                  progress: 12,
                  status: "in-progress",
                },
                {
                  title: "Full Dating Guide",
                  description: "How to find a beautiful, feminine woman",
                  image: "/placeholder.svg?height=200&width=400&text=Dating+Guide",
                  progress: 100,
                  status: "completed",
                },
                {
                  title: "Male Advantage",
                  description: "By 1STMAN (160k followers)",
                  image: "/placeholder.svg?height=200&width=400&text=Male+Advantage",
                  progress: 0,
                  status: "not-started",
                },
                {
                  title: "Quit Porn Forever",
                  description: "Jak Piggott's exclusive guide to help beat porn addiction",
                  image: "/placeholder.svg?height=200&width=400&text=Quit+Porn",
                  progress: 0,
                  status: "not-started",
                },
              ].map((course, i) => (
                <Card key={i} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    {course.status === "completed" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge className="bg-green-500 text-white border-none px-3 py-1 text-sm flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Completed
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 flex flex-col p-4">
                    <h3 className="font-medium text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>

                    {course.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="mt-auto">
                      {course.status === "not-started"
                        ? "Start Course"
                        : course.status === "completed"
                          ? "Review Course"
                          : "Continue Learning"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
