import '@/styles/globals.css'
// Import css files
import NetflixProvider from '@/context/NetflixContext'

export default function App({ Component, pageProps }) {
  return (
    <NetflixProvider>
      <Component {...pageProps} />

    </NetflixProvider>
    

  
  
  
  
  )
}
