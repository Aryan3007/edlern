import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {  Users, Calendar, BookOpen, MessageSquare, User, ChevronRight, ChevronLeft, Plus, LayoutDashboard, BookText, Compass, AppWindow } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  position: 'left' | 'right';
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  section?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, position }) => {
  // const communityId = '2';
  const mainNavItems: NavItem[] = [
    { title: "Dashboard", path: "/community/dashboard", icon: <LayoutDashboard size={20} />, section:'main' },
    { title: 'Feed', path: '/community/blog', icon: <BookText size={20} />, section: 'main' },
    { title: 'Explore Communities', path: '/community/explore', icon: <Compass size={20} />, section: 'main' },
    { title: 'Members', path: '/community/members', icon: <Users size={20} />, section: 'main' },
    { title: 'Courses', path: '/community/courses', icon: <BookOpen size={20} />, section: 'main' },
    { title: 'Events', path: '/community/events', icon: <Calendar size={20} />, section: 'main' },
    { title: 'Chat', path: '/community/chat', icon: <MessageSquare size={20} />, section: 'main' },
    { title: 'Community Management', path: `/community/manage/2`, icon: <AppWindow size={20}/>, section: 'main' },


  ];

  const getStartedItems: NavItem[] = [
    // { title: 'Start here', path: '/start', icon: <Plus size={20} className="text-lime-500" />, section: 'get-started' },
    { title: 'Introductions', path: '/community/introductions', icon: <Plus size={20} className="text-lime-500" />, section: 'get-started' },
  ]; 
  
  // const communityManagement: NavItem[] = [
  //   // { title: 'Start here', path: '/start', icon: <Plus size={20} className="text-lime-500" />, section: 'get-started' },
  //   { title: 'Overview', path: `/community/manage/:${communityId}`, icon: <LayoutDashboard size={20} className="text-black" />, section: 'comunity-management' },
  //   { title: 'Members', path: `/community/manage/:${communityId}`, icon: <Users size={20} className="text-black" />, section: 'comunity-management'  },
  //   { title: 'Content', path: `/community/manage/:${communityId}`, icon: <MessageSquare size={20} className="text-black" />, section: 'comunity-management' },
  //   { title: 'Events', path: `/community/manage/:${communityId}`, icon: <Calendar size={20} className="text-black" />, section: 'comunity-management'  },
  //   { title: 'Settings', path: `/community/manage/:${communityId}`, icon: <Settings size={20} className="text-black" />, section: 'comunity-management' },
  // ];

  const courseItems: NavItem[] = [
    { title: 'Welcome', path: '/community/welcome', icon: <Plus size={20} className="text-green-500" />, section: 'course' },
    { title: 'Lessons', path: '/community/lessons', icon: <Plus size={20} className="text-green-500" />, section: 'course' },
    { title: 'Live sessions', path: '/community/live-sessions', icon: <Plus size={20} className="text-green-500" />, section: 'course' },
    { title: 'Discussions', path: '/community/discussions', icon: <Plus size={20} className="text-green-500" />, section: 'course' },
  ];

  const membershipItems: NavItem[] = [
    { title: 'Group coaching', path: '/community/group-coaching', icon: <Plus size={20} className="text-blue-500" />, section: 'membership' },
    { title: 'Find a mentor', path: '/community/find-mentor', icon: <Plus size={20} className="text-blue-500" />, section: 'membership' },
    { title: 'Private events', path: '/community/private-events', icon: <Plus size={20} className="text-blue-500" />, section: 'membership' },
  ];

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => 
          `flex items-center text-sm px-2 py-2 my-1 rounded-md transition-colors ${
            isActive 
              ? 'bg-lime-100 text-lime-700' 
              : 'text-gray-700 hover:bg-gray-100'
          } ${collapsed ? 'justify-center' : ''}`
        }
      >
        <span className="flex items-center justify-center">{item.icon}</span>
        {!collapsed && <span className="ml-3">{item.title}</span>}
      </NavLink>
    ));
  };

  const renderSection = (title: string, items: NavItem[]) => {
    return (
      <div className="mb-2 px-2">
        {!collapsed && (
          <h3 className="px-2 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h3>
        )}
        <div>{renderNavItems(items)}</div>
      </div>
    );
  };

  return (
    <div 
      className={`flex flex-col h-full bg-white border-l transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } ${position === 'left' ? 'border-r' : 'border-l'}`}
    >
      {/* Sidebar header with logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <Link to={"/"} className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-lime-600 flex items-center justify-center text-white font-bold">
              ed
            </div>
            <span className="ml-1 font-semibold text-gray-800">Lern™</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {position === 'right' ? 
            (collapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />) :
            (collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)
          }
        </button>
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-4">
        {renderSection('Main', mainNavItems)}
        {/* {renderSection('Community Management', communityManagement)} */}
        {renderSection('Get Started', getStartedItems)}
        {renderSection('Course', courseItems)}
        {renderSection('Membership', membershipItems)}
      </div>

      {/* Sidebar footer */}
      <div className="p-4 border-t">
        <NavLink
          to="/community/profile"
          className={({ isActive }) => 
            `flex items-center px-4 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-lime-100 text-lime-700' 
                : 'text-gray-700 hover:bg-gray-100'
            } ${collapsed ? 'justify-center' : ''}`
          }
        >
          <User size={20} />
          {!collapsed && <span className="ml-3">Profile</span>}
        </NavLink>
        <div className="mt-4 flex items-center px-4">
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-500">420 members online</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
