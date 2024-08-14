

import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react'
import Link from 'next/link'
import headerNavLinks from '@/data/headerNavLinks'
import dropdownLinks from '@/data/dropdownlinks'
import Logo from '@/data/logo.svg'
import ThemeSwitch from './ThemeSwitch';
const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);

  const onToggleDropdown = () => {
    setDropdownShow((status) => !status);
  };


  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
        // document.body.style.overflowX = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div className={`fixed top-0 right-0 h-screen w-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out transform ${navShow ? 'translate-y-0' : '-inset-full -translate-y-full '}`}>
  <button
    type="button"
    aria-label="toggle modal"
    className="fixed h-full w-full cursor-auto focus:outline-none"
    onClick={onToggleNav}
  ></button>
  <nav className="fixed top-0 left-1/2 transform -translate-x-1/2  px-6">
  <div className="flex items-center justify-center mt-0">
  <Logo className="h-12 mb-4 " />
</div>

    <ul className="flex flex-col items-center  justify-center space-y-4" style={{ height: 'calc(100% - 6rem)' }}>
      <Link
        href="/"
        className="text-2xl mt-12 font-medium link text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-300 text-center py-2 px-4 rounded-md bg-white dark:bg-gray-800 shadow-md"
        onClick={onToggleNav}
      >
        На головну 
      </Link>
      {headerNavLinks.map((link) => (
        <li key={link.title}>
          <Link
            href={link.href}
            className="text-2xl font-medium text-gray-900 dark:text-white text-center py-2 px-4 link rounded-md bg-white dark:bg-gray-800 shadow-md hover:text-blue-500 transition-colors duration-300"
            onClick={onToggleNav}
          >
            {link.title}
          </Link>
        </li>
      ))}
      <li>
        <button
          className="flex items-center text-2xl link font-medium text-gray-900 dark:text-white hover:text-blue-500 transition-colors duration-300 focus:outline-none"
          onClick={onToggleDropdown}
        >
          Categories <FaChevronDown className="ml-1" />
        </button>
        {dropdownShow && (
          <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {dropdownLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block px-20 py-3 text-gray-900 dark:text-white text-base hover:bg-blue-500 hover:text-bg-green-900 transition-colors duration-300"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </li>
      <ThemeSwitch />
    </ul>
  </nav>
</div>


    </div>
  );
};

export default MobileNav;
