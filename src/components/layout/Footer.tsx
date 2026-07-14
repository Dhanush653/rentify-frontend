import { APP_NAME } from '@/utils/constants'

const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-gray-500 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
      <p>
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
      <p>Built with React, TypeScript and Tailwind CSS.</p>
    </div>
  </footer>
)

export default Footer
