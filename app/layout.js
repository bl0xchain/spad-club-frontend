import Header from '@/components/layout/Header'
import './globals.css'
import { Karla } from 'next/font/google'
import Footer from '@/components/layout/Footer'
import { GlobalProvider } from './GlobalProvider'

const karla = Karla({ subsets: ['latin'] })

export const metadata = {
  title: 'SPAD - Fund Together with SPADs',
  description: 'Welcome to the democratized future of cryptocurrency investment. SPAD provides a platform that opens the door for everyone to contribute to crypto projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${karla.className} bg-slate-100`}>
        <GlobalProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  )
}
