import type { NextApiRequest, NextApiResponse } from 'next';

const reviews = [
  // Example reviews
  { id: '1', rating: 5, createdAt: new Date().toISOString() },
  { id: '2', rating: 4, createdAt: new Date().toISOString() },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const newReview = req.body;
    newReview.id = Date.now().toString();
    newReview.createdAt = new Date().toISOString();
    reviews.push(newReview);
    res.status(201).json(newReview);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
