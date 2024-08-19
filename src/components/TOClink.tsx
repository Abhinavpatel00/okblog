'use client'

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
        'block py-1 px-2 rounded-md transition-colors duration-200',
        'font-medium',
        'focus:outline-none focus-visible:ring-2 ring-blue-500',
        activeSection === id
          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-800'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
      )}
      style={{ marginLeft: Math.max((level - minLevel) * 16, 0) }}
      scroll
    >
      {text}
    </UnstyledLink>
  );
}
