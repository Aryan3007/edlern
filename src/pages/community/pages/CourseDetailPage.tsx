import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Play,
  CheckCircle2,
  ThumbsUp,
  Share2,
  ChevronRight,
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
    subscribers: "245K",
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
  likes: 18542,
  views: "325K",
  uploadDate: "3 months ago",
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
  relatedCourses: [
    {
      id: "course-1",
      title: "Mobility Fundamentals",
      instructor: "Hamza Ahmed",
      thumbnail: "/placeholder.svg?height=100&width=160&text=Mobility",
      duration: "12 weeks",
      views: "186K",
    },
    {
      id: "course-2",
      title: "Nutrition Master Plan",
      instructor: "Mike Zhang",
      thumbnail: "/placeholder.svg?height=100&width=160&text=Nutrition",
      duration: "8 weeks",
      views: "324K",
    },
    {
      id: "course-3",
      title: "Home Workout Blueprint",
      instructor: "Sarah Johnson",
      thumbnail: "/placeholder.svg?height=100&width=160&text=Home+Workouts",
      duration: "10 weeks",
      views: "212K",
    },
    {
      id: "course-4",
      title: "Strength Foundation",
      instructor: "David Miller",
      thumbnail: "/placeholder.svg?height=100&width=160&text=Strength",
      duration: "16 weeks",
      views: "143K",
    },
  ]
}

export default function YouTubeStyleCourseLayout() {
  const course = courseData
  const [activeTab, setActiveTab] = useState("description")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Find the current module for initial accordion state
  const findCurrentModule = () => {
    for (const module of course.modules) {
      const hasCurrentLesson = module.lessons.some(lesson => lesson.current)
      if (hasCurrentLesson) return module.id
    }
    return course.modules[0].id
  }

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container with consistent max-width */}
      <div className="max-w-7xl mx-auto">
        {/* Flex Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="w-full lg:w-8/12">
            {/* Video Player Container */}
            <div className="w-full rounded-xl mt-4 overflow-hidden bg-black">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={course.currentLesson.videoUrl}
                    alt={course.currentLesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-16 w-16 rounded-full bg-sky-600/90 hover:bg-sky-600">
                      <Play className="h-8 w-8 text-sky-600-foreground" fill="currentColor" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Info Section */}
            <div className="py-4">
              <h1 className="text-xl md:text-2xl font-bold">{course.currentLesson.title}</h1>

              <div className="flex flex-wrap items-center justify-between mt-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <span>{course.views} views • {course.uploadDate}</span>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{course.likes.toLocaleString()}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Tabs with Consistent Width */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Button variant="outline" size="sm" className="text-xs gap-1">
                          <Clock className="h-3 w-3" /> {course.currentLesson.duration}
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs gap-1">
                          <BookOpen className="h-3 w-3" /> Lesson 9 of 24
                        </Button>
                      </div>

                      <div className="text-sm">
                        <p className="mb-4">{course.currentLesson.description}</p>
                        <p>This is lesson 9 of the {course.title} course. In this video, you'll learn how to properly implement progressive overload in your training routine to ensure continuous muscle growth and strength gains over time.</p>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Course Information</h3>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div>Level:</div>
                          <div>{course.level}</div>
                          <div>Duration:</div>
                          <div>{course.duration}</div>
                          <div>Total Students:</div>
                          <div>{course.students.toLocaleString()}</div>
                          <div>Last Updated:</div>
                          <div>{course.lastUpdated}</div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ChevronRight className="h-4 w-4 rotate-180" />
                          Previous Lesson
                        </Button>
                        <Button size="sm" className="gap-2">
                          Next Lesson
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {course.resources.map((resource) => (
                          <div
                            key={resource.id}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-sky-600" />
                              <div>
                                <div className="font-medium">{resource.title}</div>
                                <div className="text-xs text-muted-foreground">
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

                <TabsContent value="comments" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {course.discussions.map((discussion) => (
                          <div
                            key={discussion.id}
                            className="py-4 border-b last:border-0"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={discussion.user.image} alt={discussion.user.name} />
                                <AvatarFallback>{discussion.user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <div className="font-medium text-sm">{discussion.user.name}</div>
                                  <div className="text-xs text-muted-foreground">{discussion.time}</div>
                                </div>
                                <p className="mt-1 text-sm">{discussion.message}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>Like</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                    <MessageSquare className="h-3 w-3" />
                                    <span>Reply</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">Load More Comments</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
            <div className="w-full lg:w-4/12 relative">
            {/* Sidebar Content */}
            <div className={`mt-2 lg:mt-4 ${sidebarOpen || window.innerWidth < 1024 ? 'block' : 'hidden lg:block'}`}>
              {/* Course Progress */}
              <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="font-bold">{course.title}</h2>
                <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </div>
                </div>
              </CardContent>
              </Card>

              {/* Playlist */}
              <div className="border rounded-lg overflow-hidden mb-4">
              <div className="p-3 bg-secondary/50 flex items-center justify-between">
                <h3 className="font-medium">Course Playlist</h3>
                <div className="text-xs text-muted-foreground">{course.totalLessons} videos</div>
              </div>

              {/* Course Content Accordion */}
              <Accordion
                type="single"
                defaultValue={findCurrentModule()}
                collapsible
                className="w-full"
              >
                {course.modules.map((module) => (
                <AccordionItem key={module.id} value={module.id} className="border-b last:border-0">
                  <AccordionTrigger className="px-3 py-2 hover:bg-secondary/30 text-sm">
                  <div className="text-left">
                    <span>{module.title}</span>
                  </div>
                  </AccordionTrigger>
                  <AccordionContent>
                  <div className="space-y-0">
                    {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary/30 cursor-pointer transition-colors ${lesson.current ? "bg-secondary" : ""}`}
                    >
                      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-sky-600" />
                      ) : lesson.current ? (
                        <Play className="h-4 w-4 text-sky-600" fill="currentColor" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                      )}
                      </div>
                      <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                    </div>
                    ))}
                  </div>
                  </AccordionContent>
                </AccordionItem>
                ))}
              </Accordion>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}