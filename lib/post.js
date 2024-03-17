import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { remark } from "remark";
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts")

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名(id)
    const id = fileName.replace(/\.md$/, "")

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    }
  })

  return allPostsData
}

// getStaticPathでreturnで利用するパスを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })

  /**
   * [
   *  {
   *    params: {
   *      ssg-ssr
   *    }
   *  },
   *  {
   *    params: {
   *      react-next
   *    }
   *  }
   * ]
   */
}


// IDに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const matterResult = matter(fileContents)

  const blogContent = await remark().use(html).process(matterResult.content)

  const blogContentHtml = blogContent.toString()

  return {
    id,
    blogContentHtml,
    ...matterResult.data,
  }
}