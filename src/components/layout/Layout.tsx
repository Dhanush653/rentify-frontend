import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

/** App shell: Navbar + routed page + Footer. */
const Layout = () => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <Navbar />

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
      <Outlet />
    </main>

    <Footer />
  </div>
)

export default Layout
