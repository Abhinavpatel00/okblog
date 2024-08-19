'use client'

import * as React from 'react';
import TOCLink from './TOClink';

export type HeadingScrollSpy = Array<{
  id: string;
  level: number;
  text: string;
}>;

type TableOfContentsProps = {
  toc?: HeadingScrollSpy;
  minLevel: number;
};

export default function TableOfContents({
  toc,
  minLevel,
}: TableOfContentsProps) {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = toc?.map(({ id }) => document.getElementById(id)) || [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [toc]);

  return (
    <div
      id='toc-container'
      className='lg:block hidden max-h-[calc(100vh-9rem-113px)] overflow-auto py-4'
    >
      <h3 className='text-gray-900 dark:text-gray-100 text-xl font-semibold mb-4'>
        Table of Contents
      </h3>
      <div className='space-y-1'>
        {toc
          ? toc.map(({ id, level, text }) => (
              <TOCLink
                id={id}
                key={id}
                activeSection={activeSection}
                level={level}
                minLevel={minLevel}
                text={text}
              />
            ))
          : <p className='text-gray-500 dark:text-gray-400'>No content available</p>}
      </div>
    </div>
  );
}
