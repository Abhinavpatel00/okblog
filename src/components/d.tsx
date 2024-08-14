import { usePostDislikes } from "@/lib/upd"; // Import the new hook for dislikes
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import cx from "clsx";
import React from "react";

const emojis = ["👍", "🙏", "🥰"];

export default function DislikeButton({ slug }: { slug: string }) {
  const { currentUserDislikes, dislikes, isLoading, increment } = usePostDislikes(slug);

  let [animatedEmojis, setAnimatedEmojis] = React.useState<string[]>(currentUserDislikes ? [emojis[currentUserDislikes]] : []);

  const handleClick = () => {
    increment();
    if (currentUserDislikes && currentUserDislikes <= 2) {
      setAnimatedEmojis([...animatedEmojis, emojis[currentUserDislikes]]);
    }
  };

  return (
    <div className="flex items-center space-x-2 text-rose-900/90 dark:text-rose-100/90">
      {/* Dislikes counter text */}
      <div className="text-lg font-medium leading-none">
        {isLoading ? null : <span>Dislikes: {dislikes}</span>}
        </div>
      <div className="relative ">
        {/* Thank you emojis */}
        {animatedEmojis.map((emoji, index) => {
          return (
            <div
              key={index}
              className="absolute w-full animate-[emoji_0.75s_ease-out] text-center opacity-0"
            >
              {emoji}
            </div>
          )
        })}

        <button
          className={cx(
            "shadow-lgx group relative block transform overflow-hidden rounded-lg bg-gradient-to-tl from-dark/5 to-dark/30 dark:from-white/5 dark:to-white/30 p-1 transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg",
            "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 dark:focus-visible:ring-rose-500/70",
            {
              "animate-pulse": isLoading,
              "hover:shadow-gray-500/30": currentUserDislikes === 0,
              "hover:shadow-purple-500/50": currentUserDislikes !== 0,
            },
          )}
          onClick={handleClick}
        >
          <div
            className={cx(
              "absolute inset-0 transform-gpu bg-gradient-to-tl from-purple-500 to-rose-400 transition-transform",
              {
                "translate-y-8": currentUserDislikes === 0,
                "translate-y-5": currentUserDislikes === 1,
                "translate-y-3": currentUserDislikes === 2,
              },
            )}
          />

          <HeartIcon className="relative w-5 transform text-red-900 dark:text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
        </button>
      </div>
      {/* Dislike counter text */}
      <div className="text-lg font-medium leading-none">
        {isLoading ? null : <span>{currentUserDislikes}</span>}
      </div>
    </div>
  );
}
