import type { NextraThemeLayoutProps } from "nextra";
import Footer from "./src/components/common/Footer";
import Header from "./src/components/common/Header";
import PostTitle from "./src/components/posts/PostTitle";
import { COLORS } from "./src/styles/colors";
import { containerLayout } from "./src/styles/variants";

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
  const { title, frontMatter: post } = pageOpts;
  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: COLORS.main.medium,
        }}
        className="mt-[50px] py-4"
      >
        <article
          style={{
            backgroundColor: COLORS.main.light,
          }}
          className={containerLayout()}
        >
          <PostTitle
            title={post.title}
            coverImagePath={post.coverImagePath}
            coverImagePhotographer={post.coverImagePhotographer}
            coverImageSrcUrl={post.coverImageSrcUrl}
            date={post.date}
            category={post.category}
          />
          <section
            className="prose prose-slate max-w-none"
            // className="_not-prose max-w-none"
          >
            {children}
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
