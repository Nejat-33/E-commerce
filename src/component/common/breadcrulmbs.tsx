import { ChevronRight } from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

function Breadcrumb() {
    const { pathname } = useLocation()

    if (pathname == '/') {
        return null
    }

    const pathnam = pathname.split('/').filter(filter => filter)
    console.log('path', pathnam);



    return (
        <div className='flex gap-2 items-center px-5 my-5'>
            <Link to={'/'} className='text-sm'>
                Home
            </Link>

            {pathnam.map((path, index) => {
                if (!isNaN(Number(path))) return null
                const to = '/' + pathnam.slice(0, index + 1).join('/')
                return (
                    <div className='flex gap-2 items-center text-sm'>
                        <ChevronRight size={15} />
                        <Link className='capitalize hover:text-indigo-600' to={to}>{path}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Breadcrumb
