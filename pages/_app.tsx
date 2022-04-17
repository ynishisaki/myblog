import '../styles/zenn-global.css';
import Script from 'next/script';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('zenn-embed-elements'), [];
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script id='google-analytics' strategy='lazyOnload'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </ChakraProvider>
  );
}

export default MyApp;
