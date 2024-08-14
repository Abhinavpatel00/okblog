import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleClick = (star: number) => {
    onRatingChange(star);
  };

  const handleMouseEnter = (star: number) => setHoveredStar(star);
  const handleMouseLeave = () => setHoveredStar(null);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          {rating >= star ? (
            <FaStar className="text-yellow-500" />
          ) : hoveredStar >= star ? (
            <FaStarHalfAlt className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
