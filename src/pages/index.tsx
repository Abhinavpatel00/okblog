import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

import Article from '@/components/Article'
import Tag from '@/components/Tag'
import { getAllTags } from '@/lib/tags'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Link from 'next/link'
import FAQ from '@/components/faq'

const MAX_DISPLAY = 6

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  tags: Record<string, number>
}> = async () => {
  const [posts, tags] = await Promise.all([getAllFilesFrontMatter('blog'), getAllTags('blog')])

  return { props: { posts, tags } }
}

export default function Home({ posts, tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .slice(0, 10)

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <header className="px-0 py-8 md:py-12">
        {sortedTags.length > 0 && (
          <div className="right-0 mt-4 flex">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span>Теми:</span>
            </div>
            <div className="tag-container ml-2 flex flex-wrap">
              {sortedTags.map((tag) => (
                <div key={tag} className="tag mb-2 mr-2">
                  <Tag text={tag} />
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-3 gap-y-px md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          const { slug } = frontMatter
          return (
            <div key={slug} className="mb-8 w-full">
              <Article {...frontMatter} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-end">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white bg-opacity-30 px-4 py-2 text-base font-medium text-gray-700 backdrop-blur-md backdrop-filter hover:backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-opacity-40"
          aria-label="Всі статті"
        >
          <span className="mr-2">Всі статті</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.707 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 5.414V16a1 1 0 01-2 0V5.414L7.707 9.707a1 1 0 01-1.414-1.414l5-5z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <FAQ />
    </>
  )
}
