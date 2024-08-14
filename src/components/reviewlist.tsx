import React from 'react';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: string;
  rating: number;
  createdAt: string;
}

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  const calculateAverageRating = (reviews: Review[]) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
  };

  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
      <div className="mb-4 flex items-center">
        <span className="text-xl font-semibold mr-2">{averageRating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`text-yellow-500 ${averageRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Ratings</h3>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="border p-2 rounded-md dark:border-gray-700">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-yellow-500 ${review.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
