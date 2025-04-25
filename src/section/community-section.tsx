"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tab } from "@headlessui/react"
import { Users, CreditCard, Video, Trophy, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const tabs = [
  {
    id: "create",
    label: "Create",
    icon: <Users className="h-5 w-5" />,
    title: "Build Your Community",
    description:
      "Create your own community in just a few easy steps and start engaging with learners by sharing your content.",
    features: ["Customizable community pages", "Content management tools", "Member management", "Discussion forums"],
    image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    color: "from-sky-500 to-sky-600"
  },
  {
    id: "monetize",
    label: "Monetize",
    icon: <CreditCard className="h-5 w-5" />,
    title: "Monetize Your Community",
    description:
      "Generate revenue through memberships, digital products, and exclusive content for your community members.",
    features: ["Multiple payment options", "Subscription management", "Digital product sales", "Automated billing"],
    image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    color: "from-sky-500 to-sky-600"
  },
  {
    id: "livestream",
    label: "Live Stream",
    icon: <Video className="h-5 w-5" />,
    title: "Engage with Live Streaming",
    description:
      "Connect with your audience in real-time through high-quality live streaming and interactive sessions.",
    features: ["HD video streaming", "Live chat integration", "Recording capabilities", "Stream scheduling"],
    image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    color: "from-sky-500 to-sky-600"
  },
  {
    id: "gamification",
    label: "Gamification",
    icon: <Trophy className="h-5 w-5" />,
    title: "Gamify the Experience",
    description: "Increase engagement with gamification elements like badges, points, leaderboards, and challenges.",
    features: ["Custom achievement badges", "Point systems", "Leaderboards", "Challenges and rewards"],
    image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    color: "from-sky-500 to-sky-600"
  },
]

export default function CommunitySection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-200  rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-200  rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-[#0a2540] dark:text-white">Grow a dynamic community</span>
          </h2>
          <h3 className="text-2xl md:text-4xl font-semibold text-sky-600 dark:text-sky-600 mb-8">
            That reflects your vision
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform provides all the tools you need to build, grow, and monetize your online community.
          </p>
        </motion.div>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              {/* Tab navigation - horizontal scrollable on mobile */}
              <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:overflow-visible md:-mx-0 md:px-0">
                <Tab.List className="flex gap-2 min-w-max md:flex-wrap md:gap-3">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      className={({ selected }) =>
                        `flex items-center gap-2 px-4 py-3 md:px-6 rounded-full text-sm md:text-base font-medium transition-all duration-300 outline-none ${
                          selected
                            ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.id}-500/20 ring-2 ring-white/10`
                            : "bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/70 border border-gray-200 dark:border-gray-700"
                        }`
                      }
                    >
                      {tab.icon}
                      {tab.label}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              {/* Tab content */}
              <Tab.Panels className="min-h-[320px]">
                <AnimatePresence mode="wait">
                  {tabs.map((tab, idx) => (
                    <Tab.Panel key={tab.id} className="outline-none" static={idx === selectedIndex}>
                      {idx === selectedIndex && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-8"
                        >
                          <div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                              {tab.title}
                            </h3>
                            <div className={`h-1 w-16 bg-gradient-to-r ${tab.color} rounded-full mb-4`}></div>
                            <p className="text-lg text-gray-600 dark:text-gray-300">{tab.description}</p>
                          </div>

                          <div className="space-y-4">
                            {tab.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="flex items-center gap-3 group"
                                onMouseEnter={() => setHoveredFeature(`${tab.id}-${index}`)}
                                onMouseLeave={() => setHoveredFeature(null)}
                              >
                                <div className="relative flex items-center justify-center w-8 h-8">
                                  <div className={`absolute inset-0 rounded-full ${
                                    hoveredFeature === `${tab.id}-${index}` 
                                      ? `bg-gradient-to-r ${tab.color} scale-100` 
                                      : "bg-gray-100 dark:bg-gray-800 scale-90"
                                    } transition-all duration-300`}>
                                  </div>
                                  <CheckCircle
                                    className={`h-5 w-5 relative z-10 transition-colors duration-300 ${
                                      hoveredFeature === `${tab.id}-${index}`
                                        ? "text-white"
                                        : "text-gray-700 dark:text-gray-300"
                                    }`}
                                  />
                                  {hoveredFeature === `${tab.id}-${index}` && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 z-20"
                                    >
                                      <Sparkles className="h-3 w-3 text-yellow-400" />
                                    </motion.div>
                                  )}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{feature}</p>
                              </motion.div>
                            ))}
                          </div>

                          <div className="pt-4">
                            <Button className={`bg-gradient-to-r ${tab.color} rounded-full text-white hover:opacity-90 transition-opacity group px-6 py-2.5`}>
                              Get started
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </Tab.Panel>
                  ))}
                </AnimatePresence>
              </Tab.Panels>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-gray-900/30 dark:from-gray-900/30 dark:to-gray-900/60 rounded-xl z-10"></div>
                
                {/* Tab specific images */}
                <AnimatePresence mode="wait">
                  {isClient && (
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-gray-900/20 border border-gray-200 dark:border-gray-800"
                    >
                      {selectedIndex === 0 && (
                        <img
                          src="https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Community Building Dashboard"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {selectedIndex === 1 && (
                        <img
                          src="https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Monetization Dashboard"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {selectedIndex === 2 && (
                        <img
                          src="https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Live Streaming Dashboard"
                          className="w-full h-full object-cover"
                        />
                      )}
                      {selectedIndex === 3 && (
                        <img
                       src="https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Gamification Dashboard"
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {/* Play button overlay for livestream tab */}
                      {/* {selectedIndex === 2 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full cursor-pointer group hover:bg-white/30 transition-all duration-300">
                            <Play className="h-12 w-12 text-white fill-white" />
                          </div>
                        </motion.div>
                      )} */}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </Tab.Group>

        {/* Bottom CTA */}
       
      </div>
    </section>
  )
}