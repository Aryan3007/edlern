import React, { useState } from 'react';
import { Search, Filter, Grid, List, X } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  location: string;
  tags: string[];
  activityScore: number;
  avatar: string;
}

const initialMembers: Member[] = [
  {
    id: 1,
    name: 'Isabel Rodriguez',
    role: 'Environmental Scientist',
    location: 'Barcelona, Spain',
    tags: ['meditation', 'yoga', 'nature'],
    activityScore: 85,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 2,
    name: 'Kian Parks',
    role: 'Content Creator',
    location: 'New York, USA',
    tags: ['mindfulness', 'productivity', 'creativity'],
    activityScore: 92,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 3,
    name: 'Olivia Martinez',
    role: 'Yoga Teacher',
    location: 'Los Angeles, USA',
    tags: ['yoga', 'meditation', 'wellness'],
    activityScore: 78,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 4,
    name: 'Zoe Patel',
    role: 'Digital Marketing Specialist',
    location: 'London, UK',
    tags: ['mindfulness', 'marketing', 'social media'],
    activityScore: 88,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 5,
    name: 'Arlene McCoy',
    role: 'Web Designer',
    location: 'Berlin, Germany',
    tags: ['design', 'creativity', 'mindfulness'],
    activityScore: 76,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 6,
    name: 'Eleanor Pena',
    role: 'Web Designer',
    location: 'Paris, France',
    tags: ['design', 'art', 'meditation'],
    activityScore: 82,
    avatar: '/placeholder.jpg?height=200&width=200'
  },
  {
    id: 7,
    name: 'Theresa Webb',
    role: 'Web Designer',
    location: 'Tokyo, Japan',
    tags: ['design', 'mindfulness', 'productivity'],
    activityScore: 79,
    avatar: '/placeholder.jpg?height=200&width=200'
  }
];

const MembersPage: React.FC = () => {
  const [members] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<{
    role: string | null;
    location: string | null;
    tag: string | null;
  }>({
    role: null,
    location: null,
    tag: null
  });
  
  const filteredMembers = members.filter(member => {
    // Search filter
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Role filter
    if (filters.role && member.role !== filters.role) {
      return false;
    }
    
    // Location filter
    if (filters.location && !member.location.includes(filters.location)) {
      return false;
    }
    
    // Tag filter
    if (filters.tag && !member.tags.includes(filters.tag)) {
      return false;
    }
    
    return true;
  });
  
  const addFilter = (type: 'role' | 'location' | 'tag', value: string) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };
  
  const removeFilter = (type: 'role' | 'location' | 'tag') => {
    setFilters({
      ...filters,
      [type]: null
    });
  };
  
  const clearAllFilters = () => {
    setFilters({
      role: null,
      location: null,
      tag: null
    });
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-lime-100 text-lime-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-lime-100 text-lime-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <List size={20} />
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="px-3 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
              Private
            </button>
          </div>
        </div>
      </div>
      
      {/* Active filters */}
      {(filters.role || filters.location || filters.tag) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Filters:</span>
          
          {filters.role && (
            <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
              <span>Role: {filters.role}</span>
              <button 
                onClick={() => removeFilter('role')}
                className="ml-2 text-lime-700 hover:text-lime-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {filters.location && (
            <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
              <span>Location: {filters.location}</span>
              <button 
                onClick={() => removeFilter('location')}
                className="ml-2 text-lime-700 hover:text-lime-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {filters.tag && (
            <div className="flex items-center bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm">
              <span>Tag: {filters.tag}</span>
              <button 
                onClick={() => removeFilter('tag')}
                className="ml-2 text-lime-700 hover:text-lime-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <button 
            onClick={clearAllFilters}
            className="text-sm text-lime-600 hover:text-lime-800"
          >
            Clear all
          </button>
        </div>
      )}
      
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">{filteredMembers.length} members</div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sort:</span>
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-lime-500">
            <option>Newest</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Activity</option>
          </select>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${member.avatar})` }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.tags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => addFilter('tag', tag)}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${member.avatar})` }}></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => addFilter('role', member.role)}
                      className="text-sm text-gray-900 hover:text-lime-600"
                    >
                      {member.role}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => addFilter('location', member.location.split(',')[1].trim())}
                      className="text-sm text-gray-500 hover:text-lime-600"
                    >
                      {member.location}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {member.tags.map(tag => (
                        <button 
                          key={tag}
                          onClick={() => addFilter('tag', tag)}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs hover:bg-gray-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-lime-600 h-2 rounded-full" 
                          style={{ width: `${member.activityScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{member.activityScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
