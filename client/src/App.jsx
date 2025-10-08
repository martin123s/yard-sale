import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import { useUserStore } from './Store/useUserStore.jsx'
import { useEffect } from 'react'

//  pages
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import DetailsPhotos from './pages/DetailsPhotos.jsx'
import Page404 from './pages/Page404.jsx'
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import UserTerms from './pages/UserTerms.jsx'
import Auth from './pages/Auth.jsx'
import ForgotPwd from './pages/ForgotPwd.jsx'
import ResetPwd from './pages/ResetPwd.jsx'

// layouts
import FooterOnlyLayout from './layouts/FooterOnlyLayout.jsx'



const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const user = useUserStore(state => state.user)
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  if (user && !user.isVerified) {
    return <Navigate to='/auth' replace />
  }
  return children
}

const AuthenticatedUser = ({ children }) => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const user = useUserStore(state => state.user)    
  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />
  }
  if (isAuthenticated && !user.isVerified) {
    return <Navigate to='/auth' replace />
  }
  return children
}


function App() {

  const checkAuth = useUserStore( state => state.checkAuth)
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Home page */}
        <Route path='/' element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        } />

        {/* sign in and sign up */}
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
        
        {/* Layout Footer only */}
        <Route element={<FooterOnlyLayout />}>
          <Route path='/details/:id' element={
            <ProtectedRoutes>
              <DetailsPage />
            </ProtectedRoutes>
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

          <Route path='/auth' element={<Auth />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/userterms' element={<UserTerms />} />
          <Route path='/*' element={<Page404 />} />
        </Route>

        
        {/* display image only page */}
        <Route path='/detailsphotos/:id' element={
          <ProtectedRoutes>
            <DetailsPhotos />
          </ProtectedRoutes>
        } />
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
