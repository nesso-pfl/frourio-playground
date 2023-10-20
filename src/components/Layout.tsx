import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="sticky w-full">
        <Header />
      </div>
      <main className="flex-1 px-4 pt-8 w-full max-w-7xl">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
