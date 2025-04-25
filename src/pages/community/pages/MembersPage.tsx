import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Search, Filter } from "lucide-react"

const members = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Member ${i + 1}`,
  username: `member${i + 1}`,
  image: `/placeholder.svg?height=40&width=40&text=M${i + 1}`,
  level: Math.floor(Math.random() * 9) + 1,
  points: Math.floor(Math.random() * 5000),
  joinDate: `${Math.floor(Math.random() * 12) + 1} months ago`,
  verified: Math.random() > 0.8,
}))

export default function MembersPage() {
  return (
    <div className="container w-full py-6 space-y-6">
      <Card>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium truncate">{member.name}</span>
                      {member.verified && <CheckCircle2 className="h-4 w-4 text-sky-700" />}
                    </div>
                    <div className="text-sm text-gray-500 truncate">@{member.username}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-sky-700/10 text-sky-700 h-5 px-1.5">
                        Level {member.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{member.joinDate}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-sky-700">
                    View
                  </Button>
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
