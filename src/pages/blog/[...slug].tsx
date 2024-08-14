import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Toc } from 'types/Toc'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter }
  authorDetails: AuthorFrontMatter[]
  prev?:  {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string }
  prev2?:  {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string }
  prev3?:  {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string }
}> = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)
  const prev: {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string } = allPosts[postIndex + 1] || null
  const prev2: {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string } = allPosts[postIndex + 2] || null
  const prev3: {slug: string; title: string; images?: string[];  date: string; tags: string[];  categories : string[];  fileName: string } = allPosts[postIndex + 3] || null
  const post = await getFileBySlug<PostFrontMatter>('blog', slug)
  // @ts-ignore
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author: string) => {
    const authorResults = await getFileBySlug<AuthorFrontMatter>('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)
  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return {
    props: {
      post,
      authorDetails,
      prev,
      prev2,
      prev3,
      
    },
  }
}

export default function Blog({
  post,
  authorDetails,
  prev,
  prev2,
  prev3,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          prev2={prev2}
          prev3={prev3}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
