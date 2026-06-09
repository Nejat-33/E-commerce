import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import { faAddressCard, faBars, faBell, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChevronRight, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import Userorder from "./userorder"
import Usershippingaddress from "./usershippingaddress"
import Userpayment from "./userpayment"
import Wishhlist from "./wishlist"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../auth/authcontext"
import Userprofile from "./userprofile"

function UserDashboard({ initialTab }: { initialTab?: string }) {
    const locate = useLocation()
    const [activetab, setactivetab] = useState(initialTab || locate.state?.tab || 'order')

    const { logout } = useAuth()

    useEffect(() => {
        if (initialTab && initialTab !== activetab) {
            setactivetab(initialTab)
        }
    }, [initialTab])


    return (
        <div className=" flex flex-col mt-6">
            <div className="flex items-center text-xs ">
                <Link to='/'>Home</Link>
                <ChevronRight size={15} />
                {activetab && (
                    <>
                        <span className="text-indigo-600">{activetab.replace('is', '')}</span>
                    </>
                )}
            </div>

            <div className="flex gap-10 w-full mt-5 mb-10">
                <div className="flex sticky top-8 self-start flex-col gap-8 w-66 shrink-0 bg-white px-4 py-6 rounded-xl">
                    <span onClick={() => setactivetab('order')}
                        className={`flex gap-2 cursor-pointer rounded-xl px-3 hover:bg-indigo-50 transition-all duration-300 items-center py-2 ${activetab === 'order' ? 'text-indigo-600' : 'text-slate-800'}`}>
                        <FontAwesomeIcon icon={faBars} />
                        My Order
                    </span>

                    <span onClick={() => setactivetab('wishlist')}
                        className={`flex cursor-pointer gap-2 hover:bg-indigo-50 transition-all duration-300 rounded-xl items-center px-3 py-2 ${activetab === 'wishlist' && 'text-indigo-600'}`}>
                        <FontAwesomeIcon icon={faHeart} />
                        Wishlist
                    </span>
                    <span onClick={() => setactivetab('payment')}
                        className={`flex cursor-pointer gap-2 hover:bg-indigo-50 transition-all duration-300 rounded-xl items-center px-3 py-2 ${activetab === 'payment' && 'text-indigo-600'}`}>
                        <FontAwesomeIcon icon={faPaypal} />
                        Payment
                    </span>
                    <span onClick={() => setactivetab('profile')}
                        className={`flex cursor-pointer gap-2 hover:bg-indigo-50 transition-all duration-300 rounded-xl items-center px-3 py-2 ${activetab === 'profile' && 'text-indigo-600'}`}>
                        <FontAwesomeIcon icon={faUser} />
                        Profile Setting
                    </span>
                    <span onClick={() => setactivetab('address')}
                        className={`flex cursor-pointer gap-2 hover:bg-indigo-50 transition-all duration-300 rounded-xl  items-center px-3 py-2 ${activetab === 'address' && 'text-indigo-600'}`}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        Shipping Address
                    </span>

                    <span onClick={() => setactivetab('notfication')}
                        className={`flex cursor-pointer gap-2 hover:bg-indigo-50 transition-all duration-300 rounded-xl  items-center px-3 py-2 ${activetab === 'notificcation' && 'text-indigo-600'}`}>
                        <FontAwesomeIcon icon={faBell} />
                        Notification
                    </span>

                    <span onClick={logout} className="flex gap-2 cursor-pointer font-bold text-red-600 items-center px-3 py-2">
                        <LogOut size={18} />
                        Sign Out
                    </span>

                </div>

                {activetab === 'order' && (
                    <Userorder />
                )}
                {activetab === 'address' && (
                    <Usershippingaddress />
                )}
                {activetab === 'payment' && (
                    <Userpayment />
                )}
                {activetab === 'wishlist' && (
                    <Wishhlist />
                )}
                {activetab === 'profile' && (
                    <Userprofile />
                )}
            </div>
        </div>
    )
}

export default UserDashboard
