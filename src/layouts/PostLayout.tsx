/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import * as React from 'react'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
// import Comment from '@/components/Comment'
// import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from '@/components/Image'
// import LikeButton from '@/components/LikeButton2'
// import DislikeButton from '@/components/DislikeButton'
import ProgressBar from '@/components/ProgressBar'
import TableOfContents, { HeadingScrollSpy } from '@/components/TableOfContents'
import useScrollSpy from '@/components/hooks/useScrollspy'
import { ReactNode } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'
import Article from '@/components/Article'
import dynamic from 'next/dynamic'
import PageTitle from '@/components/PageTitle'
import Script from 'next/script'
import ReviewForm from '@/components/Review'
import ReviewList from '@/components/reviewlist'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  children: ReactNode
  prev: {
    slug: string
    title: string
    images?: string[]
    date: string
    tags: string[]
    categories: string[]
    fileName: string
  }
  prev2: {
    slug: string
    title: string
    images?: string[]
    date: string
    tags: string[]
    categories: string[]
    fileName: string
  }
  prev3: {
    slug: string
    title: string
    images?: string[]
    date: string
    tags: string[]
    categories: string[]
    fileName: string
  }
}

export default function PostLayout({
  frontMatter,
  children,
  authorDetails,
  prev,
  prev2,
  prev3,
}: Props) {
  const { slug, date, title, tags, images } = frontMatter
  const src = Array.isArray(images) ? images[0] : images

  const activeSection = useScrollSpy()

  const [toc, setToc] = React.useState<HeadingScrollSpy>()
  const minLevel = toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0

  const [reviews, setReviews] = React.useState<any[]>([])

  React.useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3')

    const headingArr: HeadingScrollSpy = []
    headings.forEach((heading) => {
      const id = heading.id
      const level = +heading.tagName.replace('H', '')
      const text = heading.textContent + ''

      headingArr.push({ id, level, text })
    })

    setToc(headingArr)
  }, [frontMatter.slug])

  React.useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?post=${slug}`);
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [slug]);

  const handleNewReview = async (rating: number) => {
    const response = await fetch(`/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: slug, rating }),
    });
    const newReview = await response.json();
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-800">
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <section className="bg-white dark:bg-gray-900 pb-8 md:pb-12">
        <PageTitle>{title}</PageTitle>
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
            <div className="max-w-[720px] mx-auto">
              <Image
                src={src}
                alt={title}
                width={1280}
                height={720}
                objectFit="cover"
                objectPosition="center"
                className="transform transition-transform hover:scale-105"
              />
            </div>

            <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
              <p className="text-gray-300 text-lg md:text-xl font-medium mb-2">
                {new Date(date).toLocaleDateString(undefined, postDateTemplate)}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} maintitle={''} title={''} description={''} />
                ))}
              </div>
            </div>
          </div>
          <ProgressBar />
        </div>
        <section className="lg:flex lg:gap-6">
          <article className="mdx prose mx-auto w-full transition-colors dark:prose-invert">
            <div className="prose break-words lg:prose-lg dark:prose-dark max-w-none py-4">
              {children}
            </div>
          </article>
          <aside className="py-4 lg:w-1/4">
            <div className="sticky top-24">
              <TableOfContents toc={toc} minLevel={minLevel} activeSection={activeSection} />
            </div>
          </aside>
        </section>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewForm onSubmit={handleNewReview} />
      </div>
      <div
        id="cusdis_thread"
        data-host={process.env.NEXT_PUBLIC_CUSDIS_HOST}
        data-app-id={process.env.NEXT_PUBLIC_CUSDIS_APP_ID}
        data-page-id={slug}
        data-page-url={`${process.env.NEXTAUTH_URL}/blog/${slug}`}
        data-page-title={title}
      ></div>

      <Script src="/custom-cusdis.js" strategy="afterInteractive" />

      {prev || prev2 || prev3 ? (
        <section className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {prev && <Article {...prev} />}
              {prev2 && <Article {...prev2} />}
              {prev3 && <Article {...prev3} />}
            </div>
          </div>
        </section>
      ) : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {authorDetails.map((author) => (
            <div key={author.name} className="flex items-center gap-2">
              <Image
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <Link href={`/about`} className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary">
                  {author.name}
                </Link>
                <p className="text-gray-500 text-sm">{author.occupation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Star Rating System */}
    </main>
  )
}
