import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import DetailsPhotos from './pages/DetailsPhotos.jsx'
import Page404 from './pages/Page404.jsx'
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import UserTerms from './pages/UserTerms.jsx'
import Auth from './pages/Auth.jsx'
import { useUserStore } from './Store/useUserStore.jsx'
import { useEffect } from 'react'
import ForgotPwd from './pages/ForgotPwd.jsx'
import ResetPwd from './pages/ResetPwd.jsx'


// protected page
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useUserStore()
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }
  if (!user.isVerified) {
    return <Navigate to='/auth' replace />
  }
  return children
}

const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useUserStore()
  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />
  }
  return children
}


function App() {

  const { checkAuth } = useUserStore()
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        } />

        <Route path='/details/:id' element={
          <ProtectedRoutes>
            <DetailsPage />
          </ProtectedRoutes>
        } />

        <Route path='/detailsphotos/:id' element={
          <ProtectedRoutes>
            <DetailsPhotos />
          </ProtectedRoutes>
        } />

        <Route path='/signin' element={
          <AuthenticatedUser>
            <SignIn />
          </AuthenticatedUser>
        } />

        <Route path='/signup' element={
          <AuthenticatedUser>
            <SignUp />
          </AuthenticatedUser>
        } />

        <Route path='/auth' element={
          <AuthenticatedUser>
            <Auth />
          </AuthenticatedUser>
        } />

        <Route path='/forgot-pwd' element={
          <AuthenticatedUser>
            <ForgotPwd />
          </AuthenticatedUser>
        } />

        <Route path='/reset-pwd/:token' element={
          <AuthenticatedUser>
            <ResetPwd />
          </AuthenticatedUser>
        } />
        
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/userterms' element={<UserTerms />} />
        <Route path='/*' element={<Page404 />} />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
