// import '../styles/globals.css';
import '../styles/zenn-global.css';
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
    </ChakraProvider>
  );
}

export default MyApp;
