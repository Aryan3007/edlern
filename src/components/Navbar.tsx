import type React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Users,
  BarChart2,
  Calendar,
  MessageSquare,
  CreditCard,
  Zap,
  Mail,
  Bot,
  X,
  Menu,
  ChevronRight,
  BookOpen,
  GraduationCap,
  FileText,
  HelpCircle,
  Download,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  // { name: "Home", href:"/", hasDropdown: false },
  { name: "Product", href:"", hasDropdown: true },
  { name: "Resources", href:"", hasDropdown: true },
  { name: "Discover", href:"/discover", hasDropdown: false },
  { name: "Pricing", href:"", hasDropdown: false },
  { name: "About", href:"/about", hasDropdown: false },
];

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Discussions",
    description: "Hold engaging conversations",
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Analytics",
    description: "Get all your community data",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Events",
    description: "Host virtual events, anywhere",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Community AI",
    description: "AI-powered connections, and learning",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Chat",
    description: "Engage members with discussions",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Marketing Hub",
    description: "Email, CRM, & marketing automation",
    isNew: true,
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payments",
    description: "Charge for your community and content",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI Agents",
    description: "Guide, support, and coach your members 24/7",
    isNew: true,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Workflows",
    description: "Automate personalized experiences",
  },
];

const plusFeatures = [
  {
    title: "Branded apps",
    description: "Launch a fully-branded community app",
    image: "/user-profile-dashboard.png",
  },
  {
    title: "Headless",
    description: "Add pre-built community features to your app or site",
    image: "/website-blueprint.png",
  },
];

const resourcesItems = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learning Guides",
    description: "Comprehensive guides to enhance your learning journey",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Become an Instructor",
    description: "Learn how to create and publish your own courses",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Documentation",
    description: "Detailed documentation for platform features",
  },
  {
    icon: <HelpCircle className="h-6 w-6" />,
    title: "Help Center",
    description: "Find answers to common questions",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Forums",
    description: "Connect with other learners and instructors",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Webinars & Events",
    description: "Join live sessions and educational events",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Teaching Resources",
    description: "Templates and tools for course creation",
    isNew: true,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Success Stories",
    description: "Learn from our top instructors and students",
  },
];

const resourcesFeatures = [
  {
    title: "Instructor Academy",
    description: "Free courses on how to create engaging educational content",
    image: "/online-instructor-explaining.png",
  },
  {
    title: "Student Resources",
    description: "Tools and guides to maximize your learning experience",
    image: "/focused-student.png",
  },
];

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close any open dropdowns when toggling mobile menu
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (name: string) => {
    if (mobileSubmenuOpen === name) {
      setMobileSubmenuOpen(null);
    } else {
      setMobileSubmenuOpen(name);
    }
  };

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 bg-white mx-auto text-gray-800 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "border-b "
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-2xl">
              {/* <span className="bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent">ed</span>Lern */}
              <img src="/logo.png" className='w-24' alt="" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                  className={cn(
                    "px-4 py-2 rounded-md hover:text-sky-500 flex items-center gap-1 transition-colors",
                    activeDropdown === item.name && "text-sky-600",
                  )}
                >
                  <Link to={item.href} className="flex items-center gap-1">
                  {item.name}
                  </Link>
                  {item.hasDropdown &&
                    (activeDropdown === item.name ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-sky-500">
              Log in
            </Link>
            <Link to={"/community/feed"}>
            <button className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-full px-6 py-2 font-medium transition hover:bg-sky-500">
              Get Started
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center  justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 fixed top-2 right-2  w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Desktop dropdown */}
      <AnimatePresence>
        {(activeDropdown === "Product" || activeDropdown === "Resources") && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDropdown(null)}
            />
            <motion.div
              className="fixed top-20 max-w-7xl mx-auto h-fit px-4 py-6 rounded-xl left-0 right-0 bg-white shadow-xl z-40 overflow-y-auto hidden lg:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container mx-auto text-gray-800 px-4">
                {activeDropdown === "Product" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium mb-6">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-4 group cursor-pointer"
                          >
                            <div className="mt-1 text-gray-600 group-hover:text-sky-500 transition-colors">
                              {feature.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800 group-hover:text-sky-500 transition-colors">
                                  {feature.title}
                                </h4>
                                {feature.isNew && (
                                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-6">Premium</h3>
                      <div className="space-y-6">
                        {plusFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (features.length + index) * 0.05 }}
                            className="bg-sky-100 rounded-xl p-4 text-gray-800 cursor-pointer"
                          >
                            <h4 className="font-medium mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                            {/* <div className="rounded-lg overflow-hidden shadow-md">
                              <img
                                src={feature.image || "/placeholder.svg"}
                                alt={feature.title}
                                className="w-full h-auto object-cover"
                              />
                            </div> */}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === "Resources" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium mb-6">Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resourcesItems.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-4 group cursor-pointer"
                          >
                            <div className="mt-1 text-gray-500 group-hover:text-sky-500 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium group-hover:text-sky-500 transition-colors">
                                  {item.title}
                                </h4>
                                {item.isNew && (
                                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-6">Featured Resources</h3>
                      <div className="space-y-6">
                        {resourcesFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (resourcesItems.length + index) * 0.05 }}
                            className="bg-sky-100 rounded-xl p-4 text-gray-800 cursor-pointer"
                          >
                            <h4 className="font-medium mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                            {/* <div className="rounded-lg overflow-hidden shadow-md">
                              <img
                                src={feature.image || "/placeholder.svg"}
                                alt={feature.title}
                                className="w-full h-auto object-cover"
                              />
                            </div> */}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu - half screen dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className='p-4'>
                <Link to="/" className="font-bold text-2xl">
                  <span className='text-sky-500'>ed</span>Lern
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden flex items-center  justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="h-6 fixed top-6 right-6  w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="p-4 space-y-4 bg-white mx-auto text-gray-800 pt-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 pb-4">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(item.name)}
                          className="flex items-center justify-between w-full py-2 text-lg font-medium"
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileSubmenuOpen === item.name && "rotate-90"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenuOpen === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              {item.name === "Product" && (
                                <div className="py-4 pl-4">
                                  <h3 className="text-lg font-medium mb-4">Features</h3>
                                  <div className="space-y-6">
                                    {features.map((feature, index) => (
                                      <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="flex gap-3"
                                      >
                                        <div className="text-sky-500">{feature.icon}</div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-medium">{feature.title}</h4>
                                            {feature.isNew && (
                                              <span className="text-xs bg-sky-100 text-sky-500 px-2 py-0.5 rounded-full">
                                                New
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {item.name === "Resources" && (
                                <div className="py-4 pl-4">
                                  <h3 className="text-lg font-medium mb-4">Resources</h3>
                                  <div className="space-y-6">
                                    {resourcesItems.map((item, index) => (
                                      <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="flex gap-3"
                                      >
                                        <div className="text-sky-500">{item.icon}</div>
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-medium">{item.title}</h4>
                                            {item.isNew && (
                                              <span className="text-xs bg-sky-100 text-sky-500 px-2 py-0.5 rounded-full">
                                                New
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={item.href} className=" block py-2 text-lg font-medium">
                  {item.name}
                  </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 space-y-4">
                  
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 text-sky-500 border border-sky-700 rounded-md hover:bg-[#d8f999] transition"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/community/feed"
                    className="block w-full text-center py-3 text-white bg-sky-500 rounded-md hover:bg-[#c2185b] transition"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;