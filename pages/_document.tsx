import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='author' content='monyo'></meta>
          {/* og */}
          <meta property='og:locale' content='ja_JP' />
          {/* for twitter */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@monyo75559702' />
          <meta name='twitter:player' content='@monyo75559702' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
