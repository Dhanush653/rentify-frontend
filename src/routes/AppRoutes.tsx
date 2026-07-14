import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/common'
import { Layout } from '@/components/layout'
import {
  CreatePropertyPage,
  EditPropertyPage,
  HomePage,
  LoginPage,
  MyPropertiesPage,
  NotFoundPage,
  ProfilePage,
  PropertyDetailsPage,
  RegisterPage,
} from '@/pages'
import { ROUTES } from '@/utils/constants'

const AppRoutes = () => (
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
)

export default AppRoutes
