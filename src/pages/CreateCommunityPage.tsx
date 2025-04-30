"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ChevronLeft, ChevronRight, Globe, ImageIcon, Lock, Upload, Users } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

type BasicInfo = {
  name: string
  slug: string
  description: string
  category: string
}

type Settings = {
  privacy: "public" | "private" | "secret"
  memberApproval: boolean
  allowInvitations: boolean
  contentCreation: "all" | "level2" | "level5" | "admins"
  commentPermission: "all" | "level2" | "level5" | "admins"
  directMessages: "all" | "level2" | "level5" | "admins"
}

type Branding = {
  logo?: string
  banner?: string
  primaryColor?: string
  theme: "light" | "dark" | "system"
}

type Admin = {
  adminEmails: string
  welcomeMessage: string
}

type CommunityFormValues = {
  basicInfo: BasicInfo
  settings: Settings
  branding: Branding
  admin: Admin
}

export default function CreateCommunityPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CommunityFormValues>>({
    basicInfo: {
      name: "",
      slug: "",
      description: "",
      category: "",
    },
    settings: {
      privacy: "public",
      memberApproval: false,
      allowInvitations: true,
      contentCreation: "all",
      commentPermission: "all",
      directMessages: "all",
    },
    branding: {
      logo: "",
      banner: "",
      primaryColor: "#4361ee",
      theme: "light",
    },
    admin: {
      adminEmails: "",
      welcomeMessage: "Welcome to our community! We're excited to have you join us.",
    },
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [direction, setDirection] = useState<"next" | "prev">("next")

  const handleInputChange = <T extends keyof CommunityFormValues>(
    section: T,
    field: keyof CommunityFormValues[T],
    value: CommunityFormValues[T][typeof field]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const goToNextStep = () => {
    setDirection("next")
    setStep((prevStep) => Math.min(prevStep + 1, 5))
  }

  const goToPrevStep = () => {
    setDirection("prev")
    setStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  const onBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goToNextStep()
  }

  const onSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goToNextStep()
  }

  const onBrandingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goToNextStep()
  }

  const onAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goToNextStep()
  }

  const onFinalSubmit = () => {
    console.log("Form submitted:", formData)
    setTimeout(() => {
      navigate("/community-creation/successfull")
    }, 1000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoPreview(url)
      handleInputChange("branding", "logo", url)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBannerPreview(url)
      handleInputChange("branding", "banner", url)
    }
  }

  const getInitials = (name: string) => {
    return (
      name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "CC"
    )
  }


  // Animation variants
  const contentVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "next" ? -50 : 50,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-full lg:h-[90vh] overflow-y-auto flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl bg-white">
        {/* Left Sidebar */}
        <div className="w-full md:w-72 bg-gradient-to-br from-sky-600 to-sky-700 text-white p-6 md:p-8 relative">
          <div className="space-y-8">
            <h2 className="text-xl font-bold">Create Community</h2>

            {/* Steps */}
            <div className="space-y-6">
              {[
                { number: 1, title: "BASIC INFO" },
                { number: 2, title: "SETTINGS" },
                { number: 3, title: "BRANDING" },
                { number: 4, title: "ADMIN SETUP" },
                { number: 5, title: "REVIEW" },
              ].map((item) => (
                <div key={item.number} className="flex items-center gap-3">
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step === item.number
                        ? "bg-white text-sky-600"
                        : step > item.number
                          ? "bg-sky-400 text-white"
                          : "bg-sky-800 text-white"
                    } font-bold text-sm`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step > item.number ? <CheckCircle2 className="w-5 h-5" /> : item.number}
                  </motion.div>
                  <div className={`text-sm font-medium ${step === item.number ? "text-white" : "text-sky-200"}`}>
                    STEP {item.number}
                    <div className="font-bold">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 md:p-6 flex-1 overflow-auto" style={{ height: "600px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                className="h-full"
              >
                {step === 1 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Basic Information</h2>
                      <p className="text-slate-500 mb-6">Please provide details about your community.</p>
                    </div>

                    <form id="basic-info-form" onSubmit={onBasicInfoSubmit} className="space-y-6 flex-1">
                      <div className="space-y-4">
                        <div className="group">
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Community Name
                          </label>
                          <Input
                            id="name"
                            placeholder="e.g., Adonis Gang"
                            value={formData.basicInfo?.name}
                            onChange={(e) => handleInputChange("basicInfo", "name", e.target.value)}
                            className="w-full p-3 rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            This is how your community will appear across the platform
                          </p>
                        </div>

                        <div className="group">
                          <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            URL Slug
                          </label>
                          <div className="flex">
                            <div className="bg-slate-100 flex items-center px-3 rounded-l-md border border-r-0 border-slate-300">
                              <span className="text-slate-500">skool.com/</span>
                            </div>
                            <Input
                              id="slug"
                              className="rounded-l-none border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                              placeholder="adonis-gang"
                              value={formData.basicInfo?.slug}
                              onChange={(e) => handleInputChange("basicInfo", "slug", e.target.value)}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Only lowercase letters, numbers, and hyphens are allowed
                          </p>
                        </div>

                        <div className="group">
                          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Description
                          </label>
                          <Textarea
                            id="description"
                            placeholder="Tell potential members what your community is about"
                            className="min-h-[100px] border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                            value={formData.basicInfo?.description}
                            onChange={(e) => handleInputChange("basicInfo", "description", e.target.value)}
                          />
                          <p className="text-xs text-slate-500 mt-1">Briefly describe your community's purpose and values</p>
                        </div>

                        <div className="group">
                          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Category
                          </label>
                          <Select
                            onValueChange={(value) => handleInputChange("basicInfo", "category", value)}
                            value={formData.basicInfo?.category}
                          >
                            <SelectTrigger className="border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self-improvement">Self Improvement</SelectItem>
                              <SelectItem value="fitness">Fitness</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="lifestyle">Lifestyle</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="health">Health & Wellness</SelectItem>
                              <SelectItem value="creative">Creative Arts</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-slate-500 mt-1">Categorizing your community helps with discovery</p>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

{step === 2 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Community Settings</h2>
                      <p className="text-slate-500 mb-6">Configure privacy and access settings for your community.</p>
                    </div>

                    <form id="settings-form" onSubmit={onSettingsSubmit} className="space-y-6 flex-1">
                      <div className="space-y-6">
                        <div className="group">
                          <label className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Privacy Level
                          </label>
                          <RadioGroup
                            onValueChange={(value) => handleInputChange("settings", "privacy", value as "public" | "private" | "secret")}
                            defaultValue={formData.settings?.privacy}
                            className="grid grid-col-1 lg:grid-cols-3 space-y-3"
                          >
                            <motion.div 
                              className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:border-sky-300 h-full hover:bg-sky-50 transition-colors"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RadioGroupItem value="public" id="privacy-public" />
                              <label htmlFor="privacy-public" className="space-y-1 cursor-pointer w-full">
                                <div className="flex items-center">
                                  <Globe className="mr-2 h-4 w-4 text-sky-600" />
                                  <span className="text-sm font-medium leading-none">Public</span>
                                </div>
                                <p className="text-xs text-slate-500">Anyone can find and join your community</p>
                              </label>
                            </motion.div>

                            <motion.div 
                              className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:border-sky-300 h-full hover:bg-sky-50 transition-colors"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RadioGroupItem value="private" id="privacy-private" />
                              <label htmlFor="privacy-private" className="space-y-1 cursor-pointer w-full">
                                <div className="flex items-center">
                                  <Users className="mr-2 h-4 w-4 text-sky-600" />
                                  <span className="text-sm font-medium leading-none">Private</span>
                                </div>
                                <p className="text-xs text-slate-500">
                                  Anyone can find your community, but only approved members can join
                                </p>
                              </label>
                            </motion.div>

                            <motion.div 
                              className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:border-sky-300 hover:bg-sky-50 transition-colors"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RadioGroupItem value="secret" id="privacy-secret" />
                              <label htmlFor="privacy-secret" className="space-y-1 cursor-pointer w-full">
                                <div className="flex items-center">
                                  <Lock className="mr-2 h-4 w-4 text-sky-600" />
                                  <span className="text-sm font-medium leading-none">Secret</span>
                                </div>
                                <p className="text-xs text-slate-500">
                                  Only people with invitation links can find and join your community
                                </p>
                              </label>
                            </motion.div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4">
                          <motion.div 
                            className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className="space-y-0.5">
                              <label htmlFor="memberApproval" className="text-sm font-medium text-slate-700">
                                Require Approval
                              </label>
                              <p className="text-xs text-slate-500">Manually approve new members before they can join</p>
                            </div>
                            <Switch
                              id="memberApproval"
                              checked={formData.settings?.memberApproval}
                              onCheckedChange={(checked) => handleInputChange("settings", "memberApproval", checked)}
                              className="data-[state=checked]:bg-sky-600"
                            />
                          </motion.div>

                          <motion.div 
                            className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className="space-y-0.5">
                              <label htmlFor="allowInvitations" className="text-sm font-medium text-slate-700">
                                Allow Invitations
                              </label>
                              <p className="text-xs text-slate-500">Let members invite others to join the community</p>
                            </div>
                            <Switch
                              id="allowInvitations"
                              checked={formData.settings?.allowInvitations}
                              onCheckedChange={(checked) => handleInputChange("settings", "allowInvitations", checked)}
                              className="data-[state=checked]:bg-sky-600"
                            />
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-slate-800 mb-3">Content Permissions</h3>
                          <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
                            <div className="group w-full">
                              <label htmlFor="contentCreation" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can create posts
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "contentCreation", value as "all" | "level2" | "level5" | "admins")}
                                value={formData.settings?.contentCreation}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Members</SelectItem>
                                  <SelectItem value="level2">Level 2+ Members</SelectItem>
                                  <SelectItem value="level5">Level 5+ Members</SelectItem>
                                  <SelectItem value="admins">Admins Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="group w-full">
                              <label htmlFor="commentPermission" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can comment
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "commentPermission", value as "all" | "level2" | "level5" | "admins")}
                                value={formData.settings?.commentPermission}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Members</SelectItem>
                                  <SelectItem value="level2">Level 2+ Members</SelectItem>
                                  <SelectItem value="level5">Level 5+ Members</SelectItem>
                                  <SelectItem value="admins">Admins Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="group w-full">
                              <label htmlFor="directMessages" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can send direct messages
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "directMessages", value as "all" | "level2" | "level5" | "admins")}
                                value={formData.settings?.directMessages}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Members</SelectItem>
                                  <SelectItem value="level2">Level 2+ Members</SelectItem>
                                  <SelectItem value="level5">Level 5+ Members</SelectItem>
                                  <SelectItem value="admins">Admins Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Branding</h2>
                      <p className="text-slate-500 mb-6">Customize the look and feel of your community.</p>
                    </div>

                    <form id="branding-form" onSubmit={onBrandingSubmit} className="space-y-6 flex-1">
                      <div className="space-y-6">
                        <div className="group">
                          <label htmlFor="logo" className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Community Logo
                          </label>
                          <div className="flex items-center space-x-4">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                              <Avatar className="w-16 h-16 border-2 border-sky-100">
                                {logoPreview ? (
                                  <AvatarImage src={logoPreview || "/placeholder.svg"} alt="Community Logo" />
                                ) : (
                                  <AvatarFallback className="bg-sky-100 text-sky-600">
                                    {getInitials(formData.basicInfo?.name || "")}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                            </motion.div>
                            <motion.label
                              htmlFor="logo-upload"
                              className="cursor-pointer bg-sky-50 px-4 py-2 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-100 transition-colors flex items-center"
                              whileHover={{ scale: 1.03 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <span>Upload Logo</span>
                              <Upload className="ml-2 h-4 w-4 inline" />
                              <Input
                                id="logo-upload"
                                type="file"
                                className="hidden"
                                onChange={handleLogoUpload}
                                accept="image/*"
                              />
                            </motion.label>
                            {logoPreview && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setLogoPreview(null)
                                  handleInputChange("branding", "logo", undefined)
                                }}
                                className="text-sky-600"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Recommended size: 192x192 pixels</p>
                        </div>

                        <div className="group">
                          <label htmlFor="banner" className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Community Banner (Optional)
                          </label>
                          <motion.div 
                            className="relative w-full overflow-hidden rounded-md aspect-video bg-sky-50 border-2 h-44 border-dashed border-sky-200"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {bannerPreview ? (
                              <img
                                src={bannerPreview || "/placeholder.svg"}
                                alt="Community Banner Preview"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-sky-400">
                                <ImageIcon className="h-6 w-6" />
                                <span className="ml-2 text-sm">No banner uploaded</span>
                              </div>
                            )}
                          </motion.div>
                          <div className="mt-3 flex items-center gap-3">
                            <motion.label
                              htmlFor="banner-upload"
                              className="cursor-pointer bg-sky-50 px-4 py-2 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-100 transition-colors flex items-center"
                              whileHover={{ scale: 1.03 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <span>Upload Banner</span>
                              <Upload className="ml-2 h-4 w-4 inline" />
                              <Input
                                id="banner-upload"
                                type="file"
                                className="hidden"
                                onChange={handleBannerUpload}
                                accept="image/*"
                              />
                            </motion.label>
                            {bannerPreview && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setBannerPreview(null)
                                  handleInputChange("branding", "banner", undefined)
                                }}
                                className="text-sky-600"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Recommended size: 1200x300 pixels</p>
                        </div>

                        
                      </div>
                    </form>
                  </div>
                )}

                {step === 4 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Setup</h2>
                      <p className="text-slate-500 mb-6">Configure initial admin settings for your community.</p>
                    </div>

                    <form id="admin-form" onSubmit={onAdminSubmit} className="space-y-6 flex-1">
                      <div className="space-y-6">
                        <div className="group">
                          <label htmlFor="adminEmails" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Admin Email(s)
                          </label>
                          <Input
                            id="adminEmails"
                            placeholder="Separate multiple emails with commas"
                            value={formData.admin?.adminEmails}
                            onChange={(e) => handleInputChange("admin", "adminEmails", e.target.value)}
                            className="w-full border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Enter the email addresses of the initial community administrators
                          </p>
                        </div>

                        <div className="group">
                          <label htmlFor="welcomeMessage" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Welcome Message
                          </label>
                          <Textarea
                            id="welcomeMessage"
                            placeholder="Write a default welcome message for new members"
                            className="min-h-[150px] border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                            value={formData.admin?.welcomeMessage}
                            onChange={(e) => handleInputChange("admin", "welcomeMessage", e.target.value)}
                          />
                          <p className="text-xs text-slate-500 mt-1">This message will be sent to new members upon joining</p>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {step === 5 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Review & Submit</h2>
                      <p className="text-slate-500 mb-6">Review all the details before creating your community.</p>
                    </div>

                    <div className="space-y-6 overflow-auto flex-1 pr-2">
                      <motion.div 
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Basic Information</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Name:</span> {formData.basicInfo?.name}
                          </p>
                          <p>
                            <span className="font-semibold">Slug:</span> skool.com/{formData.basicInfo?.slug}
                          </p>
                          <p>
                            <span className="font-semibold">Description:</span> {formData.basicInfo?.description}
                          </p>
                          <p>
                            <span className="font-semibold">Category:</span> {formData.basicInfo?.category}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Settings</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Privacy:</span> {formData.settings?.privacy}
                          </p>
                          <p>
                            <span className="font-semibold">Require Approval:</span>{" "}
                            {formData.settings?.memberApproval ? <Badge className="bg-sky-600">Yes</Badge> : <Badge variant="outline">No</Badge>}
                          </p>
                          <p>
                            <span className="font-semibold">Allow Invitations:</span>{" "}
                            {formData.settings?.allowInvitations ? <Badge className="bg-sky-600">Yes</Badge> : <Badge variant="outline">No</Badge>}
                          </p>
                          <p>
                            <span className="font-semibold">Content Creation:</span> {formData.settings?.contentCreation}
                          </p>
                          <p>
                            <span className="font-semibold">Comment Permission:</span> {formData.settings?.commentPermission}
                          </p>
                          <p>
                            <span className="font-semibold">Direct Messages:</span> {formData.settings?.directMessages}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Branding</h3>
                        <div className="space-y-2">
                          {formData.branding?.logo && (
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">Logo:</span>
                              <Avatar>
                                <AvatarImage src={formData.branding.logo || "/placeholder.svg"} alt="Community Logo" />
                              </Avatar>
                            </div>
                          )}
                          {formData.branding?.banner && <p className="font-semibold">Banner: Uploaded</p>}
                         
                        </div>
                      </motion.div>

                      <motion.div 
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Admin Setup</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Admin Email(s):</span> {formData.admin?.adminEmails}
                          </p>
                          <p>
                            <span className="font-semibold">Welcome Message:</span> {formData.admin?.welcomeMessage}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with buttons */}
          <div className="p-6 border-t border-slate-200 flex justify-between items-center bg-white">
            {step > 1 ? (
              <Button
                onClick={goToPrevStep}
                variant="outline"
                className="flex items-center gap-1 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate("/admin/communities")}
                className="hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                Cancel
              </Button>
            )}

            {step < 5 ? (
              <Button
                onClick={goToNextStep}
                type="submit"
                form={
                  step === 1
                    ? "basic-info-form"
                    : step === 2
                    ? "settings-form"
                    : step === 3
                    ? "branding-form"
                    : "admin-form"
                }
                className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1 transition-colors"
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <motion.button
                onClick={onFinalSubmit}
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Community
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
