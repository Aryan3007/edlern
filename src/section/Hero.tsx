"use client"

import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

// import { motion } from "framer-motion"
// import { ArrowRight, Users, Calendar, Info } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
   <div className="bg-white">
 
  <section className=" bg-opacity-30 min-h-screen py-32 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-base font-semibold tracking-wider text-lime-600 uppercase">A social media for learners</p>
          <h1 className="mt-4 text-5xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-7xl"> Build your best community starting from here.</h1>
          <p className="mt-4 text-base text-black lg:mt-8 sm:text-lg">Meet and communicate with the best people to run projects, events or other activities in a more effective and fun way.</p>
          <button className="inline-flex gap-2 items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full lg:mt-16 hover:bg-lime-500/80 focus:bg-lime-500/60" role="button">
            Join for free
           <ChevronRight/>
          </button>
          {/* <Link to="/community/dashboard" className="inline-flex gap-2 items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full lg:mt-16 hover:bg-lime-500/80 focus:bg-lime-500/60" role="button">
            Join for free
           <ChevronRight/>
          </Link> */}
          <p className="mt-5 text-gray-600">Already joined us? <Link to="/login" className="text-black transition-all duration-200 hover:underline">Log in</Link></p>
        </div>
        <div>
          <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" />
        </div>
      </div>
    </div>
  </section>
</div>


  )
}