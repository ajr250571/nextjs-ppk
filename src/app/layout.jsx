import Navbar from '@/components/Navbar'
import './globals.css'
import { GlobalProvider } from './context/GlobalContext'
import { Toaster } from './Toaster'


export const metadata = {
  title: 'Panpack S.A.',
  description: 'App Panpack SA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className="container mx-auto px-4 h-screen">
        <GlobalProvider>
          <Navbar />
          {children}
        </GlobalProvider>
        <Toaster />
      </body>
    </html>


  )
}
