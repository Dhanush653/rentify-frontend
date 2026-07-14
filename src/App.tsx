import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppRoutes } from '@/routes'

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <Toaster position="top-right" />
  </BrowserRouter>
)

export default App
