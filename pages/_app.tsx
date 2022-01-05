import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Head>
        <title>ig.news</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
