import { SkeletonTheme } from 'react-loading-skeleton'
import { toastOption } from '@/config/toast-option'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'
import { auth } from '@/security/auth'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const darkTheme = true
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className}  theme-core ${darkTheme ? 'skin-dark' : 'skin-light'}`}>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              gutter={4}
              toastOptions={toastOption(darkTheme)}
            />
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              {children}
            </SkeletonTheme>
        </body>
      </html>
    </SessionProvider>
  )
}
