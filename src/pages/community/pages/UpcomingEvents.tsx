import type React from "react"
import { Calendar } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  month: string
  day: string
  description: string
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Weekly Q&A: Building healthy habits",
    date: "Feb 7th @ 8am (EST)",
    month: "FEB",
    day: "7",
    description: "Join us for a weekly Q&A session on building and maintaining healthy habits.",
  },
  {
    id: 2,
    title: "Mindfulness w/ surprise special guest",
    date: "Feb 9th @ 7pm (EST)",
    month: "FEB",
    day: "9",
    description: "A special mindfulness session with a surprise guest instructor.",
  },
  {
    id: 3,
    title: "Weekly Coaching Session Live call",
    date: "Feb 14th @ 6pm (EST)",
    month: "FEB",
    day: "14",
    description: "Join our weekly coaching call to get personalized advice and support.",
  },
  {
    id: 4,
    title: "Foundations of healthy sustainable relationships",
    date: "Feb 21st @ 7pm (EST)",
    month: "FEB",
    day: "21",
    description: "Learn the foundations of building healthy and sustainable relationships.",
  },
]

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-white sticky top-0 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Upcoming events</h2>
      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-start">
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded p-2 mr-3 w-12 text-center">
              <span className="text-xs text-gray-500">{event.month}</span>
              <span className="text-lg font-bold">{event.day}</span>
            </div>
            <div>
              <h3 className="font-medium text-sm">{event.title}</h3>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 flex items-center justify-center">
        <Calendar size={16} className="mr-2" />
        <span>View all events</span>
      </button>
    </div>
  )
}

export default UpcomingEvents
