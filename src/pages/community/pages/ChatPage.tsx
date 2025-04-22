import React, { useState } from 'react';
import { Send, Smile, ImageIcon, Paperclip } from 'lucide-react';

interface Message {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    user: {
      name: 'Alexandra Claire',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    text: "Hey everyone! I've been thinking a lot about how mindfulness has changed the way I approach my content creation. It's like I can better tap into my creative flow and manage the stress of deadlines. Anyone else found mindfulness to be a game changer for their work?",
    time: '1:55 PM'
  },
  {
    id: 2,
    user: {
      name: 'Mia Rose',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    text: "Absolutely, Alex! Since I started integrating short meditation breaks into my workflow, I've noticed a significant decrease in my anxiety levels. It's like those little pauses help reset my brain and give me a fresh perspective on my projects.",
    time: '1:58 PM'
  },
  {
    id: 3,
    user: {
      name: 'Naveen Arjun',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    text: "That's so true, Mia. I've also found that practicing mindfulness has improved my ability to handle feedback and criticism. Instead of immediately reacting, I can approach it with a calm mind and see it as an opportunity to grow. It's really transformed the way I interact with my audience and collaborators.",
    time: '2:07 PM'
  },
  {
    id: 4,
    user: {
      name: 'John Rose',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    text: "I couldn't agree more! Mindfulness has helped me become more aware of my thought patterns, especially the self-critical ones that used to hold me back. Now, I find it easier to move past those blocks and stay more focused and productive.",
    time: '2:04 PM'
  },
  {
    id: 5,
    user: {
      name: 'Tara Nia',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    text: "And let's not forget about the impact on creativity! Mindfulness has opened up a whole new dimension for me in terms of creative thinking.",
    time: '2:12 PM'
  }
];

const onlineUsers: User[] = [
  {
    id: 1,
    name: 'John Rose',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online'
  },
  {
    id: 2,
    name: 'Kian Parks',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online'
  },
  {
    id: 3,
    name: 'Alexandra Claire',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online'
  },
  {
    id: 4,
    name: 'Naveen Arjun',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online'
  },
  {
    id: 5,
    name: 'Calvin Parks',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online'
  }
];

const offlineUsers: User[] = [
  {
    id: 6,
    name: 'Eli Parks',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'offline',
    lastSeen: '3h ago'
  },
  {
    id: 7,
    name: 'Luca Samuels',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'offline',
    lastSeen: '1d ago'
  }
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      user: {
        name: 'You',
        avatar: '/placeholder.svg?height=40&width=40'
      },
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex-1 gap-2 flex overflow-hidden">
        <div className="flex-1 rounded-2xl overflow-hidden border bg-white flex flex-col">
          <div className="bg-white border-b p-4">
            <h1 className="text-xl font-semibold">Discussions</h1>
            <p className="text-sm text-gray-500">
              In this space we chat about mindfulness for content creators. Communicate, share ideas, ask questions, and support each other.
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-cover bg-black bg-center mr-3" style={{ backgroundImage: `url(${message.user.avatar})` }}></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{message.user.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white border-t p-4">
            <form onSubmit={handleSendMessage} className="flex lg:flex-row flex-col lg:items-center items-start">
              <div className="flex items-center space-x-2 mr-3">
                <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <Smile size={20} />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <ImageIcon size={20} />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <Paperclip size={20} />
                </button>
              </div>
                <div className="flex items-center w-full gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message First Class Chat"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-lime-600 text-white rounded-full hover:bg-lime-700"
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
                </div>
            </form>
          </div>
        </div>
        
        <div className="hidden rounded-2xl lg:block w-64 border bg-white">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Members</h2>
            <div className="text-sm text-gray-500">420 members</div>
          </div>
          
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">ONLINE</h3>
            <div className="space-y-3">
              {onlineUsers.map(user => (
                <div key={user.id} className="flex items-center">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-cover bg-black bg-center" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                    <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white"></div>
                  </div>
                  <span className="ml-2 text-sm">{user.name}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-xs font-semibold text-gray-500 uppercase mt-4 mb-2">OFFLINE</h3>
            <div className="space-y-3">
              {offlineUsers.map(user => (
                <div key={user.id} className="flex items-center">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-cover bg-black bg-center" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                  </div>
                  <div className="ml-2">
                    <div className="text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.lastSeen}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
