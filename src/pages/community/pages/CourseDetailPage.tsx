import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Play,
  Star,
  CheckCircle2,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react"

// This would come from a database in a real app
const courseData = {
  id: "aesthetic-body-2",
  title: "Aesthetic Body 2.0",
  description:
    "Build a 10/10 aesthetic body with this comprehensive program designed for maximum muscle growth and fat loss.",
  instructor: {
    name: "Hamza Ahmed",
    image: "/placeholder.svg?height=40&width=40&text=HA",
    title: "Fitness Coach & Founder",
    verified: true,
  },
  progress: 35,
  totalLessons: 24,
  completedLessons: 8,
  duration: "12 weeks",
  rating: 4.8,
  reviews: 342,
  students: 12580,
  lastUpdated: "March 2023",
  level: "Intermediate",
  currentLesson: {
    id: "lesson-9",
    title: "Progressive Overload: The Key to Continuous Growth",
    duration: "18:42",
    description:
      "Learn how to implement progressive overload in your training to ensure continuous muscle growth and strength gains.",
    videoUrl: "/placeholder.svg?height=480&width=854&text=Video+Player",
  },
  modules: [
    {
      id: "module-1",
      title: "Foundation & Principles",
      lessons: [
        { id: "lesson-1", title: "Introduction to Aesthetic Body 2.0", duration: "10:24", completed: true },
        { id: "lesson-2", title: "Understanding Body Composition", duration: "15:36", completed: true },
        { id: "lesson-3", title: "The Science of Muscle Growth", duration: "22:15", completed: true },
        { id: "lesson-4", title: "Nutrition Fundamentals", duration: "19:48", completed: true },
      ],
    },
    {
      id: "module-2",
      title: "Training Methodology",
      lessons: [
        { id: "lesson-5", title: "Optimal Training Frequency", duration: "14:52", completed: true },
        { id: "lesson-6", title: "Volume vs. Intensity", duration: "16:30", completed: true },
        { id: "lesson-7", title: "Rest and Recovery Strategies", duration: "12:18", completed: true },
        { id: "lesson-8", title: "Exercise Selection for Aesthetics", duration: "20:05", completed: true },
      ],
    },
    {
      id: "module-3",
      title: "Advanced Techniques",
      lessons: [
        {
          id: "lesson-9",
          title: "Progressive Overload: The Key to Continuous Growth",
          duration: "18:42",
          completed: false,
          current: true,
        },
        { id: "lesson-10", title: "Mind-Muscle Connection", duration: "15:10", completed: false },
        { id: "lesson-11", title: "Advanced Training Techniques", duration: "23:45", completed: false },
        { id: "lesson-12", title: "Plateau Breaking Strategies", duration: "17:20", completed: false },
      ],
    },
    {
      id: "module-4",
      title: "Nutrition & Supplementation",
      lessons: [
        { id: "lesson-13", title: "Meal Planning for Muscle Growth", duration: "21:33", completed: false },
        { id: "lesson-14", title: "Optimal Protein Intake", duration: "16:45", completed: false },
        { id: "lesson-15", title: "Carbs and Fats: Finding the Right Balance", duration: "19:12", completed: false },
        {
          id: "lesson-16",
          title: "Supplement Guide: What Works and What Doesn't",
          duration: "24:30",
          completed: false,
        },
      ],
    },
    {
      id: "module-5",
      title: "Lifestyle & Long-term Success",
      lessons: [
        { id: "lesson-17", title: "Sleep Optimization for Recovery", duration: "14:25", completed: false },
        { id: "lesson-18", title: "Stress Management", duration: "12:50", completed: false },
        { id: "lesson-19", title: "Tracking Progress Effectively", duration: "18:15", completed: false },
        { id: "lesson-20", title: "Maintaining Motivation", duration: "15:40", completed: false },
      ],
    },
    {
      id: "module-6",
      title: "Specialized Protocols",
      lessons: [
        { id: "lesson-21", title: "Bulking Protocol", duration: "22:18", completed: false },
        { id: "lesson-22", title: "Cutting Protocol", duration: "20:45", completed: false },
        { id: "lesson-23", title: "Recomposition Strategy", duration: "25:10", completed: false },
        { id: "lesson-24", title: "Maintenance Phase", duration: "16:35", completed: false },
      ],
    },
  ],
  resources: [
    { id: "resource-1", title: "Workout Templates", type: "PDF", size: "2.4 MB" },
    { id: "resource-2", title: "Nutrition Calculator", type: "Excel", size: "1.8 MB" },
    { id: "resource-3", title: "Supplement Guide", type: "PDF", size: "3.2 MB" },
    { id: "resource-4", title: "Progress Tracker", type: "PDF", size: "1.5 MB" },
  ],
  discussions: [
    {
      id: "discussion-1",
      user: { name: "Brad Cassidy", image: "/placeholder.svg?height=40&width=40&text=BC" },
      message: "How many days per week should I train for optimal results?",
      time: "2 days ago",
      replies: 8,
    },
    {
      id: "discussion-2",
      user: { name: "Samual Benson", image: "/placeholder.svg?height=40&width=40&text=SB" },
      message: "I'm struggling with the mind-muscle connection on back exercises. Any tips?",
      time: "5 days ago",
      replies: 12,
    },
    {
      id: "discussion-3",
      user: { name: "Andrew Heydt", image: "/placeholder.svg?height=40&width=40&text=AH" },
      message: "What's the best way to track progressive overload?",
      time: "1 week ago",
      replies: 6,
    },
  ],
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  // In a real app, we would fetch the course data based on the courseId
  const course = courseData

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-black relative">
              <img
                src={course.currentLesson.videoUrl || "/placeholder.svg"}
                alt={course.currentLesson.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="h-16 w-16 rounded-full bg-lime-600/90 hover:bg-lime-600">
                  <Play className="h-8 w-8 text-lime-600-foreground" fill="currentColor" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{course.currentLesson.title}</h2>
                  <p className="text-muted-foreground mt-1">Lesson 9 of 24 • {course.currentLesson.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={course.instructor.image || "/placeholder.svg"} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.instructor.name}</div>
                    <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                  </div>
                </div>
                <p>{course.currentLesson.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.currentLesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>
                      {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Content Tabs */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-6">
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader className="bg-secondary/50 p-4">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 border-b last:border-0 hover:bg-secondary/30 transition-colors ${lesson.current ? "bg-lime-600/10" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-lime-600" />
                            ) : lesson.current ? (
                              <Play className="h-5 w-5 text-lime-600" fill="currentColor" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>Download supplementary materials for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-lime-600" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {resource.type} • {resource.size}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Discussions</CardTitle>
                  <CardDescription>Join the conversation with other students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.discussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={discussion.user.image || "/placeholder.svg"} alt={discussion.user.name} />
                            <AvatarFallback>{discussion.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{discussion.user.name}</div>
                              <div className="text-sm text-muted-foreground">{discussion.time}</div>
                            </div>
                            <p className="mt-1">{discussion.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="ghost" size="sm" className="gap-1 h-8">
                                <MessageSquare className="h-3 w-3" />
                                <span className="text-xs">{discussion.replies} replies</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full">View All Discussions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Course Info Card */}
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{course.lastUpdated}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500 opacity-80" />
                <span className="ml-2 text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.reviews} reviews)</span>
              </div>

              <div className="space-y-2">
                <Button className="w-full">Continue Learning</Button>
                <Button variant="outline" className="w-full">
                  Download Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
