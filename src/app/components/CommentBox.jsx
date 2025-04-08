"use client";
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import Image from "next/image";

const CommentBox = ({ comments = [], onCommentSubmit,confessionId}) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    try {
        console.log(confessionId);
      await onCommentSubmit(commentText,confessionId);
      
    } finally {
      setIsSubmitting(false);
      setCommentText("");
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-start gap-3 mb-4 px-4"
      >
        <div className="flex-shrink-0">
          <div className="relative h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
            <Image
              src={"/next.svg"}
              alt="Your avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !commentText.trim()}
            className="p-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3 px-4 pb-2 max-h-60 overflow-y-auto scrollbar-width-non">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="relative h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <Image
                    src={"/next.svg"}
                    alt={`${comment.user?.name || "Anonymous"} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.user?.name?.first|| "Anonymous"}
                  </h4>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                    {comment.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
