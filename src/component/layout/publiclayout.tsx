
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

import Breadcrumb from '../common/breadcrulmbs'

function Publiclayout() {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  )
}

export default Publiclayout
