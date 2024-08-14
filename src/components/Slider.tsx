import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Article {
  id: string;
  title: string;
  date: string;
  // Додайте інші необхідні вам поля статті
}

const LatestArticlesSlider: React.FC = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const articlesDir = path.join(process.cwd(), 'data');
        const articleFiles = fs.readdirSync(articlesDir);

        const articlesData = articleFiles.map((filename) => {
          const filePath = path.join(articlesDir, filename);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(fileContent);
          
          return {
            id: filename.replace(/\.md$/, ''),
            ...data,
          };
        });

        // Сортування статей за датою в зворотньому порядку
        const sortedArticles = articlesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setLatestArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div className="slider-container">
      <h2>Останні статті</h2>
      <div className="slider">
        {latestArticles.map((article) => (
          <div key={article.id} className="slide">
            <Link href={`/articles/${article.id}`}>
              
                <h3>{article.title}</h3>
                <p>{article.date}</p>
          
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesSlider;
