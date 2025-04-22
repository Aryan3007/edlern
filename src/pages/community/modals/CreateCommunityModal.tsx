import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [communityType, setCommunityType] = useState('public');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle community creation logic here
    console.log({
      name: communityName,
      description: communityDescription,
      type: communityType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center p-4">
        <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm  transition-opacity" 
        onClick={onClose}
      ></div>
     
      
      <div className="relative bg-white shadow-2xl p-6 w-full max-w-4xl rounded-lg overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Create New Community</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="community-name" className="block text-sm font-medium text-gray-700 mb-1">
                Community Name
              </label>
              <input
                id="community-name"
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="e.g., Mindfulness Practitioners"
                required
              />
            </div>
            
            <div>
              <label htmlFor="community-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="community-description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="What is this community about?"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Community Type
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="public"
                    type="radio"
                    name="community-type"
                    value="public"
                    checked={communityType === 'public'}
                    onChange={() => setCommunityType('public')}
                    className="h-4 w-4 text-lime-600 focus:ring-lime-500"
                  />
                  <label htmlFor="public" className="ml-2 text-sm text-gray-700">
                    Public - Anyone can view and join
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="private"
                    type="radio"
                    name="community-type"
                    value="private"
                    checked={communityType === 'private'}
                    onChange={() => setCommunityType('private')}
                    className="h-4 w-4 text-lime-600 focus:ring-lime-500"
                  />
                  <label htmlFor="private" className="ml-2 text-sm text-gray-700">
                    Private - Only members can view content
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
            >
              Create Community
            </button>
          </div>
        </form>
      </div>
      </div>
  );
};

export default CreateCommunityModal;
