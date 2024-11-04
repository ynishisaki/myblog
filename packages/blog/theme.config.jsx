import Footer from "./src/components/common/Footer";

/* eslint sort-keys: error */
/* eslint-disable sort-keys */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  head: ({ title, meta }) => (
    <>
      <title>{`${title}｜もにょblog`}</title>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}

      {/* og */}
      <meta property="og:site_name" content="もにょblog" />
      <meta
        property="og:url"
        content={`https://www.monyoblog.com/posts/${meta.slug}/`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:description" content={meta.description} />
      <meta
        property="og:image"
        content={`https://www.monyoblog.com/assets/blog/${meta.slug}/cover.webp`}
      />
      {/* twitter */}
      <meta name="twitter:title" content={title} />
      <meta
        property="twitter:image"
        content={`https://www.monyoblog.com/assets/blog/${meta.slug}/cover.webp`}
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
