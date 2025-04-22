import React, { useState } from 'react';
import UpcomingEvents from './UpcomingEvents';
import PostCard from '../posts/PostCard';
import CommentModal from '../modals/CommentModal';

const postsData = [
  {
    id: 1,
    author: {
      name: 'Jasmine Turner',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'Mar 11th',
    },
    title: 'Embracing the Journey: My Mindfulness Path',
    content: `Hello, everyone! My name is Jasmine Turner, and I've recently embarked on a mindfulness and meditation journey to find peace and balance in my hectic life. As a graphic designer and a mother of two, finding moments of tranquility amidst the business has always been a challenge. I decided to join this wonderful community to deepen my practice and connect with others who share similar goals...`,
    likes: 5,
    comments: [
      { id: 1, author: 'Alice', content: 'This is amazing!', timestamp: '2 hours ago' },
      { id: 2, author: 'Bob', content: 'Thanks for sharing!', timestamp: '1 hour ago' },
    ],
    likedBy: ['Mathilde', 'and 5 others'],
  },
  {
    id: 2,
    author: {
      name: 'John Rose',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'Mar 10th',
    },
    title: 'Stepping Into a World of Calm',
    content: `Hello, everyone! Thrilled to be part of this community, where I aim to nurture my mind and body through meditation. Seeking to elevate my wellbeing and grasp the opportunities life offers. Excited to share insights and learn from the collective wisdom here. I'm genuinely looking forward to embark on this journey of self-discovery and empowerment!`,
    likes: 12,
    comments: [
      { id: 1, author: 'Lisa', content: 'Welcome to the community!', timestamp: '3 hours ago' },
    ],
    likedBy: ['Lisa', 'and 12 others'],
  },
  {
    id: 3,
    author: {
      name: 'Jasmine Turner',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'Mar 11th',
    },
    title: 'Embracing the Journey: My Mindfulness Path',
    content: `Hello, everyone! My name is Jasmine Turner, and I've recently embarked on a mindfulness and meditation journey to find peace and balance in my hectic life. As a graphic designer and a mother of two, finding moments of tranquility amidst the business has always been a challenge. I decided to join this wonderful community to deepen my practice and connect with others who share similar goals...`,
    likes: 5,
    comments: [
      { id: 1, author: 'Alice', content: 'This is amazing!', timestamp: '2 hours ago' },
      { id: 2, author: 'Bob', content: 'Thanks for sharing!', timestamp: '1 hour ago' },
    ],
    likedBy: ['Mathilde', 'and 5 others'],
  },
  {
    id: 4,
    author: {
      name: 'Jasmine Turner',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'Mar 11th',
    },
    title: 'Embracing the Journey: My Mindfulness Path',
    content: `Hello, everyone! My name is Jasmine Turner, and I've recently embarked on a mindfulness and meditation journey to find peace and balance in my hectic life. As a graphic designer and a mother of two, finding moments of tranquility amidst the business has always been a challenge. I decided to join this wonderful community to deepen my practice and connect with others who share similar goals...`,
    likes: 5,
    comments: [
      { id: 1, author: 'Alice', content: 'This is amazing!', timestamp: '2 hours ago' },
      { id: 2, author: 'Bob', content: 'Thanks for sharing!', timestamp: '1 hour ago' },
    ],
    likedBy: ['Mathilde', 'and 5 others'],
  },
];

const CommunityBlog: React.FC = () => {
  const [posts, setPosts] = useState(postsData);
  const [selectedPost, setSelectedPost] = useState<typeof postsData[0] | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleOpenComments = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post || null);
    setIsCommentModalOpen(true);
  };

  const handleSendComment = (content: string) => {
    if (selectedPost) {
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id
          ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                author: 'You', // Replace with the actual user's name
                content,
                timestamp: 'Just now',
              },
            ],
          }
          : post
      );
      setPosts(updatedPosts);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                comments: post.comments.map(({ id, content }) => ({ id, text: content })),
              }}
              onOpenComments={handleOpenComments}
            />
          ))}
        </div>

        <div className="hidden  md:block">
          <div className="mb-6 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Trending posts</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-cover bg-black bg-center mr-3" style={{ backgroundImage: `url('/placeholder.svg?height=40&width=40')` }}></div>
                <div>
                  <h3 className="font-medium text-sm">How to incorporate mindfulness techniques in a thriving business?</h3>
                  <p className="text-xs text-gray-500">Posted by Alexandra Claire</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-cover  bg-black  bg-center mr-3" style={{ backgroundImage: `url('/placeholder.svg?height=40&width=40')` }}></div>
                <div>
                  <h3 className="font-medium text-sm">Has anyone else noticed a surge in inspiration since starting their practice?</h3>
                  <p className="text-xs text-gray-500">Posted by Kian Parks</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-cover  bg-black  bg-center mr-3" style={{ backgroundImage: `url('/placeholder.svg?height=40&width=40')` }}></div>
                <div>
                  <h3 className="font-medium text-sm">How do you juggle daily meditation with a hectic schedule?</h3>
                  <p className="text-xs text-gray-500">Posted by Mia Rose</p>
                </div>
              </div>
            </div>
          </div>
          <UpcomingEvents />


        </div>
      </div>

      {selectedPost && (
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
          comments={selectedPost.comments}
          onSendComment={handleSendComment}
        />
      )}
    </div>
  );
};

export default CommunityBlog;