import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Clock, FileText, Play, ChevronRight } from "lucide-react";
import { SERVER_URL } from "@/config/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Types for API responses
interface Course {
  id: number;
  title: string;
  description: string;
  course_type: string;
  course_access_type: string;
  unlock_level: number;
  course_status: string;
  is_published: boolean;
  release_date: string | null;
  created_at: string;
  updated_at: string;
  community: number;
  creator: string;
  is_active: boolean;
  is_deleted: boolean;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  order: number;
  course: number;
  lessons: Lesson[];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_active: boolean;
}

interface Lesson {
  id: number;
  title: string;
  content: string;
  video_url: string;
  order: number;
  release_date: string;
  is_active: boolean;
  is_deleted: boolean;
  module: number;
  resources: Resource[];
  created_at: string;
  updated_at: string;
}

interface Resource {
  id: number;
  name: string;
  type: string;
  file: string | null;
  link: string | null;
  lesson: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
}

interface CourseResponse {
  message: string;
  success: boolean;
  data: Course;
}

export default function YouTubeStyleCourseLayout() {
  const { courseId, community_id } = useParams<{ courseId: string; community_id: string }>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "resources">("description");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Headers with Bearer token
  const getAuthHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return headers;
  };

  // Fetch course data
  const fetchCourse = async () => {
    if (!accessToken) {
      setError("Authentication required. Please log in.");
      return;
    }
    if (!courseId || !community_id) {
      setError("Invalid course or community ID.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${community_id}/courses/${courseId}/`,
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: CourseResponse = await response.json();
      if (data.success) {
        setCourse(data.data);

        // Set the first lesson as the current lesson if available
        const allLessons = data.data.modules.flatMap(module => module.lessons);
        const firstLesson = allLessons[0] || null;
        setCurrentLesson(firstLesson);
      } else {
        throw new Error(data.message || "Failed to fetch course data.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred while fetching the course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [courseId, community_id]);

  useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Find the current module for initial accordion state
  const findCurrentModule = (): string => {
    if (!course || !course.modules || !currentLesson) return "";
    const module = course.modules.find(mod => mod.id === currentLesson.module);
    return module ? module.id.toString() : course.modules[0]?.id.toString() || "";
  };

  // Calculate total lessons
  const totalLessons: number = course?.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;

  // Aggregate all resources from lessons
  const allResources: Resource[] = course?.modules?.flatMap(module => module.lessons.flatMap(lesson => lesson.resources)) || [];

  // Handle lesson navigation
  const handleNextLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.modules
      .flatMap(module => module.lessons)
      .sort((a, b) => a.order - b.order);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1]);
    }
  };

  const handlePreviousLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.modules
      .flatMap(module => module.lessons)
      .sort((a, b) => a.order - b.order);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(allLessons[currentIndex - 1]);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" aria-live="polite">Loading...</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500" aria-live="assertive">
        {error}
      </div>
    );
  }
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite">
        No course data or lessons available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="w-full lg:w-8/12">
            {/* Video Player Container */}
            <div className="w-full rounded-xl mt-4 overflow-hidden bg-black">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={currentLesson.video_url || "/placeholder.svg?height=480&width=854&text=Video+Player"}
                    alt={currentLesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-sky-600/90 hover:bg-sky-600"
                      aria-label="Play video"
                    >
                      <Play className="h-8 w-8 text-sky-600-foreground" fill="currentColor" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info Section */}
            <div className="py-4">
              <h1 className="text-xl md:text-2xl font-bold">{currentLesson.title}</h1>

              <Separator className="my-4" />

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "description" | "resources")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Button variant="outline" size="sm" className="text-xs gap-1">
                          <BookOpen className="h-3 w-3" /> Lesson {currentLesson.order} of {totalLessons}
                        </Button>
                      </div>

                      <div className="text-sm">
                        <p className="mb-4">{currentLesson.content}</p>
                        <p>
                          This is lesson {currentLesson.order} of the {course.title} course.
                        </p>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={handlePreviousLesson}
                          disabled={
                            course.modules
                              .flatMap(module => module.lessons)
                              .sort((a, b) => a.order - b.order)[0]?.id === currentLesson.id
                          }
                          aria-label="Previous lesson"
                        >
                          <ChevronRight className="h-4 w-4 rotate-180" />
                          Previous Lesson
                        </Button>
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={handleNextLesson}
                          disabled={
                            course.modules
                              .flatMap(module => module.lessons)
                              .sort((a, b) => a.order - b.order)
                              .slice(-1)[0]?.id === currentLesson.id
                          }
                          aria-label="Next lesson"
                        >
                          Next Lesson
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      {allResources.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No resources available.</p>
                      ) : (
                        <div className="space-y-3">
                          {allResources.map((resource) => (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-sky-600" />
                                <div>
                                  <div className="font-medium">{resource.name}</div>
                                  <div className="text-xs text-muted-foreground">{resource.type}</div>
                                </div>
                              </div>
                              {resource.file && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => window.open(resource.file, "_blank")}
                                  aria-label={`Download ${resource.name}`}
                                >
                                  <FileText className="h-4 w-4" />
                                  Download
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12 relative">
            <div className={`mt-2 lg:mt-4 ${sidebarOpen || window.innerWidth < 1024 ? "block" : "hidden lg:block"}`}>
              {/* Course Title */}
              {/* <Card className="mb-4">
                <CardContent className="p-4">
                  <h2 className="font-bold">{course.title}</h2>
                </CardContent>
              </Card> */}

              {/* Playlist */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="p-3 bg-secondary/50 flex items-center justify-between">
                  <h3 className="font-medium">Course Playlist</h3>
                  <div className="text-xs text-muted-foreground">{totalLessons} lessons</div>
                </div>

                {/* Course Content Accordion */}
                <Accordion
                  type="single"
                  defaultValue={findCurrentModule()}
                  collapsible
                  className="w-full"
                >
                  {course.modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id.toString()}
                      className="border-b last:border-0"
                    >
                      <AccordionTrigger className="px-3 py-2 hover:bg-secondary/30 text-sm">
                        <div className="text-left">
                          <span>{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-0">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary/30 cursor-pointer transition-colors ${
                                lesson.id === currentLesson.id ? "bg-secondary" : ""
                              }`}
                              onClick={() => setCurrentLesson(lesson)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setCurrentLesson(lesson);
                                }
                              }}
                              aria-label={`Select lesson: ${lesson.title}`}
                            >
                              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                {lesson.id === currentLesson.id ? (
                                  <Play className="h-4 w-4 text-sky-600" fill="currentColor" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{lesson.title}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}