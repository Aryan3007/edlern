import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  host: string;
  image: string;
  isLive: boolean;
  isRSVP: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Mindful Mornings - Sunrise Meditation Series',
    description: 'Join us for a transformative series of early morning meditation sessions designed to start your day with peace and intention. We invite you to connect with the tranquil energy of dawn and set positive intentions for the day ahead.',
    date: 'Saturday, Feb 2nd',
    time: '8am (EST)',
    location: 'Online',
    attendees: 42,
    host: 'Mathilde Leo',
    image: 'https://images.unsplash.com/photo-1744472920649-e8709305723f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isLive: false,
    isRSVP: true
  },
  {
    id: 2,
    title: 'Nature Connection - Mindful Walking and Eco-Mindfulness',
    description: 'Experience the healing power of nature through mindful walking and eco-mindfulness practices. This session will guide you through techniques to deepen your connection with the natural world while cultivating present-moment awareness.',
    date: 'Wednesday, Feb 5th',
    time: '6:00 pm (EST)',
    location: 'Central Park, New York',
    attendees: 18,
    host: 'Kian Parks',
    image: 'https://images.unsplash.com/photo-1744472920649-e8709305723f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isLive: false,
    isRSVP: false
  },
  {
    id: 3,
    title: 'Mindfulness for Creativity - Unlocking Your Creative Potential',
    description: 'Discover how mindfulness practices can enhance your creative process and help you overcome creative blocks. This workshop combines meditation techniques with creative exercises to help you access your innate creative wisdom.',
    date: 'Monday, Feb 10th',
    time: '7:00 pm (EST)',
    location: 'Online',
    attendees: 35,
    host: 'Alexandra Claire',
    image: 'https://images.unsplash.com/photo-1744472920649-e8709305723f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isLive: false,
    isRSVP: true
  },
  {
    id: 4,
    title: 'Mindful Leadership Summit',
    description: 'A full-day virtual summit exploring how mindfulness can transform leadership. Featuring keynote speakers, panel discussions, and practical workshops on integrating mindfulness into leadership practices.',
    date: 'Saturday, Feb 17th',
    time: '9:00 am - 5:00 pm (EST)',
    location: 'Online',
    attendees: 120,
    host: 'John Rose',
    image: 'https://images.unsplash.com/photo-1744472920649-e8709305723f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isLive: false,
    isRSVP: true
  }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EventsPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(1); // February (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && today.getDate() === day;
      const hasEvent = events.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && eventDate.getMonth() === currentMonth;
      });
      
      days.push(
        <div 
          key={day} 
          className={`h-12 flex flex-col items-center justify-center rounded-full cursor-pointer relative ${
            isToday ? 'bg-lime-100 text-lime-700 font-semibold' : 
            hasEvent ? 'hover:bg-gray-100' : ''
          }`}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-lime-500"></div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="max-w-7xl mx-auto">      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Next event</h2>
            
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={events[0].image || "/placeholder.jpg"} 
                alt={events[0].title}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-1">{events[0].title}</h3>
            <p className="text-gray-500 mb-4">{events[0].date} @ {events[0].time}</p>
            
            <p className="text-gray-700 mb-4">{events[0].description}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-gray-500">
                <Clock size={18} className="mr-1" />
                <span>{events[0].time}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin size={18} className="mr-1" />
                <span>{events[0].location}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users size={18} className="mr-1" />
                <span>{events[0].attendees} attendees</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Starts in 3 days
              </div>
              <button className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
                RSVP
              </button>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold">February 2024</h2>
          
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="p-4 md:w-2/3 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/jpg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-500 mb-2">{event.date} @ {event.time}</p>
                    <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm">{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      {event.isLive ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                          Live stream
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Calendar size={14} className="mr-1" />
                          Live stream
                        </span>
                      )}
                    </div>
                    <button className={`px-4 py-2 rounded-md ${
                      event.isRSVP 
                        ? 'bg-lime-600 text-white hover:bg-lime-700' 
                        : 'border border-lime-600 text-lime-600 hover:bg-lime-50'
                    }`}>
                      {event.isRSVP ? 'RSVP' : 'Going'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{months[currentMonth]} {currentYear}</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={prevMonth}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center text-gray-500 text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>
          <div className='sticky top-0 z-10'>

       
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Create an event</h2>
            <p className="text-gray-500 mb-4">Share your knowledge with the community by hosting a live session or workshop.</p>
            <button className="w-full py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
              Create event
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow mt-4 p-4">
            <h2 className="text-lg font-semibold mb-4">Event categories</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Meditation</span>
                <span className="text-sm text-gray-500">12 events</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mindfulness</span>
                <span className="text-sm text-gray-500">8 events</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Yoga</span>
                <span className="text-sm text-gray-500">5 events</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Workshops</span>
                <span className="text-sm text-gray-500">3 events</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Q&A Sessions</span>
                <span className="text-sm text-gray-500">2 events</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
