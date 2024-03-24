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

/**
 * getStaticPathでreturnで利用するパスを取得する
 * 
 * @returns
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      //あとで、これら(id)がルーティングのパスになる。
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  // 以下のような配列を返します:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
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
