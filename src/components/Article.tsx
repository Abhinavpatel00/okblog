/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';
import { PostFrontMatter } from 'types/PostFrontMatter';

type ArticleProps = PostFrontMatter & {
  className?: string;
};

const Article: React.FC<ArticleProps> = ({ slug, date, title, summary, tags, images, className }) => {
  const src = Array.isArray(images) ? images[0] : images;

  return (
    <article
      className={`rounded-lg shadow-lg overflow-hidden ${className} border border-gray-200 dark:border-gray-700`}
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative">
          {src ? (
            <>
              <img
                alt={title}
                src={src}
                className="w-full h-72 object-cover duration-500 transform scale-100 hover:scale-105 blur-0 grayscale-0"
                decoding="async"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-gray-900 to-transparent">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{title}</h2>
                <div className="flex flex-wrap items-center text-sm text-gray-300">
                  {tags.map((tag) => (
                    <Tag key={tag} text={`${tag}`} maintitle={''} title={''} description={''} />
                  ))}
                  <time dateTime={date} className="ml-2">{formatDate(date)}</time>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-800">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                {tags && tags.map((tag) => (
                  <Tag key={tag} text={`${tag}`} maintitle={''} title={''} description={''} />
                ))}
                <time dateTime={date} className="ml-2">{formatDate(date)}</time>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{summary}</p>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default Article;
