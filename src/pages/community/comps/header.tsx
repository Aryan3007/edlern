"use client"

import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, ChevronDown, Menu, X, User, Settings, BookOpen, LogOut, MessageSquare } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/hooks/use-mobile"
import { Link, useParams } from "react-router-dom"
import { ThemeToggle } from "./theme-toggle"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

// Define the community type interface
interface Community {
  community_id?: number;
  id?: number;
  total_members?: number;
  community_name?: string;
  name?: string;
  community_logo?: string;
  image?: string;
  role?: string;
  members?: string;
  current?: boolean;
}

interface CommunityData {
  community_id: number;
  community_name: string;
  community_logo: string;
}

// Default communities as fallback
const defaultCommunities = [
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
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [userCommunities, setUserCommunities] = useState<Community[]>([])
  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // Dynamic nav items based on current community
  const navItems = useMemo(() => {
    if (!currentCommunity) return [];
    
    const communityId = currentCommunity.community_id || currentCommunity.id;
    return [
      { name: "Community", to: `/${communityId}/community/feed` },
      { name: "Members", to: `/${communityId}/community/members` },
      { name: "Courses", to: `/${communityId}/community/classroom` },
      { name: "Leaderboards", to: `/${communityId}/community/leaderboards` },
      { name: "Events", to: `/${communityId}/community/events` },
      // { name: "Chat", to: `/${communityId}/community/messages` },
      { name: "About", to: `/${communityId}/community/about` },
    ];
  }, [currentCommunity]);

  const getUserCommunities = async (accessToken: string) => {
    try {
      setLoading(true);
      const response = await fetch('https://edlern.toolsfactory.tech/api/v1/accounts/my-communities/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Communities fetched:', result.data);
      
      const formattedCommunities = result.data.map((community: CommunityData, index: number) => ({
        ...community,
        id: community.community_id,
        name: community.community_name,
        image: community.community_logo,
        current: index === 0 // Set the first one as current by default
      }));
      
      setUserCommunities(formattedCommunities);
      
      if (formattedCommunities.length > 0) {
        setCurrentCommunity(formattedCommunities[0]);
      }
      
      return formattedCommunities;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to fetch communities:', error.message);
      } else {
        console.error('Failed to fetch communities:', error);
      }
      // Fall back to default communities on error
      setUserCommunities(defaultCommunities);
      setCurrentCommunity(defaultCommunities[0]);
      return defaultCommunities;
    } finally {
      setLoading(false);
    }
  };

  const handleCommunityChange = (community: Community) => {
    // Update the current communities array to reflect the new selection
    const updatedCommunities = userCommunities.map(comm => ({
      ...comm,
      current: comm.id === community.id || comm.community_id === community.community_id
    }));
    
    setUserCommunities(updatedCommunities);
    setCurrentCommunity(community);
    
    // Navigate to the community feed page
    const communityId = community.community_id || community.id;
    navigate(`/${communityId}/community/feed`);
    
    console.log(`Switched to community: ${community.name || community.community_name}`);
  }
  
  useEffect(() => {
    if (accessToken) {
      getUserCommunities(accessToken);
    } else {
      // Fall back to default communities if no access token
      setUserCommunities(defaultCommunities);
      setCurrentCommunity(defaultCommunities[0]);
      setLoading(false);
    }
  }, [accessToken]);

  // Loading skeleton UI
  if (loading || !currentCommunity) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl w-full justify-between mx-auto flex h-16 items-center px-2">
          <div className="flex items-center gap-2 mr-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32 hidden sm:inline-block" />
          </div>
          
          {!isMobile && (
            <>
              <div className="flex-1 flex items-center max-w-md mx-4">
                <Skeleton className="w-full h-9" />
              </div>
              <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-4 w-16" />
                ))}
              </nav>
            </>
          )}
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" /> 
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>
    );
  }

  // Get name and image from either API format or default format
  const communityName = currentCommunity.community_name || currentCommunity.name || "Community";
  const communityImage = currentCommunity.community_logo || currentCommunity.image || "/placeholder.svg";
  const isCreator = currentCommunity.role === "creator";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl w-full justify-between mx-auto flex h-16 items-center px-2">
        <div className="flex items-center gap-2 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8 ring-2 ring-sky-700/20">
                  <AvatarImage src={communityImage} alt={communityName} />
                  <AvatarFallback className="bg-sky-700 text-sky-700-foreground">
                    {communityName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-lg hidden sm:inline-block">{communityName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px]">
              <DropdownMenuLabel>Your Communities</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userCommunities.map((community) => (
                <DropdownMenuItem
                  key={community.id || community.community_id}
                  className={`flex items-center gap-3 space-y-0.5 py-2 ${community.current ? "bg-sky-700/10" : ""}`}
                  onClick={() => handleCommunityChange(community)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={community.image || community.community_logo || "/placeholder.svg"} alt={community.name || community.community_name} />
                    <AvatarFallback>{(community.name || community.community_name || "").substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{community.name || community.community_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {community.total_members || community.members || `Role: ${community.role || "Member"}`}
                      {community.members || community.total_members ? " members" : ""}
                    </span>
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
              <DropdownMenuItem>
                <Link to="/create-community-page" className="flex items-center gap-2 w-full">
                  <span className="text-sky-700">Create new community</span>
                </Link>
              </DropdownMenuItem>
              {isCreator && (
                <DropdownMenuItem>
                  <Link to={`/${currentCommunity.community_id || currentCommunity.id}/community/admin/dashboard`} className="flex items-center gap-2 w-full">
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
                          className={`px-2 py-1 rounded-md ${
                            pathname["*"] === item.to.substring(1) 
                              ? "text-sky-700 border-b-2 border-sky-700 pb-3.5" 
                              : "text-foreground"
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
                  className={`text-sm font-medium transition-colors hover:text-sky-700 ${
                    pathname["*"] === item.to.replace(`/${currentCommunity?.community_id || currentCommunity?.id}/community/`, "") 
                      ? "text-sky-400" 
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to={`/${currentCommunity.community_id || currentCommunity.id}/community/messages`}>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 text-white w-4 items-center justify-center rounded-full bg-sky-700 text-[10px] text-sky-700-foreground">
                3
              </span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 text-white -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-700 p-0 text-[10px] text-sky-700-foreground">
                  1
                </span>
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
                <Link to={`/${currentCommunity.community_id || currentCommunity.id}/notifications`} className="text-sky-700 text-sm font-medium">
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
                  <Link to={`/${currentCommunity.community_id || currentCommunity.id}/community/profile`} className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={`/${currentCommunity.community_id || currentCommunity.id}/community/settings`} className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={`/${currentCommunity.community_id || currentCommunity.id}/community/my-courses`} className="flex items-center w-full">
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