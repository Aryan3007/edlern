import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const courses = [
  {
    id: 1,
    title: "The Red Pill 2.0 (coming soon)",
    description: "Brutal & controversial. Watch this to become the bad boy that girls actually want to connect with",
    image: "/placeholder.svg?height=200&width=400&text=Red+Pill",
    progress: 0,
  },
  {
    id: 2,
    title: "Aesthetic Body 2.0",
    description: "Build a 10/10 aesthetic body",
    image: "/placeholder.svg?height=200&width=400&text=Aesthetic+Body",
    progress: 0,
  },
  {
    id: 3,
    title: "Start Martial Arts",
    description: "I won my first fight with a knock out head kick!",
    image: "/placeholder.svg?height=200&width=400&text=Martial+Arts",
    progress: 0,
  },
  {
    id: 4,
    title: "Full Health Guide",
    description: "Master your mental health, sleep, fitness and testosterone",
    image: "/placeholder.svg?height=200&width=400&text=Health+Guide",
    progress: 0,
  },
  {
    id: 5,
    title: "Full Work Guide",
    description: "Become a top performer who gets more done in one morning than most do in a week",
    image: "/placeholder.svg?height=200&width=400&text=Work+Guide",
    progress: 0,
  },
  {
    id: 6,
    title: "Full Dating Guide",
    description: "How to find a beautiful, feminine woman",
    image: "/placeholder.svg?height=200&width=400&text=Dating+Guide",
    progress: 0,
  },
  {
    id: 7,
    title: "Male Advantage",
    description: "By 1STMAN (160k followers)",
    image: "/placeholder.svg?height=200&width=400&text=Male+Advantage",
    progress: 0,
  },
  {
    id: 8,
    title: "Quit Porn Forever",
    description: "Jak Piggott's exclusive guide to help beat porn addiction",
    image: "/placeholder.svg?height=200&width=400&text=Quit+Porn",
    progress: 0,
  },
  {
    id: 9,
    title: "Adonis Gang Full Guides",
    description: "Hamza's FREE full guides for AG members!",
    image: "/placeholder.svg?height=200&width=400&text=Full+Guides",
    progress: 0,
  },
]

export default function ClassroomPage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-0 mt-auto">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-center text-sm text-gray-500 mt-2">1-9 of 9</div>
    </div>
  )
}