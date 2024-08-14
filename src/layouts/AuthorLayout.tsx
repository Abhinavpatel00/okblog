import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { FaTelegram } from 'react-icons/fa'
import Link from 'next/link'

interface Props {
  children: ReactNode ;
  frontMatter: AuthorFrontMatter ;
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company, email,  } = frontMatter

  return (
    <>
     <PageSEO title={`About - ${name}`} description={`About Me - ${name}`} />
       <div>
         <div className="space-y-2 pt-6 pb-8 md:space-y-5">
           <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14" >
             Про "неЯкісний"
           </h1>
         </div>
         <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
           <div className="flex flex-col items-center space-x-2 pt-8">
             <Image
               src={avatar}
               alt="{'${name}'s{Avatar}'}"
               width="192px"
               height="192px"
               className="h-48 w-48 rounded-full"
             />
             <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
             <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
             <div className="text-gray-500 dark:text-gray-400">{company}</div>
             <div className="flex space-x-3 pt-6">
               <Link href="https://t.me/NEYAKISNYY"
       className="text-gray-600 hover:text-gray-800" target="_blank" rel="noopener">       <FaTelegram color="#63D471" className="h-6 w-6" style={{width: "60px", height: "60px"}} />
      
    </Link>
             </div>
           </div>
           <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
         </div>
       </div>
     </>
   );
}
