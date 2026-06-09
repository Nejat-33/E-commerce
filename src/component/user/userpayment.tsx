import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Check, Cpu } from 'lucide-react'
import { useEffect, useState } from 'react'

function Userpayment() {
    const [isclicked, setisclicked] = useState(false)
    const [form, setform] = useState({
        cardnumber: '', cardholder: '', mm: '', yy: '', cw: ''
    })
    const [defaultcard, setdefaultcard] = useState<any>()

    useEffect(() => {
        const defaultcard = localStorage.getItem('default-card')
        if (defaultcard) {
            const parse = JSON.parse(defaultcard)
            setdefaultcard(parse)
        }
    }, [])

    const handlecard = () => {
        if (isclicked) {
            localStorage.setItem('default-card', JSON.stringify(form))
            setdefaultcard(form)
            setform({
                cardnumber: '', cardholder: '', mm: '', yy: '',
                cw: ''
            })
        }
    }

    const handledelete = () => {
        localStorage.removeItem('default-card')
        setdefaultcard(null)
    }

    const handleedit = () => {
        setform(defaultcard)
    }

    return (
        <div className=' space-y-8 rounded-2xl w-3/5'>
            <p className='text-xl font-bold'>Payment information</p>
            {defaultcard && (
                <div className='rounded-2xl px-6 py-5 bg-white space-y-5'>
                    <p className='font-bold text-xl'>My saved card</p>
                    <div className='flex gap-8 w-full'>
                        <div className='w-4/5 rounded-2xl px-4 py-6 flex flex-col gap-5  items-center bg-slate-900'>
                            <span className='flex justify-between items-center gap-15 text-white font-bold'><Cpu size={35} className='text-amber-500' /> VISA</span>
                            <div className='grid grid-cols-2 gap-x-14 justify-between text-white font-bold text-lg'>
                                <span>****</span>
                                <span>****</span>
                                <span>****</span>
                                <span>4567</span>
                            </div>
                        </div>
                        <div className='w-full bg-gray-100 px-5 rounded-2xl py-2 space-y-2'>
                            <p className='font-bold flex justify-between text-gray-500 '>Status
                                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-lg'>
                                    Default
                                </span>
                            </p>
                            <p className='flex justify-between text-gray-400 text-sm'>Card Holder
                                <span>{defaultcard.cardholder}</span>
                            </p>
                            <p className='flex justify-between text-gray-400 text-sm'>Card Number
                                <span>**** **** **** 4537</span>
                            </p>
                            <span className='flex  text-sm items-center gap-8  py-3 rounded-xl'>
                                <button onClick={handleedit} className='px-10 cursor-pointer py-2 hover:scale-102  bg-white rounded-xl border border-blue-700/40'>Edit</button>
                                <button onClick={handledelete} className='px-10 cursor-pointer hover:scale-102 py-2 bg-white rounded-xl border border-red-600/40'>Remove</button>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className='space-y-8 bg-white px-6 py-5'>
                <p className='flex gap-3 text-sm items-center'>
                    <FontAwesomeIcon icon={faCreditCard} className='flex text-lg ' />
                    Add a new card
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="mastercard" className='w-8 h-8' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="paypa" className='w-10 h-10' />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="visa" className='w-8 h-8' />
                </p>
                <div className='space-y-6'>
                    <div className='grid grid-cols-2 text-sm gap-y-8 gap-x-3'>

                        <input type="text"
                            onChange={(e) => setform({ ...form, cardnumber: e.target.value })}
                            value={form.cardnumber}
                            placeholder='Card Number'
                            className='border border-gray-200 px-6 py-1  outline-none focus-ring-1 rounded-lg focus:border-blue-700 focus:ring-blue-700' />
                        <input type="text"
                            onChange={(e) => setform({ ...form, cardholder: e.target.value })}
                            value={form.cardholder}
                            placeholder='Cardholder Name'
                            className='border border-gray-200 px-6 py-1  outline-none focus-ring-1 rounded-lg focus:border-blue-700 focus:ring-blue-700' />

                        <div className='grid grid-cols-2 gap-2'>
                            <input type="text"
                                onChange={(e) => setform({ ...form, mm: e.target.value })}
                                value={form.mm}
                                placeholder='MM'
                                className='border border-gray-200 px-6 py-1  outline-none focus-ring-1 rounded-lg focus:border-blue-700 focus:ring-blue-700' />
                            <input type="year"
                                onChange={(e) => setform({ ...form, yy: e.target.value })}
                                value={form.yy}
                                placeholder='YY'
                                className='border border-gray-200 px-6 py-1  outline-none focus-ring-1 rounded-lg focus:border-blue-700 focus:ring-blue-700' />
                        </div>
                        <input type="text"
                            onChange={(e) => setform({ ...form, cw: e.target.value })}
                            value={form.cw}
                            placeholder='CW'
                            className='border  border-gray-200 px-6 py-1  outline-none focus-ring-1 rounded-lg focus:border-blue-700 focus:ring-blue-700' />
                    </div>
                    <span className='flex gap-3 items-center text-sm'>
                        <button
                            onClick={() => setisclicked(!isclicked)}
                            className={`rounded-full px-1 py-1 border border-gray-400 ${isclicked ? 'bg-red-500 border-red-300' : 'bg-none'}`}><Check size={14} className={`${isclicked ? 'opacity-100' : 'opacity-0'} transition-opacity text-white duration-100`} /></button>
                        Save card details
                    </span>

                </div>


            </div>
            <div className='flex mt-4 items-center justify-center'>

                <button onClick={handlecard} className='bg-red-500 w-1/2 rounded-2xl py-1.5 cursor-pointer hover:scale-102 text-white text-center'>View and Confirm</button>
            </div>
        </div>
    )
}

export default Userpayment
