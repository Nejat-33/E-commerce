import { Check, ChevronDown, ChevronLeft, User } from "lucide-react"
import { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city'
import { ICountry, IState, ICity } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";


function Usershippingaddress() {
    const [country, setcountry] = useState<ICountry | null>(null)
    const [state, setstate] = useState<IState | null>(null)
    const [city, setcity] = useState<ICity | null>(null)
    const [iscountryOpen, setIscountryOpen] = useState(false)
    const [isstteOpen, setisstateOpen] = useState(false)
    const [iscityOpen, setiscityOpen] = useState(false)
    const [isbuttonclicked, setisbuttonclicked] = useState(false)
    const countries = Country.getAllCountries()
    const states = country ? State.getStatesOfCountry(country.isoCode) : [];
    const cities = country && state ? City.getCitiesOfState(country.isoCode, state.isoCode) : []
    const [defaultaddress, setdefaultaddress] = useState<any>()
    const [phonenumber, setphonenumber] = useState<string>('')
    const [showform, setshowform] = useState(false)
    const [error, seterror] = useState('')
    const [newaddress, setnewaddress] = useState<any>()

    useEffect(() => {
        const defaultaddress = localStorage.getItem('default-address')
        const newaddress = localStorage.getItem('new-address')
        if (defaultaddress) {
            const parsed = JSON.parse(defaultaddress)
            setdefaultaddress(parsed)
            setshowform(false)
        } else if (newaddress) {
            const parse = JSON.parse(newaddress)
            setnewaddress(parse)
            setshowform(false)
        }
        else {
            setshowform(true)
        }
    }, [])

    const handleconfitm = () => {
        if (country && state && city && phonenumber) {
            const newaddress = {
                country: country,
                state: state,
                city: city,
                phonenumber: phonenumber,
                fulladdress: `${city?.name}, ${state?.name}, ${country?.name}`
            }

            if (isbuttonclicked) {
                localStorage.setItem('default-address', JSON.stringify(newaddress))
                setdefaultaddress(newaddress)
            } else {
                localStorage.setItem('new-address', JSON.stringify(newaddress))
                setnewaddress(newaddress)
            }
            setshowform(false)
        } else {
            seterror('all field must be filled')
        }
    }

    const handledelete = () => {
        localStorage.removeItem('default-address')
        setdefaultaddress(null)
        const defaultaddress = localStorage.getItem('default-address')
        const newaddress = localStorage.getItem('new-address')
        if (!defaultaddress && !newaddress) {
            setshowform(true)
        }
    }

    const handleedit = () => {

        setcountry(defaultaddress.country)
        setstate(defaultaddress.state)
        setcity(defaultaddress.city)
        setphonenumber(defaultaddress.phonenumber)
        setshowform(true)
    }

    const handleedit2 = () => {
        setcountry(newaddress.country)
        setstate(newaddress.state)
        setcity(newaddress.city)
        setphonenumber(newaddress.phonenumber)
        setshowform(true)
    }

    const handledelete2 = () => {
        localStorage.removeItem('new-address')
        setnewaddress(null)
        const defaultaddress = localStorage.getItem('default-address')
        const newaddress = localStorage.getItem('new-address')
        if (!defaultaddress && !newaddress) {
            setshowform(true)
        }
    }



    return (
        <div className="bg-white space-y-5 w-3/5 rounded-2xl px-5 py-6">
            <p className='font-bold text-xl mb-5'>Shipping address</p>

            {showform ?
                <span onClick={() => setshowform(false)} className="flex group gap-1 w-1/7 cursor-pointer items-center text-sm"><ChevronLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-300" />Back</span>
                :
                <button onClick={() => setshowform(true)} className=" px-6 py-2 bg-red-500 text-white rounded-lg">Add new Card</button>
            }

            {defaultaddress && !showform && (
                <div className="px-5 w-3/5 py-3 border-2 space-y-4 bg-orange-50 border-slate-400">
                    <p className="text-right text-orange-500 font-bold">Default Address</p>
                    <p className="flex gap-2 items-center font-bold"><User size={18} /> username, userid </p>
                    <div className="flex gap-3 ">
                        <FontAwesomeIcon icon={faLocation} className="mt-1" />
                        <div className="capitalize text-sm flex justify-center flex-col gap-3">
                            <p>{defaultaddress.city.name}</p>
                            <div>
                                <span>{defaultaddress.city.name}, </span>
                                <span>{defaultaddress.state.name}, </span>
                                <span>{defaultaddress.country.name}</span>
                                <p>Zipcode</p>
                            </div>
                        </div>
                    </div>
                    <span className="flex font-bold gap-10 ml-8 mt-10 text-blue-500">
                        <button onClick={handleedit}>Edit</button>
                        <button onClick={handledelete}>Delete</button>
                    </span>
                </div>
            )}

            {newaddress && !showform && (
                <div className="px-5 w-3/5 py-3 border-2 space-y-4 bg-orange-50 border-slate-400">
                    <p className="text-right text-orange-500 font-bold">Address</p>
                    <p className="flex gap-2 items-center font-bold"><User size={18} /> username, userid </p>
                    <div className="flex gap-3 ">
                        <FontAwesomeIcon icon={faLocation} className="mt-1" />
                        <div className="capitalize text-sm flex justify-center flex-col gap-3">
                            <p>{newaddress.city.name}</p>
                            <div>
                                <span>{newaddress.city.name}, </span>
                                <span>{newaddress.state.name}, </span>
                                <span>{newaddress.country.name}</span>
                                <p>Zipcode</p>
                            </div>
                        </div>
                    </div>
                    <span className="flex font-bold gap-10 ml-8 mt-10 text-blue-500">
                        <button onClick={handleedit2}>Edit</button>
                        <button onClick={handledelete2}>Delete</button>
                    </span>
                </div>

            )}

            {showform && (
                <div className="space-y-3">
                    <div className='space-y-8 px-3 py-5 rounded-lg'>

                        <div className="space-y-8 w-full">

                            <div className="flex gap-4">
                                <div className="relative w-full">
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">Country</label>
                                    <div
                                        onClick={() => setIscountryOpen(!iscountryOpen)}
                                        className="w-full h-9 text-sm border border-gray-300 rounded-xl px-4 flex items-center justify-between bg-white cursor-pointer hover:border-blue-500 transition-all shadow-sm"
                                    >
                                        <span className={country ? "text-gray-900" : "text-gray-400"}>

                                            {country ? country.name : "Select Country"}
                                        </span>
                                        <span className={`flex text-sm transition-transform ${iscountryOpen ? "rotate-180" : ""}`}><ChevronDown size={15} /></span>
                                    </div>

                                    {iscountryOpen && (
                                        <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1 animate-in fade-in zoom-in duration-200">
                                            {countries.map((c) => (
                                                <li
                                                    key={c.isoCode}
                                                    onClick={() => {
                                                        setcountry(c);
                                                        setIscountryOpen(false);

                                                    }}
                                                    className="px-4 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm text-gray-700 flex justify-between items-center transition-colors"
                                                >
                                                    {c.name}
                                                    {country?.isoCode === c.isoCode && <span className="text-blue-600 font-bold">✓</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Phone Number</label>
                                    <div className="relative">
                                        <div
                                            className="relative w-full h-9 text-sm border border-gray-300 rounded-xl flex items-center justify-between bg-white cursor-pointer transition-all shadow-sm"
                                        >
                                            <input type="text" name='phonenumber' value={phonenumber} onChange={(e) => {
                                                setphonenumber(e.target.value)

                                            }} className="border border-gray-200 outline-none focus:border-blue-500 rounded-xl w-full py-2 px-16" />
                                            <span className="absolute flex items-center text-gray-900 px-3">{country ? country?.phonecode : '13'} <span className="text-gray-300 ml-3">|</span></span>
                                        </div>
                                    </div>
                                </div>

                            </div>



                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Address (State & City)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative w-full">
                                        <div
                                            onClick={() => setisstateOpen(!isstteOpen)}
                                            className="w-full text-sm h-9 border border-gray-300 rounded-xl px-4 flex items-center justify-between bg-white cursor-pointer hover:border-blue-500 transition-all shadow-sm"
                                        >
                                            <span className={state ? "text-gray-900" : "text-gray-400"}>
                                                {state ? state.name : 'Select State'}
                                            </span>
                                            <span className={`flex  text-sm transition-transform ${isstteOpen ? 'rotate-180' : ''}`}><ChevronDown size={15} /></span>
                                        </div>


                                        {isstteOpen && (

                                            <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1 animate-in fade-in zoom-in duration-200">
                                                {country && states.map((s, i) => (
                                                    <li key={i} onClick={() => {
                                                        setstate(s)
                                                        setisstateOpen(false)

                                                    }}
                                                        className="px-4 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm text-gray-700 flex justify-between items-center transition-colors"
                                                    >
                                                        {s.name}
                                                        {s.isoCode === state?.isoCode && <span className="text-blue-600 font-bold">✓</span>}
                                                    </li>
                                                ))}

                                            </ul>

                                        )}

                                    </div>


                                    <div className="relative">
                                        <div onClick={() => setiscityOpen(!iscityOpen)}
                                            className="w-full h-9 text-sm border border-gray-300 rounded-xl px-4 flex items-center justify-between bg-white cursor-pointer hover:border-blue-500 transition-all shadow-sm"
                                        >
                                            <span className={`${city ? 'text-gray-900' : 'text-gray-300'}`}>

                                                {city ? city.name : "Select City"}
                                            </span>
                                            <span className={`flex gap-2 text-sm transition-transform ${iscityOpen ? 'rotate-180' : ''}`}><ChevronDown size={15} /></span>
                                        </div>

                                        {iscityOpen && (
                                            <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-1 animate-in fade-in zoom-in duration-200">
                                                {states && cities.map((c, i) => (
                                                    <li key={i}
                                                        onClick={() => {
                                                            setcity(c)
                                                            setiscityOpen(false)

                                                        }}
                                                        className="px-4 py-2.5 hover:bg-blue-50 rounded-lg cursor-pointer text-sm text-gray-700 flex justify-between items-center transition-colors"
                                                    >
                                                        {c.name}
                                                        {city?.name === c.name && <span className="text-blue-600 font-bold">✓</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="flex gap-2 text-sm px-3">
                        <button
                            onClick={() => setisbuttonclicked(!isbuttonclicked)}
                            className={`p-1 rounded-lg border  text-white  ${isbuttonclicked ? 'bg-red-600 border-red-300' : 'border-gray-300 bg-none'}`}><Check size={14} className={`${isbuttonclicked ? 'opacity-100' : 'opacity-100'}`} /></button>
                        Set as default shipping Address
                    </span>

                    <span className='flex gap-3'>
                        <button
                            onClick={handleconfitm}
                            className='px-12 py-2 text-center cursor-pointer hover:scale-102 text-white rounded-2xl bg-red-600 shadow-md'>Confirm</button>
                        <button onClick={() => setshowform(false)} className='px-12 py-2 text-center cursor-pointer hover:scale-102 rounded-2xl bg-white/80 border text-slate-900 border-slate-400 shadow-md'>Cancel</button>
                    </span>
                    <p className="text-red-600 text-sm ">{error}</p>
                </div>
            )}
        </div>
    )
}
export default Usershippingaddress
