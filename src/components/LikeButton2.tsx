import { usePostLikes } from "@/lib/usePostLikes";
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import React from "react";
import cx from "clsx";

const emojis = ["👍", "🙏", "🥰"];

export default function LikeButton({ slug }: { slug: string }) {
  const { currentUserLikes, likes, isLoading, increment } = usePostLikes(slug);

  let [animatedEmojis, setAnimatedEmojis] = React.useState<string[]>(
    currentUserLikes ? [emojis[currentUserLikes]] : []
  );

  const handleClick = () => {
    increment();
    if (currentUserLikes && currentUserLikes <= 2) {
      setAnimatedEmojis([...animatedEmojis, emojis[currentUserLikes]]);
    }
  };

  return (
    <div className="flex items-center space-x-2 text-rose-900/90 dark:text-rose-100/90">
      <div className="text-lg font-medium leading-none">
        {isLoading ? null : <span>Likes: {likes}</span>}
      </div>
      <div className="relative">
        {/* Thank you emojis */}
        <div className="flex space-x-1 absolute bottom-2 animate-[emoji_0.75s_ease-out]">
          {animatedEmojis.map((emoji, index) => (
            <div key={index} className="opacity-0">
              {emoji}
            </div>
          ))}
        </div>

        <button
          className={cx(
            "shadow-lgx group relative block transform overflow-hidden rounded-lg bg-gradient-to-tl from-purple-500 to-rose-400 dark:from-purple-800 dark:to-rose-700 p-1 transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg",
            "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 dark:focus-visible:ring-rose-500/70",
            {
              "animate-pulse": isLoading,
              "hover:shadow-gray-500/30": currentUserLikes === 0,
              "hover:shadow-purple-500/50": currentUserLikes !== 0,
            }
          )}
          onClick={handleClick}
        >
          <div
            className={cx(
              "absolute inset-0 transform-gpu bg-gradient-to-tl from-purple-500 to-rose-400 dark:from-purple-800 dark:to-rose-700 transition-transform",
              {
                "translate-y-8": currentUserLikes === 0,
                "translate-y-5": currentUserLikes === 1,
                "translate-y-3": currentUserLikes === 2,
              }
            )}
          />

          <HeartIcon className="relative w-5 transform text-red-900 dark:text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-lg font-medium leading-none">
        {isLoading ? null : <span>{currentUserLikes}</span>}
      </div>
    </div>
  );
}
