
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'


function Privatelayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Privatelayout
