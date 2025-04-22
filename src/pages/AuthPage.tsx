"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Activity, Users, MessageSquare, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

// Community statistics data
const communityStats = [
  { label: "Active Members", values: [8426, 8427, 8429, 8432, 8436], icon: <Users className="h-5 w-5" /> },
  { label: "Online Now", values: [342, 339, 345, 351, 348], icon: <Activity className="h-5 w-5" /> },
  { label: "Daily Conversations", values: [1267, 1268, 1270, 1272, 1275], icon: <MessageSquare className="h-5 w-5" /> },
  { label: "Events This Month", values: [24, 25, 25, 26, 26], icon: <Star className="h-5 w-5" /> },
]

const testimonials = [
  {
    quote: "This community helped me connect with like-minded professionals and grow my network exponentially.",
    author: "Sarah Johnson",
    role: "Marketing Director",
  },
  {
    quote: "I found my co-founder through this platform. Best decision I ever made for my startup journey.",
    author: "Michael Chen",
    role: "Tech Entrepreneur",
  },
  {
    quote: "The events and resources here have been invaluable for my professional development.",
    author: "Priya Sharma",
    role: "UX Designer",
  },
  {
    quote: "Finally, a community platform that actually delivers on its promise to foster meaningful connections.",
    author: "James Wilson",
    role: "Community Manager",
  },
]

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)

  // Dynamic data state
  const [statIndex, setStatIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // Update data at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((prevIndex) => (prevIndex + 1) % 5)
    }, 5000)

    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(testimonialInterval)
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Dynamic Community Data */}
      <div className="w-full md:w-1/2 bg-white relative overflow-hidden hidden lg:flex flex-col items-center justify-center p-6 md:p-12 shadow-md">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="0 0 1422 800"><g stroke-width="3.5" stroke="hsl(70, 69%, 50%)" fill="none" stroke-linecap="butt"><line x1="0" y1="0" x2="54" y2="54" opacity="1.00"></line><line x1="54" y1="0" x2="108" y2="54" opacity="1.00"></line><line x1="162" y1="0" x2="108" y2="54" opacity="1.00"></line><line x1="162" y1="0" x2="216" y2="54" opacity="1.00"></line><line x1="216" y1="0" x2="270" y2="54" opacity="1.00"></line><line x1="270" y1="0" x2="324" y2="54" opacity="1.00"></line><line x1="324" y1="0" x2="378" y2="54" opacity="1.00"></line><line x1="378" y1="0" x2="432" y2="54" opacity="1.00"></line><line x1="432" y1="0" x2="486" y2="54" opacity="1.00"></line><line x1="486" y1="0" x2="540" y2="54" opacity="1.00"></line><line x1="594" y1="0" x2="540" y2="54" opacity="1.00"></line><line x1="648" y1="0" x2="594" y2="54" opacity="1.00"></line><line x1="648" y1="0" x2="702" y2="54" opacity="1.00"></line><line x1="702" y1="0" x2="756" y2="54" opacity="1.00"></line><line x1="810" y1="0" x2="756" y2="54" opacity="1.00"></line><line x1="810" y1="0" x2="864" y2="54" opacity="1.00"></line><line x1="918" y1="0" x2="864" y2="54" opacity="1.00"></line><line x1="972" y1="0" x2="918" y2="54" opacity="1.00"></line><line x1="972" y1="0" x2="1026" y2="54" opacity="1.00"></line><line x1="1080" y1="0" x2="1026" y2="54" opacity="1.00"></line><line x1="1080" y1="0" x2="1134" y2="54" opacity="1.00"></line><line x1="1188" y1="0" x2="1134" y2="54" opacity="1.00"></line><line x1="1242" y1="0" x2="1188" y2="54" opacity="1.00"></line><line x1="1242" y1="0" x2="1296" y2="54" opacity="1.00"></line><line x1="1296" y1="0" x2="1350" y2="54" opacity="1.00"></line><line x1="1404" y1="0" x2="1350" y2="54" opacity="1.00"></line><line x1="1458" y1="0" x2="1404" y2="54" opacity="1.00"></line><line x1="54" y1="54" x2="0" y2="108" opacity="0.94"></line><line x1="108" y1="54" x2="54" y2="108" opacity="0.94"></line><line x1="108" y1="54" x2="162" y2="108" opacity="0.94"></line><line x1="162" y1="54" x2="216" y2="108" opacity="0.94"></line><line x1="270" y1="54" x2="216" y2="108" opacity="0.94"></line><line x1="270" y1="54" x2="324" y2="108" opacity="0.94"></line><line x1="324" y1="54" x2="378" y2="108" opacity="0.94"></line><line x1="432" y1="54" x2="378" y2="108" opacity="0.94"></line><line x1="432" y1="54" x2="486" y2="108" opacity="0.94"></line><line x1="540" y1="54" x2="486" y2="108" opacity="0.94"></line><line x1="594" y1="54" x2="540" y2="108" opacity="0.94"></line><line x1="594" y1="54" x2="648" y2="108" opacity="0.94"></line><line x1="702" y1="54" x2="648" y2="108" opacity="0.94"></line><line x1="756" y1="54" x2="702" y2="108" opacity="0.94"></line><line x1="756" y1="54" x2="810" y2="108" opacity="0.94"></line><line x1="810" y1="54" x2="864" y2="108" opacity="0.94"></line><line x1="864" y1="54" x2="918" y2="108" opacity="0.94"></line><line x1="918" y1="54" x2="972" y2="108" opacity="0.94"></line><line x1="1026" y1="54" x2="972" y2="108" opacity="0.94"></line><line x1="1026" y1="54" x2="1080" y2="108" opacity="0.94"></line><line x1="1080" y1="54" x2="1134" y2="108" opacity="0.94"></line><line x1="1134" y1="54" x2="1188" y2="108" opacity="0.94"></line><line x1="1188" y1="54" x2="1242" y2="108" opacity="0.94"></line><line x1="1242" y1="54" x2="1296" y2="108" opacity="0.94"></line><line x1="1296" y1="54" x2="1350" y2="108" opacity="0.94"></line><line x1="1404" y1="54" x2="1350" y2="108" opacity="0.94"></line><line x1="1458" y1="54" x2="1404" y2="108" opacity="0.94"></line><line x1="0" y1="108" x2="54" y2="162" opacity="0.87"></line><line x1="108" y1="108" x2="54" y2="162" opacity="0.87"></line><line x1="162" y1="108" x2="108" y2="162" opacity="0.87"></line><line x1="162" y1="108" x2="216" y2="162" opacity="0.87"></line><line x1="270" y1="108" x2="216" y2="162" opacity="0.87"></line><line x1="270" y1="108" x2="324" y2="162" opacity="0.87"></line><line x1="378" y1="108" x2="324" y2="162" opacity="0.87"></line><line x1="378" y1="108" x2="432" y2="162" opacity="0.87"></line><line x1="432" y1="108" x2="486" y2="162" opacity="0.87"></line><line x1="486" y1="108" x2="540" y2="162" opacity="0.87"></line><line x1="594" y1="108" x2="540" y2="162" opacity="0.87"></line><line x1="594" y1="108" x2="648" y2="162" opacity="0.87"></line><line x1="648" y1="108" x2="702" y2="162" opacity="0.87"></line><line x1="702" y1="108" x2="756" y2="162" opacity="0.87"></line><line x1="756" y1="108" x2="810" y2="162" opacity="0.87"></line><line x1="810" y1="108" x2="864" y2="162" opacity="0.87"></line><line x1="918" y1="108" x2="864" y2="162" opacity="0.87"></line><line x1="918" y1="108" x2="972" y2="162" opacity="0.87"></line><line x1="972" y1="108" x2="1026" y2="162" opacity="0.87"></line><line x1="1080" y1="108" x2="1026" y2="162" opacity="0.87"></line><line x1="1134" y1="108" x2="1080" y2="162" opacity="0.87"></line><line x1="1134" y1="108" x2="1188" y2="162" opacity="0.87"></line><line x1="1188" y1="108" x2="1242" y2="162" opacity="0.87"></line><line x1="1296" y1="108" x2="1242" y2="162" opacity="0.87"></line><line x1="1296" y1="108" x2="1350" y2="162" opacity="0.87"></line><line x1="1404" y1="108" x2="1350" y2="162" opacity="0.87"></line><line x1="1458" y1="108" x2="1404" y2="162" opacity="0.87"></line><line x1="0" y1="162" x2="54" y2="216" opacity="0.81"></line><line x1="54" y1="162" x2="108" y2="216" opacity="0.81"></line><line x1="108" y1="162" x2="162" y2="216" opacity="0.81"></line><line x1="162" y1="162" x2="216" y2="216" opacity="0.81"></line><line x1="270" y1="162" x2="216" y2="216" opacity="0.81"></line><line x1="324" y1="162" x2="270" y2="216" opacity="0.81"></line><line x1="324" y1="162" x2="378" y2="216" opacity="0.81"></line><line x1="432" y1="162" x2="378" y2="216" opacity="0.81"></line><line x1="486" y1="162" x2="432" y2="216" opacity="0.81"></line><line x1="486" y1="162" x2="540" y2="216" opacity="0.81"></line><line x1="594" y1="162" x2="540" y2="216" opacity="0.81"></line><line x1="648" y1="162" x2="594" y2="216" opacity="0.81"></line><line x1="648" y1="162" x2="702" y2="216" opacity="0.81"></line><line x1="756" y1="162" x2="702" y2="216" opacity="0.81"></line><line x1="756" y1="162" x2="810" y2="216" opacity="0.81"></line><line x1="864" y1="162" x2="810" y2="216" opacity="0.81"></line><line x1="864" y1="162" x2="918" y2="216" opacity="0.81"></line><line x1="972" y1="162" x2="918" y2="216" opacity="0.81"></line><line x1="972" y1="162" x2="1026" y2="216" opacity="0.81"></line><line x1="1080" y1="162" x2="1026" y2="216" opacity="0.81"></line><line x1="1080" y1="162" x2="1134" y2="216" opacity="0.81"></line><line x1="1188" y1="162" x2="1134" y2="216" opacity="0.81"></line><line x1="1188" y1="162" x2="1242" y2="216" opacity="0.81"></line><line x1="1242" y1="162" x2="1296" y2="216" opacity="0.81"></line><line x1="1296" y1="162" x2="1350" y2="216" opacity="0.81"></line><line x1="1404" y1="162" x2="1350" y2="216" opacity="0.81"></line><line x1="1458" y1="162" x2="1404" y2="216" opacity="0.81"></line><line x1="54" y1="216" x2="0" y2="270" opacity="0.74"></line><line x1="54" y1="216" x2="108" y2="270" opacity="0.74"></line><line x1="108" y1="216" x2="162" y2="270" opacity="0.74"></line><line x1="162" y1="216" x2="216" y2="270" opacity="0.74"></line><line x1="270" y1="216" x2="216" y2="270" opacity="0.74"></line><line x1="324" y1="216" x2="270" y2="270" opacity="0.74"></line><line x1="324" y1="216" x2="378" y2="270" opacity="0.74"></line><line x1="432" y1="216" x2="378" y2="270" opacity="0.74"></line><line x1="432" y1="216" x2="486" y2="270" opacity="0.74"></line><line x1="540" y1="216" x2="486" y2="270" opacity="0.74"></line><line x1="594" y1="216" x2="540" y2="270" opacity="0.74"></line><line x1="648" y1="216" x2="594" y2="270" opacity="0.74"></line><line x1="702" y1="216" x2="648" y2="270" opacity="0.74"></line><line x1="756" y1="216" x2="702" y2="270" opacity="0.74"></line><line x1="810" y1="216" x2="756" y2="270" opacity="0.74"></line><line x1="810" y1="216" x2="864" y2="270" opacity="0.74"></line><line x1="918" y1="216" x2="864" y2="270" opacity="0.74"></line><line x1="972" y1="216" x2="918" y2="270" opacity="0.74"></line><line x1="972" y1="216" x2="1026" y2="270" opacity="0.74"></line><line x1="1026" y1="216" x2="1080" y2="270" opacity="0.74"></line><line x1="1134" y1="216" x2="1080" y2="270" opacity="0.74"></line><line x1="1188" y1="216" x2="1134" y2="270" opacity="0.74"></line><line x1="1188" y1="216" x2="1242" y2="270" opacity="0.74"></line><line x1="1242" y1="216" x2="1296" y2="270" opacity="0.74"></line><line x1="1350" y1="216" x2="1296" y2="270" opacity="0.74"></line><line x1="1350" y1="216" x2="1404" y2="270" opacity="0.74"></line><line x1="1404" y1="216" x2="1458" y2="270" opacity="0.74"></line><line x1="54" y1="270" x2="0" y2="324" opacity="0.68"></line><line x1="54" y1="270" x2="108" y2="324" opacity="0.68"></line><line x1="162" y1="270" x2="108" y2="324" opacity="0.68"></line><line x1="216" y1="270" x2="162" y2="324" opacity="0.68"></line><line x1="270" y1="270" x2="216" y2="324" opacity="0.68"></line><line x1="270" y1="270" x2="324" y2="324" opacity="0.68"></line><line x1="324" y1="270" x2="378" y2="324" opacity="0.68"></line><line x1="432" y1="270" x2="378" y2="324" opacity="0.68"></line><line x1="486" y1="270" x2="432" y2="324" opacity="0.68"></line><line x1="486" y1="270" x2="540" y2="324" opacity="0.68"></line><line x1="594" y1="270" x2="540" y2="324" opacity="0.68"></line><line x1="648" y1="270" x2="594" y2="324" opacity="0.68"></line><line x1="702" y1="270" x2="648" y2="324" opacity="0.68"></line><line x1="702" y1="270" x2="756" y2="324" opacity="0.68"></line><line x1="756" y1="270" x2="810" y2="324" opacity="0.68"></line><line x1="864" y1="270" x2="810" y2="324" opacity="0.68"></line><line x1="864" y1="270" x2="918" y2="324" opacity="0.68"></line><line x1="972" y1="270" x2="918" y2="324" opacity="0.68"></line><line x1="1026" y1="270" x2="972" y2="324" opacity="0.68"></line><line x1="1026" y1="270" x2="1080" y2="324" opacity="0.68"></line><line x1="1134" y1="270" x2="1080" y2="324" opacity="0.68"></line><line x1="1134" y1="270" x2="1188" y2="324" opacity="0.68"></line><line x1="1188" y1="270" x2="1242" y2="324" opacity="0.68"></line><line x1="1242" y1="270" x2="1296" y2="324" opacity="0.68"></line><line x1="1350" y1="270" x2="1296" y2="324" opacity="0.68"></line><line x1="1404" y1="270" x2="1350" y2="324" opacity="0.68"></line><line x1="1404" y1="270" x2="1458" y2="324" opacity="0.68"></line><line x1="54" y1="324" x2="0" y2="378" opacity="0.62"></line><line x1="108" y1="324" x2="54" y2="378" opacity="0.62"></line><line x1="162" y1="324" x2="108" y2="378" opacity="0.62"></line><line x1="162" y1="324" x2="216" y2="378" opacity="0.62"></line><line x1="216" y1="324" x2="270" y2="378" opacity="0.62"></line><line x1="270" y1="324" x2="324" y2="378" opacity="0.62"></line><line x1="324" y1="324" x2="378" y2="378" opacity="0.62"></line><line x1="432" y1="324" x2="378" y2="378" opacity="0.62"></line><line x1="486" y1="324" x2="432" y2="378" opacity="0.62"></line><line x1="486" y1="324" x2="540" y2="378" opacity="0.62"></line><line x1="540" y1="324" x2="594" y2="378" opacity="0.62"></line><line x1="594" y1="324" x2="648" y2="378" opacity="0.62"></line><line x1="702" y1="324" x2="648" y2="378" opacity="0.62"></line><line x1="756" y1="324" x2="702" y2="378" opacity="0.62"></line><line x1="756" y1="324" x2="810" y2="378" opacity="0.62"></line><line x1="810" y1="324" x2="864" y2="378" opacity="0.62"></line><line x1="918" y1="324" x2="864" y2="378" opacity="0.62"></line><line x1="918" y1="324" x2="972" y2="378" opacity="0.62"></line><line x1="1026" y1="324" x2="972" y2="378" opacity="0.62"></line><line x1="1026" y1="324" x2="1080" y2="378" opacity="0.62"></line><line x1="1080" y1="324" x2="1134" y2="378" opacity="0.62"></line><line x1="1134" y1="324" x2="1188" y2="378" opacity="0.62"></line><line x1="1188" y1="324" x2="1242" y2="378" opacity="0.62"></line><line x1="1242" y1="324" x2="1296" y2="378" opacity="0.62"></line><line x1="1350" y1="324" x2="1296" y2="378" opacity="0.62"></line><line x1="1404" y1="324" x2="1350" y2="378" opacity="0.62"></line><line x1="1404" y1="324" x2="1458" y2="378" opacity="0.62"></line><line x1="54" y1="378" x2="0" y2="432" opacity="0.55"></line><line x1="54" y1="378" x2="108" y2="432" opacity="0.55"></line><line x1="108" y1="378" x2="162" y2="432" opacity="0.55"></line><line x1="162" y1="378" x2="216" y2="432" opacity="0.55"></line><line x1="270" y1="378" x2="216" y2="432" opacity="0.55"></line><line x1="270" y1="378" x2="324" y2="432" opacity="0.55"></line><line x1="378" y1="378" x2="324" y2="432" opacity="0.55"></line><line x1="432" y1="378" x2="378" y2="432" opacity="0.55"></line><line x1="486" y1="378" x2="432" y2="432" opacity="0.55"></line><line x1="540" y1="378" x2="486" y2="432" opacity="0.55"></line><line x1="594" y1="378" x2="540" y2="432" opacity="0.55"></line><line x1="594" y1="378" x2="648" y2="432" opacity="0.55"></line><line x1="648" y1="378" x2="702" y2="432" opacity="0.55"></line><line x1="702" y1="378" x2="756" y2="432" opacity="0.55"></line><line x1="810" y1="378" x2="756" y2="432" opacity="0.55"></line><line x1="864" y1="378" x2="810" y2="432" opacity="0.55"></line><line x1="918" y1="378" x2="864" y2="432" opacity="0.55"></line><line x1="972" y1="378" x2="918" y2="432" opacity="0.55"></line><line x1="1026" y1="378" x2="972" y2="432" opacity="0.55"></line><line x1="1080" y1="378" x2="1026" y2="432" opacity="0.55"></line><line x1="1134" y1="378" x2="1080" y2="432" opacity="0.55"></line><line x1="1188" y1="378" x2="1134" y2="432" opacity="0.55"></line><line x1="1242" y1="378" x2="1188" y2="432" opacity="0.55"></line><line x1="1242" y1="378" x2="1296" y2="432" opacity="0.55"></line><line x1="1350" y1="378" x2="1296" y2="432" opacity="0.55"></line><line x1="1350" y1="378" x2="1404" y2="432" opacity="0.55"></line><line x1="1404" y1="378" x2="1458" y2="432" opacity="0.55"></line><line x1="0" y1="432" x2="54" y2="486" opacity="0.49"></line><line x1="108" y1="432" x2="54" y2="486" opacity="0.49"></line><line x1="162" y1="432" x2="108" y2="486" opacity="0.49"></line><line x1="162" y1="432" x2="216" y2="486" opacity="0.49"></line><line x1="270" y1="432" x2="216" y2="486" opacity="0.49"></line><line x1="270" y1="432" x2="324" y2="486" opacity="0.49"></line><line x1="378" y1="432" x2="324" y2="486" opacity="0.49"></line><line x1="378" y1="432" x2="432" y2="486" opacity="0.49"></line><line x1="432" y1="432" x2="486" y2="486" opacity="0.49"></line><line x1="486" y1="432" x2="540" y2="486" opacity="0.49"></line><line x1="540" y1="432" x2="594" y2="486" opacity="0.49"></line><line x1="648" y1="432" x2="594" y2="486" opacity="0.49"></line><line x1="648" y1="432" x2="702" y2="486" opacity="0.49"></line><line x1="756" y1="432" x2="702" y2="486" opacity="0.49"></line><line x1="756" y1="432" x2="810" y2="486" opacity="0.49"></line><line x1="864" y1="432" x2="810" y2="486" opacity="0.49"></line><line x1="864" y1="432" x2="918" y2="486" opacity="0.49"></line><line x1="918" y1="432" x2="972" y2="486" opacity="0.49"></line><line x1="972" y1="432" x2="1026" y2="486" opacity="0.49"></line><line x1="1026" y1="432" x2="1080" y2="486" opacity="0.49"></line><line x1="1080" y1="432" x2="1134" y2="486" opacity="0.49"></line><line x1="1188" y1="432" x2="1134" y2="486" opacity="0.49"></line><line x1="1242" y1="432" x2="1188" y2="486" opacity="0.49"></line><line x1="1296" y1="432" x2="1242" y2="486" opacity="0.49"></line><line x1="1296" y1="432" x2="1350" y2="486" opacity="0.49"></line><line x1="1404" y1="432" x2="1350" y2="486" opacity="0.49"></line><line x1="1404" y1="432" x2="1458" y2="486" opacity="0.49"></line><line x1="54" y1="486" x2="0" y2="540" opacity="0.42"></line><line x1="108" y1="486" x2="54" y2="540" opacity="0.42"></line><line x1="162" y1="486" x2="108" y2="540" opacity="0.42"></line><line x1="162" y1="486" x2="216" y2="540" opacity="0.42"></line><line x1="270" y1="486" x2="216" y2="540" opacity="0.42"></line><line x1="324" y1="486" x2="270" y2="540" opacity="0.42"></line><line x1="324" y1="486" x2="378" y2="540" opacity="0.42"></line><line x1="378" y1="486" x2="432" y2="540" opacity="0.42"></line><line x1="432" y1="486" x2="486" y2="540" opacity="0.42"></line><line x1="540" y1="486" x2="486" y2="540" opacity="0.42"></line><line x1="594" y1="486" x2="540" y2="540" opacity="0.42"></line><line x1="648" y1="486" x2="594" y2="540" opacity="0.42"></line><line x1="702" y1="486" x2="648" y2="540" opacity="0.42"></line><line x1="702" y1="486" x2="756" y2="540" opacity="0.42"></line><line x1="810" y1="486" x2="756" y2="540" opacity="0.42"></line><line x1="864" y1="486" x2="810" y2="540" opacity="0.42"></line><line x1="918" y1="486" x2="864" y2="540" opacity="0.42"></line><line x1="918" y1="486" x2="972" y2="540" opacity="0.42"></line><line x1="972" y1="486" x2="1026" y2="540" opacity="0.42"></line><line x1="1026" y1="486" x2="1080" y2="540" opacity="0.42"></line><line x1="1134" y1="486" x2="1080" y2="540" opacity="0.42"></line><line x1="1188" y1="486" x2="1134" y2="540" opacity="0.42"></line><line x1="1188" y1="486" x2="1242" y2="540" opacity="0.42"></line><line x1="1296" y1="486" x2="1242" y2="540" opacity="0.42"></line><line x1="1350" y1="486" x2="1296" y2="540" opacity="0.42"></line><line x1="1404" y1="486" x2="1350" y2="540" opacity="0.42"></line><line x1="1458" y1="486" x2="1404" y2="540" opacity="0.42"></line><line x1="54" y1="540" x2="0" y2="594" opacity="0.36"></line><line x1="108" y1="540" x2="54" y2="594" opacity="0.36"></line><line x1="108" y1="540" x2="162" y2="594" opacity="0.36"></line><line x1="162" y1="540" x2="216" y2="594" opacity="0.36"></line><line x1="270" y1="540" x2="216" y2="594" opacity="0.36"></line><line x1="270" y1="540" x2="324" y2="594" opacity="0.36"></line><line x1="378" y1="540" x2="324" y2="594" opacity="0.36"></line><line x1="432" y1="540" x2="378" y2="594" opacity="0.36"></line><line x1="432" y1="540" x2="486" y2="594" opacity="0.36"></line><line x1="486" y1="540" x2="540" y2="594" opacity="0.36"></line><line x1="594" y1="540" x2="540" y2="594" opacity="0.36"></line><line x1="648" y1="540" x2="594" y2="594" opacity="0.36"></line><line x1="702" y1="540" x2="648" y2="594" opacity="0.36"></line><line x1="702" y1="540" x2="756" y2="594" opacity="0.36"></line><line x1="756" y1="540" x2="810" y2="594" opacity="0.36"></line><line x1="864" y1="540" x2="810" y2="594" opacity="0.36"></line><line x1="918" y1="540" x2="864" y2="594" opacity="0.36"></line><line x1="972" y1="540" x2="918" y2="594" opacity="0.36"></line><line x1="1026" y1="540" x2="972" y2="594" opacity="0.36"></line><line x1="1026" y1="540" x2="1080" y2="594" opacity="0.36"></line><line x1="1134" y1="540" x2="1080" y2="594" opacity="0.36"></line><line x1="1188" y1="540" x2="1134" y2="594" opacity="0.36"></line><line x1="1188" y1="540" x2="1242" y2="594" opacity="0.36"></line><line x1="1296" y1="540" x2="1242" y2="594" opacity="0.36"></line><line x1="1350" y1="540" x2="1296" y2="594" opacity="0.36"></line><line x1="1350" y1="540" x2="1404" y2="594" opacity="0.36"></line><line x1="1404" y1="540" x2="1458" y2="594" opacity="0.36"></line><line x1="54" y1="594" x2="0" y2="648" opacity="0.29"></line><line x1="108" y1="594" x2="54" y2="648" opacity="0.29"></line><line x1="162" y1="594" x2="108" y2="648" opacity="0.29"></line><line x1="216" y1="594" x2="162" y2="648" opacity="0.29"></line><line x1="270" y1="594" x2="216" y2="648" opacity="0.29"></line><line x1="324" y1="594" x2="270" y2="648" opacity="0.29"></line><line x1="378" y1="594" x2="324" y2="648" opacity="0.29"></line><line x1="432" y1="594" x2="378" y2="648" opacity="0.29"></line><line x1="432" y1="594" x2="486" y2="648" opacity="0.29"></line><line x1="486" y1="594" x2="540" y2="648" opacity="0.29"></line><line x1="540" y1="594" x2="594" y2="648" opacity="0.29"></line><line x1="648" y1="594" x2="594" y2="648" opacity="0.29"></line><line x1="648" y1="594" x2="702" y2="648" opacity="0.29"></line><line x1="756" y1="594" x2="702" y2="648" opacity="0.29"></line><line x1="756" y1="594" x2="810" y2="648" opacity="0.29"></line><line x1="810" y1="594" x2="864" y2="648" opacity="0.29"></line><line x1="864" y1="594" x2="918" y2="648" opacity="0.29"></line><line x1="918" y1="594" x2="972" y2="648" opacity="0.29"></line><line x1="972" y1="594" x2="1026" y2="648" opacity="0.29"></line><line x1="1080" y1="594" x2="1026" y2="648" opacity="0.29"></line><line x1="1080" y1="594" x2="1134" y2="648" opacity="0.29"></line><line x1="1188" y1="594" x2="1134" y2="648" opacity="0.29"></line><line x1="1188" y1="594" x2="1242" y2="648" opacity="0.29"></line><line x1="1296" y1="594" x2="1242" y2="648" opacity="0.29"></line><line x1="1296" y1="594" x2="1350" y2="648" opacity="0.29"></line><line x1="1404" y1="594" x2="1350" y2="648" opacity="0.29"></line><line x1="1458" y1="594" x2="1404" y2="648" opacity="0.29"></line><line x1="54" y1="648" x2="0" y2="702" opacity="0.23"></line><line x1="54" y1="648" x2="108" y2="702" opacity="0.23"></line><line x1="108" y1="648" x2="162" y2="702" opacity="0.23"></line><line x1="216" y1="648" x2="162" y2="702" opacity="0.23"></line><line x1="216" y1="648" x2="270" y2="702" opacity="0.23"></line><line x1="270" y1="648" x2="324" y2="702" opacity="0.23"></line><line x1="324" y1="648" x2="378" y2="702" opacity="0.23"></line><line x1="432" y1="648" x2="378" y2="702" opacity="0.23"></line><line x1="486" y1="648" x2="432" y2="702" opacity="0.23"></line><line x1="540" y1="648" x2="486" y2="702" opacity="0.23"></line><line x1="540" y1="648" x2="594" y2="702" opacity="0.23"></line><line x1="594" y1="648" x2="648" y2="702" opacity="0.23"></line><line x1="648" y1="648" x2="702" y2="702" opacity="0.23"></line><line x1="756" y1="648" x2="702" y2="702" opacity="0.23"></line><line x1="810" y1="648" x2="756" y2="702" opacity="0.23"></line><line x1="864" y1="648" x2="810" y2="702" opacity="0.23"></line><line x1="864" y1="648" x2="918" y2="702" opacity="0.23"></line><line x1="972" y1="648" x2="918" y2="702" opacity="0.23"></line><line x1="1026" y1="648" x2="972" y2="702" opacity="0.23"></line><line x1="1026" y1="648" x2="1080" y2="702" opacity="0.23"></line><line x1="1080" y1="648" x2="1134" y2="702" opacity="0.23"></line><line x1="1134" y1="648" x2="1188" y2="702" opacity="0.23"></line><line x1="1242" y1="648" x2="1188" y2="702" opacity="0.23"></line><line x1="1296" y1="648" x2="1242" y2="702" opacity="0.23"></line><line x1="1296" y1="648" x2="1350" y2="702" opacity="0.23"></line><line x1="1350" y1="648" x2="1404" y2="702" opacity="0.23"></line><line x1="1404" y1="648" x2="1458" y2="702" opacity="0.23"></line><line x1="0" y1="702" x2="54" y2="756" opacity="0.17"></line><line x1="108" y1="702" x2="54" y2="756" opacity="0.17"></line><line x1="162" y1="702" x2="108" y2="756" opacity="0.17"></line><line x1="216" y1="702" x2="162" y2="756" opacity="0.17"></line><line x1="216" y1="702" x2="270" y2="756" opacity="0.17"></line><line x1="270" y1="702" x2="324" y2="756" opacity="0.17"></line><line x1="324" y1="702" x2="378" y2="756" opacity="0.17"></line><line x1="432" y1="702" x2="378" y2="756" opacity="0.17"></line><line x1="486" y1="702" x2="432" y2="756" opacity="0.17"></line><line x1="486" y1="702" x2="540" y2="756" opacity="0.17"></line><line x1="594" y1="702" x2="540" y2="756" opacity="0.17"></line><line x1="594" y1="702" x2="648" y2="756" opacity="0.17"></line><line x1="702" y1="702" x2="648" y2="756" opacity="0.17"></line><line x1="756" y1="702" x2="702" y2="756" opacity="0.17"></line><line x1="810" y1="702" x2="756" y2="756" opacity="0.17"></line><line x1="864" y1="702" x2="810" y2="756" opacity="0.17"></line><line x1="918" y1="702" x2="864" y2="756" opacity="0.17"></line><line x1="918" y1="702" x2="972" y2="756" opacity="0.17"></line><line x1="1026" y1="702" x2="972" y2="756" opacity="0.17"></line><line x1="1080" y1="702" x2="1026" y2="756" opacity="0.17"></line><line x1="1080" y1="702" x2="1134" y2="756" opacity="0.17"></line><line x1="1134" y1="702" x2="1188" y2="756" opacity="0.17"></line><line x1="1188" y1="702" x2="1242" y2="756" opacity="0.17"></line><line x1="1242" y1="702" x2="1296" y2="756" opacity="0.17"></line><line x1="1296" y1="702" x2="1350" y2="756" opacity="0.17"></line><line x1="1404" y1="702" x2="1350" y2="756" opacity="0.17"></line><line x1="1458" y1="702" x2="1404" y2="756" opacity="0.17"></line><line x1="0" y1="756" x2="54" y2="810" opacity="0.10"></line><line x1="54" y1="756" x2="108" y2="810" opacity="0.10"></line><line x1="108" y1="756" x2="162" y2="810" opacity="0.10"></line><line x1="162" y1="756" x2="216" y2="810" opacity="0.10"></line><line x1="270" y1="756" x2="216" y2="810" opacity="0.10"></line><line x1="270" y1="756" x2="324" y2="810" opacity="0.10"></line><line x1="324" y1="756" x2="378" y2="810" opacity="0.10"></line><line x1="378" y1="756" x2="432" y2="810" opacity="0.10"></line><line x1="486" y1="756" x2="432" y2="810" opacity="0.10"></line><line x1="540" y1="756" x2="486" y2="810" opacity="0.10"></line><line x1="594" y1="756" x2="540" y2="810" opacity="0.10"></line><line x1="594" y1="756" x2="648" y2="810" opacity="0.10"></line><line x1="702" y1="756" x2="648" y2="810" opacity="0.10"></line><line x1="702" y1="756" x2="756" y2="810" opacity="0.10"></line><line x1="810" y1="756" x2="756" y2="810" opacity="0.10"></line><line x1="810" y1="756" x2="864" y2="810" opacity="0.10"></line><line x1="918" y1="756" x2="864" y2="810" opacity="0.10"></line><line x1="972" y1="756" x2="918" y2="810" opacity="0.10"></line><line x1="1026" y1="756" x2="972" y2="810" opacity="0.10"></line><line x1="1026" y1="756" x2="1080" y2="810" opacity="0.10"></line><line x1="1080" y1="756" x2="1134" y2="810" opacity="0.10"></line><line x1="1188" y1="756" x2="1134" y2="810" opacity="0.10"></line><line x1="1242" y1="756" x2="1188" y2="810" opacity="0.10"></line><line x1="1242" y1="756" x2="1296" y2="810" opacity="0.10"></line><line x1="1350" y1="756" x2="1296" y2="810" opacity="0.10"></line><line x1="1350" y1="756" x2="1404" y2="810" opacity="0.10"></line><line x1="1458" y1="756" x2="1404" y2="810" opacity="0.10"></line></g></svg>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Community Pulse</h2>
              <p className="text-gray-600">Live updates from our thriving community platform</p>
            </motion.div>
          </div>

          {/* Live statistics */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-gray-700 font-medium text-sm">{stat.label}</h3>
                  <div className="p-1.5 bg-lime-600 rounded-full text-gray-100 shadow-sm">{stat.icon}</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-end gap-2"
                  >
                    <span className="text-2xl font-bold text-gray-900">{stat.values[statIndex].toLocaleString()}</span>
                    <span className="text-lime-500 text-sm pb-0.5">+{Math.floor(Math.random() * 10)}</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-lime-500 mr-2" />
              <h3 className="text-gray-800 font-medium">Member Spotlight</h3>
            </div>
            <div className="min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-600 italic mb-4">"{testimonials[testimonialIndex].quote}"</p>
                  <div>
                    <p className="text-gray-800 font-medium">{testimonials[testimonialIndex].author}</p>
                    <p className="text-gray-500 text-sm">{testimonials[testimonialIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-500 mb-8">
              {activeTab === "login"
                ? "Enter your credentials to access your account"
                : "Fill in the form to create your account"}
            </p>

            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`pb-3 px-4 font-medium text-sm transition-colors ${
                  activeTab === "login"
                    ? "text-gray-900 border-b-2 border-lime-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`pb-3 px-4 font-medium text-sm transition-colors ${
                  activeTab === "signup"
                    ? "text-gray-900 border-b-2 border-lime-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-5">
                  {activeTab === "signup" && (
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:ring-lime-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:ring-lime-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      {activeTab === "login" && (
                        <a href="#" className="text-sm text-lime-600 hover:text-lime-500">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:ring-lime-500 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {activeTab === "signup" && (
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-lime-500 focus:ring-lime-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "login" && (
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-white text-lime-600 focus:ring-lime-500 focus:ring-opacity-50"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                  )}

                  <Button className="w-full bg-gradient-to-br from-lime-500 to-lime-600  text-white py-6 rounded-md text-base font-medium">
                    {activeTab === "login" ? "Sign in" : "Create account"}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="bg-white hover:bg-gray-50 py-2 px-4 rounded-md border border-gray-300 flex justify-center shadow-sm"
                    >
                      <svg
                        className="h-5 w-5 text-[#1877F2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="bg-white hover:bg-gray-50 py-2 px-4 rounded-md border border-gray-300 flex justify-center shadow-sm"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="bg-white hover:bg-gray-50 py-2 px-4 rounded-md border border-gray-300 flex justify-center shadow-sm"
                    >
                      <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-6">
                    {activeTab === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("signup")}
                          className="text-lime-600 hover:text-lime-500 font-medium"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-lime-600 hover:text-lime-500 font-medium"
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
