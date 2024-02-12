import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />

      {/* Add google analytics */}
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id='google-analytics' strategy='lazyOnload'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </ChakraProvider>
  );
}

export default MyApp;
