import { GoogleAnalytics } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/main.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </>
  );
}
