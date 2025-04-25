import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Search, Filter, Calendar, MapPin, MessageSquare, Link2 } from "lucide-react"

const members = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Member ${i + 1}`,
  username: `member${i + 1}`,
  image: `/placeholder.svg?height=40&width=40&text=M${i + 1}`,
  level: Math.floor(Math.random() * 9) + 1,
  points: Math.floor(Math.random() * 5000),
  joinDate: `${Math.floor(Math.random() * 12) + 1} months ago`,
  verified: Math.random() > 0.8,
  bio: i % 3 === 0 ? "Spiritual student. On a mission to make peak performance effortless for entrepreneurs. Done 1000's of hours of research ✨" : 
       i % 2 === 0 ? "Seeking Greatness." : "An ambitious",
  location: i % 2 === 0 ? "Houston, Texas" : "K",
  joinedDate: i % 3 === 0 ? "Oct 15, 2024" : i % 2 === 0 ? "Mar 12, 2024" : "Aug 31, 2024",
  isOnline: Math.random() > 0.3,
  rank: i % 4 + 1 // Rankings 1-4
}))

export default function MembersPage() {
  return (
    <div className="grid relative  grid-cols-1 lg:grid-cols-3 gap-6 lg:py-6 space-y-6">
      <div className="lg:col-span-1 hidden lg:block ">
        <div className="sticky top-[97px]"> 

        <Card className="p-0 gap-1 py-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Adonis Gang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=400&text=Adonis+Gang"
                alt="Community banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-gray-500">
              <Link2 className="h-4 w-4 inline mr-1" />
              skool.com/adonis-gang
            </div>

            <p className="text-sm">
              Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave
              Jeffery behind.
            </p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Self Improvement Courses
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">181.8k</span>
                <span className="text-xs text-gray-500">Members</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">222</span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">10</span>
                <span className="text-xs text-gray-500">Admins</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${i + 1}`} alt={`User ${i + 1}`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>

            <Button className="w-full">INVITE PEOPLE</Button>

          </CardContent>
        </Card>
        </div>
      </div>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input placeholder="Search members..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="points">Most Points</SelectItem>
                  <SelectItem value="level">Highest Level</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* List view similar to the screenshot */}
          <div className="space-y-4">
            {members.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    {/* Left side - Avatar with rank indicator */}
                    <div className="relative mr-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {member.rank}
                      </div>
                      
                    </div>
                    
                    {/* Center - Member information */}
                    <div className="flex-1">
                      <div className="flex items-center w-full justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">

                        <h3 className="font-medium text-lg">{member.name}</h3>
                        {member.verified && <CheckCircle2 className="h-4 w-4 text-sky-700" />}
                        </div>
                        <div className="ml-4">
                      <Button variant="outline" className="gap-2 px-4">
                        <MessageSquare className="h-4 w-4" />
                        <span>CHAT</span>
                      </Button>
                    </div>
                        
                      </div>
                      <div className="text-sm text-gray-500 mb-1">@{member.username}</div>
                      
                      {/* Bio text */}
                      <p className="text-sm max-w-lg mb-3">{member.bio}</p>
                      
                      {/* Status and information */}
                      <div className="flex flex-col gap-1 text-sm text-gray-500">
                        {member.isOnline && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Online now</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {member.joinedDate}</span>
                        </div>
                        {member.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{member.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right side - Chat button */}
                   
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}