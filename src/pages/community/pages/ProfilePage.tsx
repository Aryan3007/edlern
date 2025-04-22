"use client"

import type React from "react"
import { useState } from "react"
import { Edit, Settings, LogOut, User, Bell, Shield, CreditCard, HelpCircle, X } from "lucide-react"

interface ProfileTab {
  id: string
  label: string
  icon: React.ReactNode
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs: ProfileTab[] = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={20} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={20} /> },
    { id: "help", label: "Help", icon: <HelpCircle size={20} /> },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 ">
          <div className="bg-white sticky top-0 rounded-lg shadow overflow-hidden">
            <div className="p-6 text-center border-b">
              <div className="relative inline-block">
                <div
                  className="h-24 w-24 rounded-full bg-cover bg-center mx-auto"
                  style={{ backgroundImage: `url('/placeholder.jpg?height=96&width=96')` }}
                ></div>
                <button className="absolute bottom-0 right-0 p-1 bg-lime-600 text-white rounded-full">
                  <Edit size={16} />
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4">Jasmine Turner</h2>
              <p className="text-gray-500">Graphic Designer</p>
            </div>

            <div className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-4 py-2 rounded-md ${
                      activeTab === tab.id ? "bg-lime-100 text-lime-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Settings size={20} />
                <span className="ml-3">Settings</span>
              </button>
              <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md mt-1">
                <LogOut size={20} />
                <span className="ml-3">Log out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-gray-500">Update your personal information</p>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        defaultValue="Jasmine"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        defaultValue="Turner"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue="jasmine.turner@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue="Hello, everyone! My name is Jasmine Turner, and I've recently embarked on a mindfulness and meditation journey to find peace and balance in my hectic life. As a graphic designer and a mother of two, finding moments of tranquility amidst the business has always been a challenge."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      defaultValue="San Francisco, CA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
                        <span>Meditation</span>
                        <button className="ml-2 text-lime-700 hover:text-lime-900">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
                        <span>Mindfulness</span>
                        <button className="ml-2 text-lime-700 hover:text-lime-900">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
                        <span>Graphic Design</span>
                        <button className="ml-2 text-lime-700 hover:text-lime-900">
                          <X size={14} />
                        </button>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50">
                        + Add interest
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Notification Settings</h2>
                <p className="text-gray-500">Manage how you receive notifications</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New posts</p>
                          <p className="text-sm text-gray-500">Get notified when new posts are published</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Comments</p>
                          <p className="text-sm text-gray-500">Get notified when someone comments on your posts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Events</p>
                          <p className="text-sm text-gray-500">Get notified about upcoming events</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Direct messages</p>
                          <p className="text-sm text-gray-500">Get notified when you receive a direct message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Live sessions</p>
                          <p className="text-sm text-gray-500">Get notified when a live session is about to start</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="button" className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
                      Save preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
