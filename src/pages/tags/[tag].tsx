
// [tag].tsx
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import { PostFrontMatter } from 'types/PostFrontMatter'
import tagsData from '@/data/tagmetadata'
import Head from 'next/head'


const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[];
  tag: string;
  maintitle: string;
  title: string;
  description: string;
}> = async (context) => {
  const tag = context.params.tag as string;
  const allPosts = await getAllFilesFrontMatter('blog');
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  );

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${tag}/feed.xml`);
    const rssPath = path.join(root, 'public', 'tags', tag);
    fs.mkdirSync(rssPath, { recursive: true });
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss);
  }

  // SEO metadata
  const tagData = tagsData[tag] || {};
  const maintitle = tagData.maintitle || `Posts tagged with ${tag}`;
  const title = tagData.title || `Posts tagged with ${tag}`;
  const description = tagData.description || `All posts related to ${tag} tag`;

  return { props: { posts: filteredPosts, tag, maintitle, title, description } };
};


export default function Tag({ posts, maintitle, title, description }: InferGetStaticPropsType<typeof getStaticProps>) {
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
