"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare, Search, ChevronDown, Menu, X, User, Settings, BookOpen, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { Link, useParams } from "react-router-dom"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Community", to: "/community/feed" },
  { name: "Classroom", to: "/community/classroom" },
  { name: "Members", to: "/community/members" },
  { name: "Leaderboards", to: "/community/leaderboards" },
  { name: "About", to: "/community/about" },
]

const communities = [
  {
    id: 1,
    name: "Adonis Gang",
    image: "/placeholder.svg?height=32&width=32&text=AG",
    members: "181.8k",
    current: true,
  },
  {
    id: 2,
    name: "Fitness Hub",
    image: "/placeholder.svg?height=32&width=32&text=FH",
    members: "92.4k",
    current: false,
  },
  {
    id: 3,
    name: "Entrepreneur Network",
    image: "/placeholder.svg?height=32&width=32&text=EN",
    members: "45.2k",
    current: false,
  },
  {
    id: 4,
    name: "Tech Innovators",
    image: "/placeholder.svg?height=32&width=32&text=TI",
    members: "78.6k",
    current: false,
  },
]

export default function Header() {
  const pathname = useParams()
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [currentCommunity, setCurrentCommunity] = useState(communities[0])

  const handleCommunityChange = (community: (typeof communities)[0]) => {
    setCurrentCommunity(community)
    // In a real app, this would navigate or reload data for the selected community
  }

  const isAdmin = true // This would be determined by user role in a real app

  return (
    <header className="sticky  top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container  max-w-7xl mx-auto flex h-16 items-center px-2">
        <div className="flex items-center gap-2 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8 ring-2 ring-sky-700/20">
                  <AvatarImage src={currentCommunity.image || "/placeholder.svg"} alt={currentCommunity.name} />
                  <AvatarFallback className="bg-sky-700 text-sky-700-foreground">
                    {currentCommunity.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-lg hidden sm:inline-block">{currentCommunity.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuLabel>Your Communities</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {communities.map((community) => (
                <DropdownMenuItem
                  key={community.id}
                  className={`flex items-center gap-3 py-2 ${community.current ? "bg-sky-700/10" : ""}`}
                  onClick={() => handleCommunityChange(community)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
                    <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{community.name}</span>
                    <span className="text-xs text-muted-foreground">{community.members} members</span>
                  </div>
                  {community.current && (
                    <Badge className="ml-auto" variant="outline">
                      Current
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/discover" className="flex items-center gap-2 w-full">
                  <span className="text-sky-700">Discover communities</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem>
                  <Link to="/admin" className="flex items-center gap-2 w-full">
                    <span className="text-sky-700">Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isMobile ? (
          <>
            {isSearchOpen ? (
              <div className="flex-1 flex items-center">
                <Input placeholder="Search..." className="h-9 w-full" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[240px] sm:w-[350px]">
                    <nav className="flex flex-col p-4 gap-4 mt-8">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={`px-2 py-1 rounded-md ${pathname["*"] === item.to.substring(1) ? "text-sky-700 border-b-2 border-sky-700 pb-3.5" : "text-foreground"
                            }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
                <div className="flex-1"></div>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="mr-2">
                  <Search className="h-5 w-5" />
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="w-full pl-8 h-9 bg-secondary border-none" />
              </div>
            </div>
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-sm font-medium transition-colors hover:text-sky-700 ${pathname["*"] === item.to.replace("/community/", "") ? "text-sky-400" : "text-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </>
        )}

        <div className="flex items-center gap-2">
          <Link to="/admin" className="hidden lg:flex">
          <Button variant="outline">Admin</Button>
          </Link>
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-700 text-[10px] text-sky-700-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex items-start gap-2 py-2 cursor-pointer">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">User {i}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      Hey, check out this new content I just posted...
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">2 min ago</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <Link to="/community/messages" className="text-sky-700 text-sm font-medium">
                  View all messages
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-700 p-0 text-[10px] text-sky-700-foreground">
                  1
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[1, 2, 3, 4].map((i) => (
                <DropdownMenuItem key={i} className="flex items-start gap-2 py-2 cursor-pointer">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      <span className="font-medium text-foreground">User {i}</span>
                      {i === 1
                        ? " liked your post"
                        : i === 2
                          ? " commented on your post"
                          : i === 3
                            ? " mentioned you"
                            : " started following you"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">{i}h ago</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <Link to="/notifications" className="text-sky-700 text-sm font-medium">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-sky-700/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-sky-700/20">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/community/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/community/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/community/my-courses" className="flex items-center w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
