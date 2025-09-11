import '@/styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = document.createElement('script')
      s.src = 'https://telegram.org/js/telegram-web-app.js'
      s.async = true
      document.body.appendChild(s)
    }
  }, [])
  return <Component {...pageProps} />
}
