import Sidebar from '@/components/shared/sidebar/Sidebar'

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
