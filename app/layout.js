import Header from '@/components/layout/Header'
import './globals.css'
import { Karla } from 'next/font/google'
import Footer from '@/components/layout/Footer'
import { GlobalProvider } from './GlobalProvider'

const karla = Karla({ subsets: ['latin'] })

export const metadata = {
  title: 'SpadClub DApp',
  description: 'Create SpadClubs and Manage Spad funds',
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
