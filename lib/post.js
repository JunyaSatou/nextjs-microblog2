import path from "path"
import fs from "fs"
import matter from "gray-matter"

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