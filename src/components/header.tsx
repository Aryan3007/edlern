"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import SearchTrigger from "./SearchTrigger"

const categories = [
  { id: "entrepreneurship", name: "Entrepreneurship" },
  { id: "productivity", name: "Productivity" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "business", name: "Business" },
  { id: "creativity", name: "Creativity" },
  { id: "technology", name: "Technology" },
]

export default function Header() {
  const navigate = useNavigate()

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex  max-w-7xl mx-auto h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-baseline justify-center gap-2">
          <Link to="/" className="font-bold text-2xl">
            <span className='text-lime-500'>ed</span>Lern
          </Link>
          <nav className="flex md:gap-6 ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-1 text-sm font-medium">
               Explore Based On Your Interest
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Link to="/discover" className="text-sm font-medium">
              Discover
            </Link> */}
            <Link to="/experts" className="text-sm font-medium">
              Experts
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-4">
        
          <SearchTrigger />

     
          <nav className=" hidden md:flex items-center gap-4">
            {/* <Link to="#" className="text-sm font-medium hidden md:block">
              List on Discover
            </Link> */}
            <Link to="/login" className="text-sm  hover:text-lime-500 duration-150 font-medium">
              Login
            </Link>
            <Button className="bg-gradient-to-br  from-lime-500/70 to-lime-500 text-white rounded-full px-6 py-2 font-medium transition hover:bg-lime-500">Subscribe</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
