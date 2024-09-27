import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "zenn-content-css";
import markdownHtml from "zenn-markdown-html";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import PostContent from "../../components/posts/PostContent";
import PostTitle from "../../components/posts/PostTitle";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function Post({ post, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}｜もにょblog</title>
        <meta name="description" content={post.excerpt} />
        {/* og */}
        <meta property="og:site_name" content="もにょblog" />
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.monyoblog.com/posts/${post.slug}/`}
        />
        <meta
          property="og:image"
          content={`https://www.monyoblog.com${post.coverImagePath}`}
        />
        <meta property="og:description" content={post.excerpt} />
        {/* twitter */}
        <meta
          property="twitter:image"
          content={`https://www.monyoblog.com${post.coverImagePath}`}
        />
        <meta name="twitter:title" content={post.title} />
      </Head>
      <Header />
      <main
        style={{
          backgroundColor: COLORS.main.medium,
        }}
        className="mb-4 mt-[50px] w-full pt-4"
      >
        <article
          style={{
            backgroundColor: COLORS.main.light,
          }}
          className="relative mx-auto w-[90%] p-8 md:w-[750px]"
        >
          <PostTitle
            title={post.title}
            coverImagePath={post.coverImagePath}
            coverImagePhotographer={post.coverImagePhotographer}
            coverImageSrcUrl={post.coverImageSrcUrl}
            date={post.date}
            category={post.category}
          />
          <PostContent content={post.content} />
          {relatedPosts[0] && (
            <aside>
              <div className="my-5 border-t border-gray-300" />
              <h2 className="my-5 text-center text-2xl font-bold">関連記事</h2>
              <div className="flex">
                {/* 関連記事を最大2つ表示する */}
                {relatedPosts.slice(0, 2).map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
                    <article className="mx-auto w-4/5">
                      <Image
                        width={400}
                        height={300}
                        src={post.coverImagePath}
                        alt="cover image"
                        style={{ objectFit: "cover" }}
                      />
                      <h3 className="my-3 line-clamp-3 text-sm">
                        {post.title}
                      </h3>
                    </article>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "excerpt",
    "coverImagePath",
    "coverImagePhotographer",
    "coverImageSrcUrl",
    "date",
    "category",
    "content",
  ]);

  const content =
    markdownHtml(post.content, {
      embedOrigin: "https://embed.zenn.studio",
    }) || "";

  const relatedPosts = getAllPosts([
    "slug",
    "title",
    "excerpt",
    "coverImagePath",
    "date",
    "category",
  ]).filter((p) => p.category === post.category && p.slug !== post.slug); // 同一カテゴリーの記事を取得

  return {
    props: {
      post: {
        ...post,
        content,
      },
      relatedPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
