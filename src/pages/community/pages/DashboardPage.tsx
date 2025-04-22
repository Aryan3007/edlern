import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ChevronRight, Clock, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  // Sample data for the dashboard
  const stats = [
    { title: "Joined Communities", value: "12", icon: Users },
    { title: "Upcoming Events", value: "5", icon: CalendarDays },
    { title: "Completed Courses", value: "3", icon: Clock },
  ]

  const myCommunities = [
    {
      id: 1,
      name: "Mindful Creators",
      image: "/placeholder.svg?height=100&width=100",
      members: 1243,
      description: "A community for creative professionals practicing mindfulness",
    },
    {
      id: 2,
      name: "Meditation Masters",
      image: "/placeholder.svg?height=100&width=100",
      members: 856,
      description: "Advanced meditation techniques and discussions",
    },
    {
      id: 3,
      name: "Wellness Warriors",
      image: "/placeholder.svg?height=100&width=100",
      members: 1892,
      description: "Holistic approach to health and wellness through mindfulness",
    },
    {
      id: 4,
      name: "Zen Entrepreneurs",
      image: "/placeholder.svg?height=100&width=100",
      members: 743,
      description: "Mindful approaches to business and entrepreneurship",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Mindful Mornings - Sunrise Meditation Series",
      date: "Feb 24th",
      time: "8:00 AM (EST)",
      community: "Meditation Masters",
    },
    {
      id: 2,
      title: "Creative Flow Workshop",
      date: "Mar 3rd",
      time: "6:00 PM (EST)",
      community: "Mindful Creators",
    },
    {
      id: 3,
      title: "Stress Management for Entrepreneurs",
      date: "Mar 10th",
      time: "7:00 PM (EST)",
      community: "Zen Entrepreneurs",
    },
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "How Mindfulness Transformed My Creative Process",
      author: {
        name: "Jasmine Turner",
        image: "/placeholder.svg?height=40&width=40",
      },
      community: "Mindful Creators",
      excerpt:
        "Discover how incorporating mindfulness practices into my daily routine revolutionized my approach to design and creative problem-solving...",
    },
    {
      id: 2,
      title: "The Science Behind Meditation's Impact on Productivity",
      author: {
        name: "John Rose",
        image: "/placeholder.svg?height=40&width=40",
      },
      community: "Zen Entrepreneurs",
      excerpt:
        "Recent studies have shown remarkable connections between regular meditation practice and increased productivity in the workplace...",
    },
  ]

  return (
    <div className="container py-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your mindfulness journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex flex-row items-center justify-between py-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-lime-500/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-lime-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* My Communities Section */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>My Communities</CardTitle>
              <CardDescription>Communities you've joined</CardDescription>
            </div>
            <Button className="text-lime-600" variant="ghost" size="sm" asChild>
              <Link to="/explore">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {myCommunities.slice(0, 4).map((community) => (
                <div key={community.id} className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
                    <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-semibold">{community.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{community.description}</p>
                    <div className="flex items-center  text-xs text-lime-600 ">
                      <Users className="mr-1 h-3 w-3" />
                      {community.members.toLocaleString()} members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events from your communities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border bg-muted text-center">
                  <span className="text-sm font-semibold">{event.date.split(" ")[0]}</span>
                  <span className="text-xs">{event.date.split(" ")[1]}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold line-clamp-1">{event.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {event.time}
                  </div>
                  <div className="text-xs text-muted-foreground">{event.community}</div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button   variant="outline" size="sm" className="w-full bg-lime-600 hover:bg-lime-700 hover:text-white text-white" asChild>
              <Link to="/events">
                View all events
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Featured Blog Posts */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Featured Posts</CardTitle>
              <CardDescription>Popular content from your communities</CardDescription>
            </div>
            <Button className="text-lime-600" variant="ghost" size="sm">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.community}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="text-lime-600 ml-auto" variant="ghost" size="sm">
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
