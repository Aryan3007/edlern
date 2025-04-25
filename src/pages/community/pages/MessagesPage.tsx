import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Send, MoreHorizontal, Phone, Video, Info } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesPage() {
  return (
    <div className="container py-6">
      <Card className="h-[calc(100vh-160px)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 px-4 py-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="overflow-y-auto h-[calc(100vh-280px)]">
                {[
                  {
                    id: 1,
                    name: "Hamza Ahmed",
                    image: "/placeholder.svg?height=40&width=40&text=HA",
                    lastMessage: "Hey, check out this new workout routine I just posted!",
                    time: "2m ago",
                    unread: true,
                    active: true,
                  },
                  {
                    id: 2,
                    name: "Samual Benson",
                    image: "/placeholder.svg?height=40&width=40&text=SB",
                    lastMessage: "Thanks for the advice on that investment strategy.",
                    time: "1h ago",
                    unread: true,
                    active: false,
                  },
                  {
                    id: 3,
                    name: "Latif Skool",
                    image: "/placeholder.svg?height=40&width=40&text=LS",
                    lastMessage: "I'll be posting a new video tomorrow about mindset.",
                    time: "3h ago",
                    unread: false,
                    active: false,
                  },
                  {
                    id: 4,
                    name: "Andrew Heydt",
                    image: "/placeholder.svg?height=40&width=40&text=AH",
                    lastMessage: "Let me know when you're free to discuss the project.",
                    time: "1d ago",
                    unread: false,
                    active: false,
                  },
                  {
                    id: 5,
                    name: "Brad Cassidy",
                    image: "/placeholder.svg?height=40&width=40&text=BC",
                    lastMessage: "Did you see the latest post about nutrition?",
                    time: "2d ago",
                    unread: false,
                    active: false,
                  },
                  {
                    id: 6,
                    name: "Self Improvement Group",
                    image: "/placeholder.svg?height=40&width=40&text=SIG",
                    lastMessage: "Joel: I found this great book on productivity",
                    time: "3d ago",
                    unread: false,
                    isGroup: true,
                    active: false,
                  },
                ].map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer ${
                      conversation.active ? "bg-lime-600/5 border-l-4 border-lime-600" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.image || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {conversation.isGroup ? (
                        <Badge className="absolute -bottom-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-gray-500">
                          <span className="text-[8px]">G</span>
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${conversation.unread ? "text-black" : "text-gray-700"}`}>
                          {conversation.name}
                        </span>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p
                        className={`text-sm truncate ${conversation.unread ? "font-medium text-black" : "text-gray-500"}`}
                      >
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-lime-600" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col h-full">
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=HA" alt="Hamza Ahmed" />
                  <AvatarFallback>HA</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Hamza Ahmed</div>
                  <div className="text-xs text-green-500">Online</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[
                { id: 1, sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
                { id: 2, sender: "me", text: "Pretty good! Just finished my workout.", time: "10:32 AM" },
                { id: 3, sender: "them", text: "Nice! What did you train today?", time: "10:33 AM" },
                {
                  id: 4,
                  sender: "me",
                  text: "Chest and triceps. Going for that aesthetic physique!",
                  time: "10:35 AM",
                },
                {
                  id: 5,
                  sender: "them",
                  text: "That's awesome! Check out this new workout routine I just posted. I think you'll find it really effective for building mass.",
                  time: "10:36 AM",
                },
                {
                  id: 6,
                  sender: "them",
                  text: "It's based on progressive overload with a focus on compound movements.",
                  time: "10:36 AM",
                },
                { id: 7, sender: "me", text: "Sounds interesting! I'll definitely take a look.", time: "10:38 AM" },
                {
                  id: 8,
                  sender: "them",
                  text: "Great! Let me know what you think after you try it.",
                  time: "10:40 AM",
                },
                { id: 9, sender: "me", text: "Will do. Thanks for sharing!", time: "10:41 AM" },
              ].map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-end gap-2 max-w-[70%]">
                    {message.sender === "them" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=HA" alt="Hamza Ahmed" />
                        <AvatarFallback>HA</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "me" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 px-1">{message.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" className="rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
