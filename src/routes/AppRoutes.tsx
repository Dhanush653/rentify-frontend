import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/common/Loader'
import { ROUTES } from '@/utils/constants'

// Route-level code splitting: each page is a separate lazy chunk.
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const CreatePropertyPage = lazy(() => import('@/pages/property/CreatePropertyPage'))
const EditPropertyPage = lazy(() => import('@/pages/property/EditPropertyPage'))
const MyPropertiesPage = lazy(() => import('@/pages/property/MyPropertiesPage'))
const PropertyDetailsPage = lazy(() => import('@/pages/property/PropertyDetailsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const AppRoutes = () => (
  <Suspense fallback={<Loader label="Loading..." />}>
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PROPERTY_DETAILS} element={<PropertyDetailsPage />} />

        {/* Requires an authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.CREATE_PROPERTY} element={<CreatePropertyPage />} />
          <Route path={ROUTES.EDIT_PROPERTY} element={<EditPropertyPage />} />
          <Route path={ROUTES.MY_PROPERTIES} element={<MyPropertiesPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
)

export default AppRoutes
