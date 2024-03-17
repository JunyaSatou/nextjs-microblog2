import styles from "../styles/Home.module.css"
import Layout from "../components/Layout";

import Link from "next/link";
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from "../lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData()
  // console.log(allPostsData)

  return {
    props: {
      allPostsData
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context) {
//    return {
//     // コンポーネントに渡すためのprops
//    }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです。/Udemy講師をしています。/好きな言語はJavaScriptです
        </p>
      </section>
      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>
                  {title}
                </a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              {date}
            </small>
          </article>
        ))}
        </div>
      </section>
    </Layout>
  );
}
