import React, { useRef, useEffect, useState } from 'react';
import { Search, X, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:pt-24">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center border-b p-4">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for anything..."
            className="flex-1 outline-none text-lg"
          />
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {searchQuery ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Members</h3>
                <div className="space-y-2">
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center mr-3" style={{ backgroundImage: `url('/placeholder.svg?height=40&width=40')` }}></div>
                    <div>
                      <p className="font-medium">Jasmine Turner</p>
                      <p className="text-sm text-gray-500">Graphic Designer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Courses</h3>
                <div className="space-y-2">
                  <div className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="h-10 w-10 rounded-md bg-lime-100 flex items-center justify-center mr-3">
                      <BookOpen size={20} className="text-lime-600" />
                    </div>
                    <div>
                      <p className="font-medium">Meditation Mastery</p>
                      <p className="text-sm text-gray-500">15 lessons</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Discussions</h3>
                <div className="space-y-2">
                  <div className="flex items-start p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center mr-3 mt-1" style={{ backgroundImage: `url('/placeholder.svg?height=40&width=40')` }}></div>
                    <div>
                      <p className="font-medium">Embracing the Journey: My Mindfulness Path</p>
                      <p className="text-sm text-gray-500">Posted by Jasmine Turner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Search the community</h3>
              <p className="text-gray-500">Find members, posts, courses, and more</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
