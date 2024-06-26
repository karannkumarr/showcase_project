import './global.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'ProJet By Wond',
  description: 'A Realm of Student Talent by WOND',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>
          {children}
          </main>
          <Footer/>
        
      </body>
    </html>
  )
}
