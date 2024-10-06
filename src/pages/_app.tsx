import { GoogleAnalytics } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import "../styles/main.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
    </>
  );
}
