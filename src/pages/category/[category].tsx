import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllCategories } from '@/lib/categories'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import { PostFrontMatter } from 'types/PostFrontMatter'
import categoryData from '@/data/categorymetadata'
import Head from 'next/head'

const root = process.cwd()

export async function getStaticPaths() {
  const categories = await getAllCategories('blog')

  return {
    paths: Object.keys(categories).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
    posts: PostFrontMatter[];
    category: string;
    maintitle: string;
    title: string;
    description: string;
  }> = async (context) => {
  const category = context.params.category as string
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.categories.map((c) => kebabCase(c)).includes(category)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `categories/${category}/feed.xml`)
    const rssPath = path.join(root, 'public', 'categories', category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  const categoryDataItem = categoryData[category] || {}
  const maintitle = categoryDataItem.maintitle || ` ${category} `
  const title = categoryDataItem.title || `Posts categorized with ${category}`
  const description = categoryDataItem.description || `All posts related to ${category} category`

  return { props: { posts: filteredPosts, category, maintitle, title, description } }
}

export default function Category({ posts, category, maintitle, title, description }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const capitalizedCategory = category[0].toUpperCase() + category.split(' ').join('-').slice(1)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <ListLayout posts={posts} title={maintitle} />
    </>
  )
}

