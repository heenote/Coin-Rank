import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"/>
    </>
  )
}