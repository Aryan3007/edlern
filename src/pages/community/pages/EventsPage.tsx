// src/components/EventsPage.tsx
import { useState } from "react";
import {
  CalendarIcon,
  Filter,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  SlidersHorizontal,
  Tag,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

// Types
type EventStatus = "upcoming" | "past" | "rsvped" | "all";
type EventCategory = "fitness" | "mindset" | "career" | "relationships" | "all";
type ViewMode = "calendar" | "list";
type SortOption = "date-asc" | "date-desc" | "popularity" | "alphabetical";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string; // ISO string (e.g., "2025-05-15T00:00:00.000Z")
  startTime: string;
  endTime: string;
  location: string;
  isVirtual: boolean;
  category: EventCategory;
  attendees: number;
  capacity: number;
  isRSVPed: boolean;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Date Utility Functions
const parseISO = (isoString: string): Date => new Date(isoString);

const isAfter = (date1: Date, date2: Date): boolean =>
  date1.getTime() > date2.getTime();

const isBefore = (date1: Date, date2: Date): boolean =>
  date1.getTime() < date2.getTime();

const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.toDateString() === date2.toDateString();

const format = (date: Date, formatString: string): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (formatString === "EEE, MMM d, yyyy") {
    return `${days[date.getDay()].slice(0, 3)}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  if (formatString === "EEEE, MMMM d, yyyy") {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return date.toISOString();
};

// Mock Data
const generateMockEvents = (): Event[] => {
  const now = new Date();
  const pastEvents: Event[] = Array.from({ length: 15 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 3 + 10));
    const isRSVPed = i % 3 === 0;

    return {
      id: `past-${i}`,
      title: `Past Event ${i + 1}: ${["Fitness Challenge", "Mindset Workshop", "Career Networking", "Relationship Mastery"][i % 4]}`,
      description: `This is a past event that ${isRSVPed ? "you attended" : "happened recently"}. It was focused on personal growth and community building.`,
      image: `/placeholder.svg?height=200&width=400`,
      date: date.toISOString(),
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: ["Virtual Zoom Meeting", "Central Park, NYC", "Community Center", "Online Webinar"][i % 4],
      isVirtual: i % 2 === 0,
      category: ["fitness", "mindset", "career", "relationships"][i % 4] as EventCategory,
      attendees: 50 + i * 5,
      capacity: 100 + i * 5,
      isRSVPed,
      organizer: {
        id: `org-${i % 5}`,
        name: ["James Wilson", "Michael Chen", "Sarah Johnson", "David Lopez", "Emma Thompson"][i % 5],
        avatar: `/placeholder.svg?height=40&width=40`,
      },
    };
  });

  const upcomingEvents: Event[] = Array.from({ length: 20 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() + (i * 2 + 1));
    const isRSVPed = i % 4 === 0;

    return {
      id: `upcoming-${i}`,
      title: `${["Weekly", "Monthly", "Special", "Community"][i % 4]} ${["Fitness Challenge", "Mindset Workshop", "Career Networking", "Relationship Mastery"][i % 4]}`,
      description: `Join us for this exciting ${["fitness challenge", "mindset workshop", "career networking event", "relationship mastery session"][i % 4]} designed to help you grow and connect with others.`,
      image: `/placeholder.svg?height=200&width=400`,
      date: date.toISOString(),
      startTime: ["9:00 AM", "1:00 PM", "6:00 PM", "10:30 AM"][i % 4],
      endTime: ["11:00 AM", "3:00 PM", "8:00 PM", "12:30 PM"][i % 4],
      location: ["Virtual Zoom Meeting", "Central Park, NYC", "Community Center", "Online Webinar"][i % 4],
      isVirtual: i % 2 === 0,
      category: ["fitness", "mindset", "career", "relationships"][i % 4] as EventCategory,
      attendees: 20 + i * 3,
      capacity: 100,
      isRSVPed,
      organizer: {
        id: `org-${i % 5}`,
        name: ["James Wilson", "Michael Chen", "Sarah Johnson", "David Lopez", "Emma Thompson"][i % 5],
        avatar: `/placeholder.svg?height=40&width=40`,
      },
    };
  });

  return [...upcomingEvents, ...pastEvents];
};

const mockEvents: Event[] = generateMockEvents();

// Component
export default function EventsPage() {
  // State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<EventCategory>("all");
  const [statusFilter, setStatusFilter] = useState<EventStatus>("upcoming");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortOption, setSortOption] = useState<SortOption>("date-asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showVirtualOnly, setShowVirtualOnly] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const itemsPerPage = 6;
  const now = new Date();

  // Filter events
  const filteredEvents = mockEvents.filter((event) => {
    const eventDate = parseISO(event.date);

    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (categoryFilter !== "all" && event.category !== categoryFilter) {
      return false;
    }

    if (selectedDate && !isSameDay(eventDate, selectedDate)) {
      return false;
    }

    if (showVirtualOnly && !event.isVirtual) {
      return false;
    }

    switch (statusFilter) {
      case "upcoming":
        return isAfter(eventDate, now) || isSameDay(eventDate, now);
      case "past":
        return isBefore(eventDate, now) && !isSameDay(eventDate, now);
      case "rsvped":
        return event.isRSVPed;
      case "all":
      default:
        return true;
    }
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortOption) {
      case "date-asc":
        return parseISO(a.date).getTime() - parseISO(b.date).getTime();
      case "date-desc":
        return parseISO(b.date).getTime() - parseISO(b.date).getTime();
      case "popularity":
        return b.attendees - a.attendees;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event dates for calendar
  const eventDates = mockEvents.reduce(
    (dates, event) => {
      const date = parseISO(event.date);
      const dateString = date.toDateString();
      dates[dateString] = [...(dates[dateString] || []), event];
      return dates;
    },
    {} as Record<string, Event[]>
  );

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-6 px-2 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Events Calendar
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Discover and join events in the Adonis Gang community
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            className="flex items-center"
            onClick={() => setViewMode("list")}
            aria-label="Switch to list view"
          >
            <LayoutList className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">List</span>
          </Button>
          {/* <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            className="flex items-center"
            onClick={() => setViewMode("calendar")}
            aria-label="Switch to calendar view"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Calendar</span>
          </Button> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">Event Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Refine events by category, status, and more
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium w-24"
                    >
                      Category
                    </label>
                    <Select
                      value={categoryFilter}
                      onValueChange={(value) => {
                        setCategoryFilter(value as EventCategory);
                        handleFilterChange();
                      }}
                    >
                      <SelectTrigger id="category" className="flex-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="mindset">Mindset</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="relationships">Relationships</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="status" className="text-sm font-medium w-24">
                      Status
                    </label>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => {
                        setStatusFilter(value as EventStatus);
                        handleFilterChange();
                      }}
                    >
                      <SelectTrigger id="status" className="flex-1">
                        <SelectValue placeholder="Event status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="upcoming">Upcoming Events</SelectItem>
                        <SelectItem value="past">Past Events</SelectItem>
                        <SelectItem value="rsvped">My RSVPs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-medium w-24">
                      Sort By
                    </label>
                    <Select
                      value={sortOption}
                      onValueChange={(value) => {
                        setSortOption(value as SortOption);
                        handleFilterChange();
                      }}
                    >
                      <SelectTrigger id="sort" className="flex-1">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-asc">Date (Ascending)</SelectItem>
                        <SelectItem value="date-desc">Date (Descending)</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="virtual-only"
                      checked={showVirtualOnly}
                      onCheckedChange={(checked) => {
                        setShowVirtualOnly(checked as boolean);
                        handleFilterChange();
                      }}
                    />
                    <label
                      htmlFor="virtual-only"
                      className="text-sm font-medium"
                    >
                      Virtual events only
                    </label>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setCategoryFilter("all");
                    setStatusFilter("upcoming");
                    setSortOption("date-asc");
                    setShowVirtualOnly(false);
                    setSelectedDate(undefined);
                    setSearchQuery("");
                    handleFilterChange();
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search and Date Picker */}
     
      <div className="mb-6 mx-auto">
        <div className="relative flex items-center ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-10  max-w-xl"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
            aria-label="Search events"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="ml-2"
                size="icon"
                aria-label="Select date"
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  handleFilterChange();
                }}
                className="rounded-md border"
                modifiers={{
                  event: (date) => {
                    const dateString = date.toDateString();
                    return !!eventDates[dateString];
                  },
                }}
                modifiersClassNames={{
                  event: "bg-primary text-primary-foreground font-bold",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* Tabs and Content */}
      <Tabs value={statusFilter} className="mb-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 h-full">
          <TabsTrigger
            value="upcoming"
            onClick={() => {
              setStatusFilter("upcoming");
              handleFilterChange();
            }}
            className="flex items-center justify-center py-2"
            aria-label="Show upcoming events"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Upcoming</span>
          </TabsTrigger>
          <TabsTrigger
            value="past"
            onClick={() => {
              setStatusFilter("past");
              handleFilterChange();
            }}
            className="flex items-center justify-center py-2"
            aria-label="Show past events"
          >
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">Past</span>
          </TabsTrigger>
          <TabsTrigger
            value="rsvped"
            onClick={() => {
              setStatusFilter("rsvped");
              handleFilterChange();
            }}
            className="flex items-center justify-center py-2"
            aria-label="Show my RSVPs"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">My RSVPs</span>
          </TabsTrigger>
          <TabsTrigger
            value="all"
            onClick={() => {
              setStatusFilter("all");
              handleFilterChange();
            }}
            className="flex items-center justify-center py-2"
            aria-label="Show all events"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm">All</span>
          </TabsTrigger>
        </TabsList>

        {/* Content Area with Fixed Height */}
        <div className="min-h-[600px] lg:w-7xl max-w-7xl flex flex-col">
          {paginatedEvents.length === 0 ? (
            <Card className="flex-1 flex items-center justify-center py-12">
              <CardContent className="text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No events found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or check back later for new events.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setCategoryFilter("all");
                    setStatusFilter("upcoming");
                    setSortOption("date-asc");
                    setShowVirtualOnly(false);
                    setSelectedDate(undefined);
                    setSearchQuery("");
                    handleFilterChange();
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex-1">
              {viewMode === "list" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="w-7xl mx-auto">
                  <CardContent className="p-4 sm:p-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        handleFilterChange();
                      }}
                      className="rounded-md border w-full"
                      modifiers={{
                        event: (date) => {
                          const dateString = date.toDateString();
                          return !!eventDates[dateString];
                        },
                      }}
                      modifiersClassNames={{
                        event: "bg-primary text-primary-foreground font-bold",
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && viewMode === "list" && (
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </Tabs>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={(open) => !open && setSelectedEvent(null)}
        >
          <DialogContent className="sm:max-w-[600px] p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {format(parseISO(selectedEvent.date), "EEEE, MMMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>
            <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center text-sm sm:text-base">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </span>
              </div>
              <div className="flex items-center text-sm sm:text-base">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{selectedEvent.location}</span>
                {selectedEvent.isVirtual && (
                  <Badge variant="outline" className="ml-2">
                    Virtual
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm sm:text-base">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <Badge>{selectedEvent.category}</Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">About this event</h4>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {selectedEvent.description}
                </p>
              </div>
              <div className="flex items-center text-sm sm:text-base">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {selectedEvent.attendees} attending / {selectedEvent.capacity} spots
                </span>
              </div>
              <div className="flex items-center text-sm sm:text-base">
                <h4 className="font-semibold mr-2">Organized by:</h4>
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={selectedEvent.organizer.avatar} />
                  <AvatarFallback>
                    {selectedEvent.organizer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedEvent.organizer.name}</span>
              </div>
              <Separator />
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              {isAfter(parseISO(selectedEvent.date), now) ? (
                selectedEvent.isRSVPed ? (
                  <>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel RSVP
                    </Button>
                    <Button className="w-full sm:w-auto">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </>
                ) : (
                  <Button className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    RSVP to Event
                  </Button>
                )
              ) : (
                <div className="w-full text-center text-muted-foreground">
                  This event has already passed
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// EventCard Component
interface EventCardProps {
  event: Event;
  onClick: () => void;
}

function EventCard({ event, onClick }: EventCardProps) {
  const eventDate = parseISO(event.date);
  const isPast = isBefore(eventDate, new Date()) && !isSameDay(eventDate, new Date());

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg pt-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${event.title}`}
    >
      <div className="relative aspect-video">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {event.isVirtual && <Badge variant="secondary">Virtual</Badge>}
          {event.isRSVPed && (
            <Badge variant="default" className="bg-green-600">
              Going
            </Badge>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white">
            <div className="text-sm font-medium">
              {format(eventDate, "EEE, MMM d, yyyy")}
            </div>
            <h3 className="font-bold truncate text-base sm:text-lg">
              {event.title}
            </h3>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {event.startTime} - {event.endTime}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>{event.attendees} attending</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="outline" className="capitalize">
          {event.category}
        </Badge>
        {isPast ? (
          <Badge variant="outline" className="text-muted-foreground">
            Past Event
          </Badge>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            aria-label={event.isRSVPed ? "View event details" : "RSVP to event"}
          >
            {event.isRSVPed ? "View Details" : "RSVP"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}