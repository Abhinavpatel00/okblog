import Link from 'next/link';
import { FaTelegram } from 'react-icons/fa';
import MyLogo from './my-logo.svg';

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="absolute inset-0"></div>
      <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center justify-center lg:justify-start">
          <MyLogo className="h-12 w-auto mb-4" />
          <p className="text-center text-sm opacity-80 max-w-xs">
            Статті та доповіді чекають на вас
          </p>
        </div>
        <nav className="flex flex-col items-center justify-center space-y-2 gap-4 lg:space-y-0 lg:flex-row lg:justify-center lg:items-start">
          <Link href="/blog"
             className="text-lg font-bold hover:text-gray-600 transition-colors">Всі публікації
          </Link>
          <Link href="/contact"
             className="text-lg font-bold hover:text-gray-600 transition-colors">Зворотній зв'язок
          </Link>
          <Link href="/about"
             className="text-lg font-bold hover:text-gray-600 transition-colors">Про "Неякісний"
          </Link>
       </nav>
       <div className="mt-8 lg:mt-0 text-center ">

  <p className="text-1xl font-bold justify-center tracking-wide opacity-80">
    &copy; {new Date().getFullYear()} neYakisnyy.com
  </p>
 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
