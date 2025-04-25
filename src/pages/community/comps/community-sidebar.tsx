import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Link2 } from "lucide-react"

export function CommunitySidebar() {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Adonis Gang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-0">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src="/placeholder.svg?height=200&width=400&text=Adonis+Gang"
              alt="Community banner"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm">
            Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave
            Jeffery behind.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link2 className="h-4 w-4" />
            <span>skool.com/adonis-gang</span>
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

          <Button className="w-full">INVITE PEOPLE</Button>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Leaderboard (30-day)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3">
            {[
              { rank: 1, name: "Latif Skool", points: 816, image: "/placeholder.svg?height=32&width=32&text=LS" },
              { rank: 2, name: "Samual Benson", points: 634, image: "/placeholder.svg?height=32&width=32&text=SB" },
              { rank: 3, name: "Andrew Heydt", points: 602, image: "/placeholder.svg?height=32&width=32&text=AH" },
              { rank: 4, name: "Brad Cassidy", points: 377, image: "/placeholder.svg?height=32&width=32&text=BC" },
              { rank: 5, name: "Joel Morrow", points: 360, image: "/placeholder.svg?height=32&width=32&text=JM" },
            ].map((user) => (
              <div key={user.rank} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 text-sm font-medium text-gray-500">
                  {user.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">{user.name}</div>
                <Badge variant="outline" className="bg-sky-700/10 text-sky-700">
                  +{user.points}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full mt-2 text-sky-700">
            See all rankings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
