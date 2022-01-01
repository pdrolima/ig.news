import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
     <>
      <Head>
        <title>ig.news</title>
        <Component {...pageProps} />
      </Head>
     </>
  )
}
export default MyApp
