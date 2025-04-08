"use client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import CommentBox from "./CommentBox";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Bookmark,
  Share2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ConfessionCard = ({ confession }) => {
  const pathName = usePathname();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(confession.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    // Add your API call here
  };

  const onCommentSubmit = async (commentText, confessionId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_CONFESSION_URL}/add-comment/${confessionId}`,
        {
          text: commentText,
        },
        { withCredentials: true }
      );
      router.refresh();
    } catch (e) {
      console.log(e.response);
      toast.error(e?.response?.data?.message);
    }
  };

  const toggleComments = () => setShowComments(!showComments);
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg  mx-auto max-w-4xl">
      {/* Card Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
            <Image
              src={confession.user?.avatar || "/default-avatar.png"}
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {confession.user?.name.first || "Anonymous"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(confession.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <p
          className={`text-gray-800 dark:text-gray-200 mb-3 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
          onClick={toggleExpand}
        >
          {confession.text}
        </p>
        {confession.text.length > 150 && (
          <button
            onClick={toggleExpand}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-3"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Card Footer */}

      <div className="flex items-center justify-start space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 text-sm ${
            isLiked ? "text-red-700" : "text-gray-500"
          } hover:text-red-700 dark:hover:text-red-700 `}
        >
          <Heart size={18} />
          <span>{confession?.likes?.length || 0}</span>
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <MessageCircle size={18} />
          <span>{confession?.comments?.length || 0}</span>
        </button>
        {pathName === "/user" && (
          <button
            onClick={(e) => handleDelete(confession._id)}
            className="flex items-center space-x-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {showComments && (
        <CommentBox
          comments={confession.comments || []}
          onCommentSubmit={onCommentSubmit}
          confessionId={confession._id}
        />
      )}
    </div>
  );
};

export default ConfessionCard;
