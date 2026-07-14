import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'

/** App shell: Navbar + routed page + Footer. */
const Layout = () => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Navbar />

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Outlet />
    </main>

    <Footer />
  </div>
)

export default Layout
