import { Heart, MessageSquare, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        content: string;
        author: {
            name: string;
            avatar: string;
            date: string;
        };
        likedBy: string[];
        comments: { id: number; text: string }[];
    };
    onOpenComments: (postId: number) => void; // Add this prop
  }
  
  const PostCard: React.FC<PostCardProps> = ({ post, onOpenComments }) => {
    const [liked, setLiked] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);
  
    const toggleLike = () => {
      setLiked(!liked);
    };
  
    const truncatedContent =
      post.content.length > 300 && !showFullContent
        ? post.content.substring(0, 300) + '...'
        : post.content;
  
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <div
                className="h-10 w-10 rounded-full  bg-black  bg-cover bg-center mr-3"
                style={{ backgroundImage: `url(${post.author.avatar})` }}
              ></div>
              <div>
                <h3 className="font-medium">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.author.date}</p>
              </div>
            </div>
            <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
              <MoreHorizontal size={20} />
            </button>
          </div>
  
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <div className="text-gray-700 mb-3">
            <p>{truncatedContent}</p>
            {post.content.length > 300 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-lime-600 hover:text-lime-700 text-sm font-medium mt-1"
              >
                {showFullContent ? 'See less' : 'See more'}
              </button>
            )}
          </div>
  
          <div className="text-sm text-lime-800 mb-3">
            Liked by {post.likedBy[0]} {post.likedBy[1]}
          </div>
  
          <div className="border-t pt-3 flex items-center space-x-4">
            <button
              onClick={toggleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                liked ? 'text-lime-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} className={liked ? 'fill-lime-600' : ''} />
              <span>Like</span>
            </button>
  
            <button
              onClick={() => onOpenComments(post.id)} // Call the onOpenComments prop
              className="flex items-center space-x-1 px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <MessageSquare size={18} />
              <span>Comment</span>
            </button>
          </div>
        </div>
  
        <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500">
          {post.comments.length} comments
        </div>
      </div>
    );
  };
  
  export default PostCard;