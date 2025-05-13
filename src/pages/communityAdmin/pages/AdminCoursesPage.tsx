import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash, BookOpen, Users, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminCoursesPage() {
  return (
    <div className="container py-6">
      <div className="admin-layout">

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Course Management</h1>
              <p className="text-muted-foreground">Manage and monitor all courses</p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Courses</CardTitle>
                  <CardDescription>Manage your educational content</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-9 w-full md:w-[250px]" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="mindset">Mindset</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="dating">Dating</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Aesthetic Body 2.0",
                    description: "Build a 10/10 aesthetic body",
                    image: "/placeholder.svg?height=200&width=400&text=Aesthetic+Body",
                    instructor: "Hamza Ahmed",
                    students: 12580,
                    rating: 4.8,
                    reviews: 342,
                    progress: 100,
                    lastUpdated: "Mar 2023",
                    lessons: 24,
                  },
                  {
                    title: "Full Health Guide",
                    description: "Master your mental health, sleep, fitness and testosterone",
                    image: "/placeholder.svg?height=200&width=400&text=Health+Guide",
                    instructor: "Hamza Ahmed",
                    students: 9845,
                    rating: 4.7,
                    reviews: 256,
                    progress: 100,
                    lastUpdated: "Jan 2023",
                    lessons: 32,
                  },
                  {
                    title: "Start Martial Arts",
                    description: "I won my first fight with a knock out head kick!",
                    image: "/placeholder.svg?height=200&width=400&text=Martial+Arts",
                    instructor: "Aaron Barayeyan",
                    students: 7632,
                    rating: 4.9,
                    reviews: 189,
                    progress: 100,
                    lastUpdated: "Feb 2023",
                    lessons: 18,
                  },
                  {
                    title: "Full Dating Guide",
                    description: "How to find a beautiful, feminine woman",
                    image: "/placeholder.svg?height=200&width=400&text=Dating+Guide",
                    instructor: "Hamza Ahmed",
                    students: 6921,
                    rating: 4.6,
                    reviews: 178,
                    progress: 100,
                    lastUpdated: "Dec 2022",
                    lessons: 20,
                  },
                  {
                    title: "Male Advantage",
                    description: "By 1STMAN (160k followers)",
                    image: "/placeholder.svg?height=200&width=400&text=Male+Advantage",
                    instructor: "1STMAN",
                    students: 5487,
                    rating: 4.8,
                    reviews: 156,
                    progress: 100,
                    lastUpdated: "Nov 2022",
                    lessons: 15,
                  },
                  {
                    title: "Quit Porn Forever",
                    description: "Jak Piggott's exclusive guide to help beat porn addiction",
                    image: "/placeholder.svg?height=200&width=400&text=Quit+Porn",
                    instructor: "Jak Piggott",
                    students: 4321,
                    rating: 4.9,
                    reviews: 132,
                    progress: 100,
                    lastUpdated: "Oct 2022",
                    lessons: 12,
                  },
                ].map((course, i) => (
                  <Card key={i} className="overflow-hidden pt-0">
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>

                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`/placeholder.svg?height=24&width=24&text=${course.instructor.charAt(0)}`}
                            alt={course.instructor}
                          />
                          <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{course.instructor}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span>
                            {course.rating} ({course.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Last updated: {course.lastUpdated}</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-muted-foreground">Showing 6 of 12 courses</div>
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

          
        </div>
      </div>
    </div>
  )
}
