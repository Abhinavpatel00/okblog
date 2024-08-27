import Link from 'next/link';
import kebabCase from '@/lib/utils/kebabCase';
import categoryData from '@/data/categorymetadata';

const SiteCategory = () => {
  return (
    <div >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Site Categories</h3>
      <ul>
        {Object.keys(categoryData).map((category) => (
          <li key={category} className="mb-2">
            <Link href={`/category/${kebabCase(category)}`} className="tags inline-flex items-center px-3 py-1 border border-gray-400 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              {categoryData[category].title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteCategory;
