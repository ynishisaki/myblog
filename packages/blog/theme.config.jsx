import Footer from "./src/components/common/Footer";

/* eslint sort-keys: error */
/* eslint-disable sort-keys */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  head: ({ title, meta }) => (
    <>
      <title>{title}|もにょblog</title>

      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Language" content="ja" />

      <meta name="author" content="monyo" />
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.tag} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://www.monyoblog.com/posts/${meta.slug}/`}
      />
      <meta
        property="og:image"
        content={`https://www.monyoblog.com/assets/blog/${meta.slug}/cover.webp`}
      />

      <meta property="og:description" content={meta.description} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content="もにょblog" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@monyo75559702" />
      <meta name="twitter:creator" content="@monyo75559702" />
      {/* <meta name="twitter:title" content={meta.title} /> */}
      {/* <meta name="twitter:description" content={meta.description} /> */}
      {/* <meta
        name="twitter:image"
        content={`https://www.monyoblog.com/assets/blog/${meta.slug}/cover.webp`}
      /> */}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
        rel="stylesheet"
      />
    </>
  ),
  // YYYY-MM-DD
  dateFormatter: (date) => {
    return date
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  },
  readMore: "Read More",
  footer: <Footer />,
};
