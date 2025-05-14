import { useState, useMemo, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams } from "react-router-dom";
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
  progress?: number;
  comingSoon?: boolean;
  badgeText?: string;
  featured?: boolean;
  image?: string;
}

interface CoursesResponse {
  message: string;
  success: boolean;
  data: {
    results: Course[];
    count: number;
    limit: number;
    current_page: number;
    total_pages: number;
  };
}

// Number of courses per page
const ITEMS_PER_PAGE = 6;

export default function ClassroomPage() {
  const { community_id } = useParams<{ courseId: string }>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Headers with Bearer token
  const getAuthHeaders = () => {
    const headers: HeadersInit = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    headers["Content-Type"] = "application/json";
    return headers;
  };

  // Fetch all courses
  const fetchCourses = async () => {
    if (!accessToken) {
      setError("No access token available. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${community_id}/courses/`, {
        headers: getAuthHeaders(),
      });
      const data: CoursesResponse = await response.json();
      if (data.success) {
        // Enrich courses with mock data for UI purposes
        const enrichedCourses = data.data.results.map((course, index) => {
          const progress = Math.floor(Math.random() * 100);
          const isComingSoon = index % 5 === 0; // Mock some courses as "Coming Soon"
          const isFeatured = index % 3 === 0; // Mock some courses as "Featured"
          return {
            ...course,
            progress,
            comingSoon: isComingSoon,
            featured: isFeatured,
            badgeText: isComingSoon
              ? "Coming Soon"
              : isFeatured
              ? "Featured"
              : progress === 90
              ? "Almost Complete"
              : index % 4 === 0
              ? "New"
              : index % 6 === 0
              ? "Free"
              : undefined,
            image: `/placeholder.svg?height=200&width=400&text=Course+${index + 1}`,
          };
        });
        setCourses(enrichedCourses);
        setTotalPages(data.data.total_pages);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Apply filters to courses
  const filteredCourses = useMemo(() => {
    switch (currentFilter) {
      case "in-progress":
        return courses.filter(course => course.progress > 0 && course.progress < 100);
      case "completed":
        return courses.filter(course => course.progress === 100);
      case "not-started":
        return courses.filter(course => course.progress === 0 && !course.comingSoon);
      case "coming-soon":
        return courses.filter(course => course.comingSoon);
      default:
        return courses;
    }
  }, [courses, currentFilter]);

  // Calculate pagination
  const totalFilteredPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  // Get current page courses
  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  // Handle pagination navigation
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalFilteredPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="container lg:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mt-4 md:mt-0 w-full md:w-48">
          <Select value={currentFilter} onValueChange={setCurrentFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-gray-400">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 22c-4.418 0-8-1.79-8-4v-9a4 4 0 118 0h4a4 4 0 118 0v9c0 2.21-3.582 4-8 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-gray-500 mt-1">Try changing your filter selection</p>
          <Button 
            className="mt-4" 
            variant="outline" 
            onClick={() => setCurrentFilter("all")}
          >
            View all courses
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden pt-0 flex flex-col h-full border hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent h-32 opacity-50" />
                {course.badgeText && (
                  <Badge className="absolute top-2 right-2 bg-lime-600 hover:bg-lime-700">
                    {course.badgeText}
                  </Badge>
                )}
                {course.comingSoon && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-white opacity-75" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                </div>
                <CardDescription className="text-sm mt-2">{course.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 mt-auto flex flex-col items-start w-full">
                <div className="w-full mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                    {course.progress > 0 && course.progress < 100 && (
                      <span className="text-xs font-medium text-blue-600">In Progress</span>
                    )}
                    {course.progress === 100 && (
                      <span className="text-xs font-medium text-green-600">Completed</span>
                    )}
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <Link to={`${course.id}`} className="w-full">
                  <Button 
                    className="w-full flex items-center justify-center gap-2"
                    variant={course.comingSoon ? "secondary" : "default"}
                    disabled={course.comingSoon}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {course.progress === 100 ? "Review" : 
                     course.progress > 0 ? "Continue" : 
                     course.comingSoon ? "Coming Soon" : "Start Course"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {totalFilteredPages > 1 && (
        <div className="mt-10 flex flex-col items-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    className="cursor-pointer" 
                  />
                </PaginationItem>
              )}
              
              {pageNumbers.map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalFilteredPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    className="cursor-pointer" 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>

          <div className="text-sm text-gray-500 mt-2">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)} of {filteredCourses.length}
          </div>
        </div>
      )}
    </div>
  );
}