import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onSendComment: (content: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments, onSendComment }) => {
  const [newComment, setNewComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom of comments when new ones are added
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [comments]);

  if (!isOpen) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSendComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 shadow-2xl w-full max-w-md rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-lime-500">
          <div className="flex items-center text-white">
            <MessageSquare size={18} className="mr-2" />
            <h2 className="font-medium">Comments ({comments.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Comments Section */}
        <div 
          ref={commentsContainerRef}
          className="px-4 py-3 flex-grow overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-gray-300"
        >
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-400 text-center text-sm italic">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Add Comment Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3">
          <form onSubmit={handleSendComment} className="flex space-x-2">
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 resize-none"
              placeholder="Write your comment..."
              rows={2}
              required
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={`self-end p-2 rounded-lg ${
                newComment.trim()
                  ? "bg-gradient-to-r from-purple-600 to-lime-500 text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700"
              } transition-colors`}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;