"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"
import { CommunityDetailsDialog } from "../modals/community-details-dialog"

export default function ExplorePage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null)

  // Sample data for communities
  const communities: Community[] = [
    {
      id: 1,
      name: "Mindful Creators",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.jpg?height=400&width=800",
      members: 1243,
      description:
        "A community for creative professionals practicing mindfulness. We explore how meditation and mindfulness can enhance creativity, reduce creative blocks, and improve work-life balance for designers, writers, artists, and other creative professionals.",
      categories: ["Creativity", "Professional Development"],
      featured: true,
    },
    {
      id: 2,
      name: "Meditation Masters",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 856,
      description:
        "Advanced meditation techniques and discussions for experienced practitioners. Our community focuses on deepening your practice through advanced techniques, philosophical discussions, and regular group meditation sessions.",
      categories: ["Meditation", "Spirituality"],
      featured: true,
    },
    {
      id: 3,
      name: "Wellness Warriors",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 1892,
      description:
        "Holistic approach to health and wellness through mindfulness. We integrate mindfulness practices with nutrition, exercise, sleep hygiene, and other aspects of physical and mental wellbeing.",
      categories: ["Health", "Wellness"],
      featured: false,
    },
    {
      id: 4,
      name: "Zen Entrepreneurs",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 743,
      description:
        "Mindful approaches to business and entrepreneurship. Learn how to build and grow businesses with intention, purpose, and balance. We discuss mindful leadership, ethical business practices, and sustainable growth strategies.",
      categories: ["Business", "Entrepreneurship"],
      featured: false,
    },
    {
      id: 5,
      name: "Mindful Parents",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 1567,
      description:
        "Support and resources for parents practicing mindfulness with their families. We share techniques for teaching mindfulness to children, managing parental stress, and creating peaceful home environments.",
      categories: ["Parenting", "Family"],
      featured: true,
    },
    {
      id: 6,
      name: "Digital Detox",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 621,
      description:
        "Finding balance in our relationship with technology through mindfulness. We explore strategies for healthy tech use, regular digital detoxes, and mindful approaches to social media and digital consumption.",
      categories: ["Technology", "Balance"],
      featured: false,
    },
    {
      id: 7,
      name: "Mindful Eating",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 932,
      description:
        "Developing a healthy relationship with food through mindfulness. Our community focuses on mindful eating practices, intuitive eating, and cultivating gratitude and awareness around food and nutrition.",
      categories: ["Nutrition", "Health"],
      featured: false,
    },
    {
      id: 8,
      name: "Eco-Mindfulness",
      image: "/placeholder.svg?height=200&width=200",
      coverImage: "/placeholder.svg?height=400&width=800",
      members: 1105,
      description:
        "Connecting mindfulness practice with environmental awareness and action. We explore the intersection of mindfulness and environmental stewardship, sustainable living, and deepening our connection with nature.",
      categories: ["Environment", "Sustainability"],
      featured: true,
    },
  ]

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Explore Communities</h1>
          <p className="text-muted-foreground">Discover and join mindfulness communities</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search communities..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Communities</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">Newest</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} onClick={() => setSelectedCommunity(community)} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="featured" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {communities
              .filter((community) => community.featured)
              .map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onClick={() => setSelectedCommunity(community)}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="popular" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {communities
              .sort((a, b) => b.members - a.members)
              .map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onClick={() => setSelectedCommunity(community)}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {communities
              .slice()
              .reverse()
              .map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onClick={() => setSelectedCommunity(community)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCommunity && (
        <CommunityDetailsDialog
          community={selectedCommunity}
          open={!!selectedCommunity}
          onOpenChange={(open) => {
            if (!open) setSelectedCommunity(null)
          }}
        />
      )}
    </div>
  )
}

interface Community {
  id: number
  name: string
  image: string
  coverImage: string
  members: number
  description: string
  categories: string[]
  featured: boolean
}

interface CommunityCardProps {
  community: Community
  onClick: () => void
}

function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 w-full bg-cover bg-black bg-center" style={{ backgroundImage: `url(${community.coverImage})` }} />
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border-4 border-background -mt-8">
            <AvatarImage src={community.image || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{community.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-3 w-3" />
              {community.members.toLocaleString()} members
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {community.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full bg-lime-600 hover:bg-lime-700 text-white hover:text-white" onClick={onClick}>
          View Community
        </Button>
      </CardFooter>
    </Card>
  )
}
