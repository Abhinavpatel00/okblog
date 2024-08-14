import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
  maintitle: string
  title: string
  description: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} className="tags inline-flex items-center px-3 py-1 border border-gray-400 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> 
       {text.split(' ').join('-')}
   
    </Link>
  )
}


export default Tag
