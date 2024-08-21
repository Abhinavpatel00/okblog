'use client';

import clsx from 'clsx';
import * as React from 'react';

import UnstyledLink from './UnstyledLink';

type TOCLinkProps = {
  id: string;
  level: number;
  minLevel: number;
  text: string;
  activeSection: string | null;
};

export default function TOCLink({
  id,
  level,
  minLevel,
  text,
  activeSection,
}: TOCLinkProps) {
  return (
    <UnstyledLink
      href={`#${id}`}
      id={`link-${id}`}
      className={clsx(
        'block py-1 px-2 rounded-md transition-all duration-200',
        'font-medium',
        'focus:outline-none focus-visible:ring-2 ring-[#31da63] shadow-sm',
        activeSection === id
          ? 'text-black bg-[#31da63] dark:text-#31da63 dark:bg-[#31da63]'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
      )}
      style={{ marginLeft: Math.max((level - minLevel) * 16, 0) }}
      scroll
    >
      {text}
    </UnstyledLink>
  );
}
