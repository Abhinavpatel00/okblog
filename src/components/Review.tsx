import { title } from 'process';
import { useState } from 'react';

const emojis = [
  { label: 'Very Dissatisfied', symbol: '😡', title:''},
  { label: 'Dissatisfied', symbol: '😠' },
  { label: 'Neutral', symbol: '😐' },
  { label: 'Satisfied', symbol: '😊' },
  { label: 'Very Satisfied', symbol: '😍' }
];

export default function ResponsiveEmojiRating() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleEmojiClick = (index: number) => {
    setSelectedRating(index);
    setFeedbackMessage(`You rated us ${emojis[index].label} ${emojis[index].symbol}`);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000); // Feedback message disappears after 3 seconds
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-8 max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Rate Us</h2>
      <div className="w-full h-12 rounded-full flex items-center justify-center bg-green-100 border-green-700 border-2 p-2">
        <p className="text_wrapper text-gray-900 text-sm">Was this helpful?</p>
        <div className="flex items-center ml-4 space-x-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiClick(index)}
              className={`text-2xl cursor-pointer transition-transform transform-gpu ${
                selectedRating === index ? 'scale-125 text-yellow-500 filter-none' : 'text-gray-700 grayscale'
              } hover:scale-125 hover:filter-none hover:transition-transform hover:duration-300`}
              aria-label={`Select ${emoji.label} emoji`}
              role="radio"
              aria-checked={selectedRating === index}
              type="button"
              title={emoji.label}
            >
              {emoji.symbol}
            </button>
          ))}
        </div>
      </div>
      {feedbackMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md animate-pulse text-center">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}
