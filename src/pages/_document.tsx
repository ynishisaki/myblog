import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link
            href='https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            strategy='lazyOnload'
            src='https://embed.zenn.studio/js/listen-embed-event.js'
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
