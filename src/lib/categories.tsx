import { PostFrontMatter } from 'types/PostFrontMatter'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export async function getAllCategories(type: 'blog' | 'authors') {
  const files = getFiles(type)

  const categoryCount: Record<string, number> = {}
  // Iterate through each post, putting all found categories into `categories`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8')
    const matterFile = matter(source)
    const data = matterFile.data as PostFrontMatter
    if (data.categories && data.draft !== true) {
      data.categories.forEach((category) => {
        const formattedCategory = kebabCase(category)
        if (formattedCategory in categoryCount) {
          categoryCount[formattedCategory] += 1
        } else {
          categoryCount[formattedCategory] = 1
        }
      })
    }
  })

  return categoryCount
}
