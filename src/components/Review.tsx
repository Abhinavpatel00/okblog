import { useState } from 'react';

const emojis = [
  { label: 'Very Dissatisfied', symbol: '😡' },
  { label: 'Dissatisfied', symbol: '😠' },
  { label: 'Neutral', symbol: '😐' },
  { label: 'Satisfied', symbol: '😊' },
  { label: 'Very Satisfied', symbol: '😍' }
];

export default function ResponsiveEmojiRating() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleEmojiClick = (index: any) => {
    setSelectedRating(index);
    setFeedbackMessage(`You rated us ${emojis[index].label} ${emojis[index].symbol}`);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000); // Feedback message disappears after 3 seconds
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-8 max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Rate Us</h2>
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            onClick={() => handleEmojiClick(index)}
            className={`text-4xl md:text-6xl cursor-pointer transition-transform transform-gpu ${
              selectedRating === index ? 'scale-150 text-yellow-500' : 'text-gray-700'
            } hover:scale-125 hover:rotate-12 hover:transition-transform hover:duration-300`}
            aria-label={emoji.label}
          >
            {emoji.symbol}
          </div>
        ))}
      </div>
      {feedbackMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md animate-pulse text-center">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}
