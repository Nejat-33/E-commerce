
import { UserPlus, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/authcontext'


function Finalcta() {
    const { user } = useAuth()




    return (
        <>

            {!user && (

                <div className='relative flex flex-col items-center gap-5 my-10 border border-gray-50 dark:border-indigo-500/30 dark:bg-linear-to-br from-indigo-950 to-slate-950 rounded-4xl overflow-hidden bg-gray-100  p-8'>
                    <div className='absolute -top-20 -right-20 w-64 h-64  blur-[100px] rounded-full group-hover:bg-indigo-500/40 dark:bg-linear-to-br from-indigo-950 to-slate-950 transition-all duration-700'></div>
                    <span className='flex gap-2 items-center rounded-2xl text-xs bg-white/10 backdrop-blur-md border px-2 py-1 border-white/20'>
                        <Zap size={12} className='text-orange-400 fill-orange-400' />
                        <span>NOVA MEMBERSHIP</span>
                    </span>
                    <div className='relative space-y-6 z-10  text-center md:text-left'>
                        <div className=' flex-col items-center text-center gap-2 capitalize'>
                            <p className='text-2xl'>join the <span className='bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-black'>core circle</span></p>
                            <p className='text-sm text-gray-400'>Sign up for free and unlock instant benefits, member-only pricing, and priority shipping on every order.</p>
                        </div>

                        <div className='flex flex-col sm:flex-row  justify-center md:justify-start lg:justify-center gap-4  '>

                            <Link to={`/registration`}>
                                <button className='bg-white/80 text-slate-900 font-bold  px-8  py-4 rounded-2xl flex  gap-2 transition-all hover:bg-slate-200 active:scale-95'>
                                    <UserPlus size={16} />Create Account
                                </button>
                            </Link>
                            <button className='px-8 py-3 font-bold rounded-2xl text-white darh:bg-transparen border bg-slate-600 border-white/20 transition-all hover:bg-wite/5'>
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className='absolute hidden md:block md:flex bottom-3 right-9 flex items-center rounded-2xl  bg-white/40 border-white/10 p-4 dark:bg-white/5 backdrop-blur-md gap-3 animate-bounce'>
                        <div className='rounded-full bg-green-200 backdrop-blur-md p-3'>
                            <div className='w-2 h-2 rounded-full bg-green-500'></div>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-xs text-gray-400'>MEMBERSHIP STATUS</p>
                            <span className='text-sm font-bold'>ACTIVE</span>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default Finalcta
