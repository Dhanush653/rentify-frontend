import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRoutes from '@/routes/AppRoutes'

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <Toaster position="top-right" />
  </BrowserRouter>
)

export default App
