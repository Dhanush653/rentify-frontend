import { APP_NAME } from '@/utils/constants'

const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
      &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
    </div>
  </footer>
)

export default Footer
