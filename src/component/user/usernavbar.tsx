

import { faCartArrowDown, faCartShopping, faDesktop, faLocation, faMoon, faSearch, faSun, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { Link } from "react-router-dom"
import { Bell, Heart, ListOrdered, Locate, LogOut, User } from "lucide-react"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "../common/Themeprovider"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt"
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons/faHeartBroken"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard"
import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard"



type Theme = 'light' | 'dark' | 'system'



function Usernavbar() {


  const [isopen, setisopen] = useState(false);
  const [ismenuopen, setismenuopen] = useState(false);
  const [isAccountopen, setisAccountupen] = useState(false)
  const { theme, settheme } = useTheme();
  const dropdownref = useRef<HTMLDivElement>(null);
  const themeref = useRef<HTMLDivElement>(null)
  const accountref = useRef<HTMLDivElement>(null)
  const [count, setcount] = useState(0)

  const option = [
    { value: 'light', icon: faSun, lable: 'Light' },
    { value: 'dark', icon: faMoon, lable: 'Dark' },
    { value: 'system', icon: faDesktop, lable: 'System' }
  ];

  const updatebage = () => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]')
    const total = current.reduce((acc: number, items: any) => acc + (items.quantity ?? 1), 0)
    setcount(total)
  }

  useEffect(() => {
    updatebage()
    window.addEventListener('cart-updated', updatebage)
    window.addEventListener('storage', updatebage)

    return () => {
      window.removeEventListener('cart-updated', updatebage)
      window.removeEventListener('storage', updatebage)
    }
  }, [])


  useEffect(() => {
    const handleclickoutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (themeref.current && !themeref.current.contains(target)) {
        setisopen(false)
      }

      if (dropdownref.current && !dropdownref.current.contains(target)) {
        setismenuopen(false)
      }

      if (accountref.current && !accountref.current.contains(target)) {
        setisAccountupen(false)
      }
    }
    document.addEventListener('mousedown', handleclickoutside)

    return () => { document.removeEventListener('mousedown', handleclickoutside) }
  }, [isopen, ismenuopen, isAccountopen])





  return (
    <div className="flex justify-between items-center  w-full px-4 py-3 bg-[#F9FAFB] dark:bg-slate-900  dark:border-slate-800">
      <div className="flex items-center">
        <span className="text-white rounded-lg p-1.5 mr-2 bg-linear-to-br from-indigo-500 to-purple-400 shadow-lg shadow-indigo-400/20">
          <FontAwesomeIcon icon={faCartShopping} />
        </span>
        <span className="font-bold dark:text-white">NOVA<span className="text-indigo-600">CORE</span></span>
      </div>

      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white w-40 md:w-50 lg:w-80 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>


      <div className="flex items-center gap-3 md:gap-6">

        <Link to='/wishlist' className="hidden lg:block text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
          <Heart size={24} />
        </Link>

        <div>
          <Bell size={24} className="hidden lg:block text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
        </div>

        <Link to="/cart">
          <button className="hidden md:block relative p-2 text-gray-600 dark:text-gray-300">
            <FontAwesomeIcon icon={faCartArrowDown} className="text-xl" />

            {count > 0 && (
              <span className="absolute right-0 top-1 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
                {count}
              </span>
            )}
          </button>
        </Link>


        <div ref={accountref} onClick={() => setisAccountupen(!isAccountopen)} className="relative hidden md:flex items-center gap-2 cursor-pointer group">
          <span className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-indigo-600"><FontAwesomeIcon icon={faUser} /></span>
          <div className="text-left leading-tight">
            <p className="text-[10px] text-gray-500">Hi Username</p>
            <button className="text-[12px] font-bold dark:text-white block ">Account</button>
          </div>


          {isAccountopen && (
            <div className="absolute z-30 top-8  -left-7 text-sm px-2 py-7 w-50 bg-white border border-gray-100 rounded-xl shadow-2xl flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <span><FontAwesomeIcon icon={faUser} className="text-xl bg-gray-100 px-2 py-3 rounded-full" /></span>
                <p className="text-xs text-gray-400 flex flex-col gap-1">Welcome Back <span className="font-bold text-slate-900">Username</span></p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-0.5 bg-gray-100"></div>
                <span className="flex gap-2  items-center rounded-lg hover:bg-indigo-50 py-3  w-full px-2"><FontAwesomeIcon icon={faBars} />My Order</span>
                <span className="flex gap-2  items-center rounded-lg hover:bg-indigo-50 py-3  w-full px-2"><Heart size={18} />Wishlist</span>
                <span className="flex gap-2  items-center rounded-lg hover:bg-indigo-50 py-3  w-full px-2"><FontAwesomeIcon icon={faCreditCard} />Payment</span>
                <span className="flex gap-2  items-center rounded-lg hover:bg-indigo-50 py-3  w-full px-2"><User size={18} />Profile Setting</span>
                <span className="flex gap-2  items-center rounded-lg hover:bg-indigo-50 py-3  w-full px-2"><FontAwesomeIcon icon={faAddressCard} />Shipping Address</span>
                <span className="flex  gap-2 px-2  text-red-600"><LogOut size={18} className="hover:translate-x-1 transition-all duration-700" />Sign Out</span>
              </div>
            </div>
          )}
        </div>


        <div ref={themeref} className="relative hidden md:block ml-0">
          <button
            onClick={() => setisopen(!isopen)}
            className="flex items-center text-gray-600 dark:text-gray-300 text-sm capitalize border rounded-md border-gray-300 dark:border-slate-700 px-3 py-1.5 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            <FontAwesomeIcon icon={option.find(o => o.value === theme)?.icon || faDesktop} className="mr-2 text-indigo-500" />
            {theme}
          </button>

          {isopen && (
            <div className="absolute mt-2 top-full right-0 w-32 bg-white dark:bg-slate-800 shadow-2xl border border-gray-100 dark:border-slate-700 rounded-md overflow-hidden z-50 flex flex-col">

              {option.map((opt) => (

                <button
                  key={opt.value}
                  onClick={() => {
                    settheme(opt.value as Theme)
                    setisopen(false)
                  }}
                  className="flex items-center gap-3 text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <FontAwesomeIcon icon={opt.icon} className="w-4 text-indigo-500" />
                  {opt.lable}
                </button>
              ))}
            </div>
          )}
        </div>


      </div>

      <div ref={dropdownref} className=" md:hidden relative flex items-center text-white text-lg">
        <button
          onClick={() => setismenuopen(!ismenuopen)}
          className="flex items-center justify-center border rounded-full p-1.5 hover:bg-gray-200 dark:hover:bg-slate-800 hover:border-gray-200 dark:hover:border-slate-700  transition-all">
          <FontAwesomeIcon icon={faUser} className="bg-indigo-500 text-sm border rounded-full px-0.5 py-1" />
          <FontAwesomeIcon icon={faBars} className="text-black dark:text-white" />
        </button>

        {ismenuopen && (
          <div className="absolute top-11 right-0 w-56 bg-white dark:bg-slate-800 shadow-2xl border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden z-50 py-2">
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              <FontAwesomeIcon icon={faUserCircle} />
              MyAccount
            </button>

            <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>

            <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">Apperance</p>
            <div className="flex px-2 gap-1">
              {['light', 'dark', 'system'].map((t) => (
                <button key={t} onClick={() => settheme(t as Theme)}
                  className={`flex-1 py-1.5 rounded-md text-[11px] capitalize transition-all ${theme === t
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}>{t}</button>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>

            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5" /><span className="font-semibold">Logout</span>
            </button>
          </div>
        )}

      </div>
    </div>







  )
}

export default Usernavbar
