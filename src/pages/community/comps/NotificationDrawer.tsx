import React, { useState } from "react";
import { Bell, X } from "lucide-react";

interface Notification {
  id: number;
  message: string;
}

const dummyNotifications: Notification[] = [
  { id: 1, message: "New quiz available!" },
  { id: 2, message: "Your task is due tomorrow." },
  { id: 3, message: "You earned a new badge!" },
];

const NotificationDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };


  return (
    <div>
      {/* Bell Icon */}
      <div onClick={toggleDrawer} className="p-1 relative cursor-pointer">
        <Bell className="w-4 h-4" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-lime-500 rounded-full" />
        )}
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={toggleDrawer}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-full">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="relative bg-white border border-lime-200 p-4 rounded-lg shadow hover:shadow-md transition flex items-center"
              >
                <Bell className="w-5 h-5 text-lime-500 mr-3" />
                <p className="text-sm text-gray-800 flex-1">{n.message}</p>
                <button
                  onClick={() => dismissNotification(n.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-lime-600 transition"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/50 bg-opacity-30 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default NotificationDrawer;
