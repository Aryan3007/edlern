import React from 'react';
import { Search, MessageSquare, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NotificationDrawer from '../comps/NotificationDrawer';
interface HeaderProps {
    onToggleSidebar: () => void;
    onOpenSearch: () => void;
    onCreateCommunity: () => void;
}

const Header: React.FC<HeaderProps> = ({
    onOpenSearch,
    onCreateCommunity
}) => {
    return (
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center">
                {/* <div className="mr-4 md:hidden">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                        aria-label="Toggle sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div> */}

                <div className="hidden md:flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                               
                                <span className="font-semibold flex items-center gap-2 text-gray-800">ModernMind™ <ChevronDown size={16} /></span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem>
                                <Link to="/community/modernmind" className="w-full text-left">
                                    ModernMind™
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/community/techhub" className="w-full text-left">
                                    TechHub
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to="/community/creators" className="w-full text-left">
                                    Creators
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex-1 max-w-2xl mx-4">
                <button
                    onClick={onOpenSearch}
                    className="w-full flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200"
                >
                    <Search size={18} className="mr-2" />
                    <span className="text-sm">Search</span>
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={onCreateCommunity}
                    className="hidden md:flex items-center px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                >
                    <Plus size={18} className="mr-2" />
                    <span className="text-sm">New community</span>
                </button>

                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                    <NotificationDrawer/>
                </button>

                <Link to={"/community/chat"} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <MessageSquare size={20} />
                </Link>

                <Link to="/community/profile" className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-black bg-cover bg-center" style={{ backgroundImage: `url('/placeholder.svg?height=32&width=32')` }}></div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
