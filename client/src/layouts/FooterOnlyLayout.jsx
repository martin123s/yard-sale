import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Layout/Footer.jsx'

const FooterOnlyLayout = () => {
  return (
    <>
      <main className='min-h-screen'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default FooterOnlyLayout
