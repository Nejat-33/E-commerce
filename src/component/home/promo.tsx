
import { ArrowRight, Clock, ShoppingBag, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EnrichedProduct, products } from '../common/products';
import { applyDiscount } from '../common/applyDiscount';
import { Link, useNavigate } from 'react-router-dom';

interface time {
    day: number;
    hour: number;
    minute: number;
    second: number;
}

interface Timeunitprops {
    Time: number;
    lable: string
}


function Promo() {
    const [products, setproducts] = useState<EnrichedProduct[]>([])
    const navigate = useNavigate()
    let productcategory: any
    let percentoff
    if (products) {
        productcategory = products.length > 0 ? products[0].category : "Loading..."
        percentoff = products.length > 0 ? products[0].percentOff : 0
    }
    const [timeleft, settimeleft] = useState<time>({ day: 0, hour: 0, minute: 5, second: 30 })
    const isofferclosed = timeleft.day === 0 && timeleft.hour === 0 && timeleft.minute === 0 && timeleft.second === 0
    useEffect(() => {
        const getproduct = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) throw new Error('fetch fail')
                const data = await response.json()
                const discounteddata: EnrichedProduct[] = data.map((item: products) => applyDiscount(item))
                const filtereddata = discounteddata.filter(item => item.hasDiscount)
                setproducts(filtereddata)
            } catch (error) {
                console.log("error fetching", error);

            }

        }
        getproduct()


        const timer = setInterval(() => {
            settimeleft((prev) => {
                if (prev.second > 0) {
                    return { ...prev, second: prev.second - 1 }
                }
                if (prev.minute > 0) {
                    return { ...prev, minute: prev.minute - 1, second: 59 }
                }
                if (prev.hour > 0) {
                    return { ...prev, hour: prev.hour - 1, minute: 59, second: 59 }
                }
                if (prev.day > 0) {
                    return { ...prev, day: prev.day - 1, hour: 59, minute: 59, second: 59 }
                }
                clearInterval(timer)
                return prev
            })
        }, 1000);
        return () => clearInterval(timer)

    }, [])

    const handleview = (category: string) => {
        if (category) {
            navigate(`/products?category=${category}`)
        }
    }


    const Timeunit: React.FC<Timeunitprops> = ({ Time, lable }) => {
        return (
            <div className='flex flex-col gap-y-1 w-1/4 items-center text-white justify-center border border-white/30 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md shadow-xl min-w-15 md:min-w-17'>
                <span className='font-bold text-xl'>{Time}</span>
                <span className='text-xs text-white/80'>{lable}</span>
            </div>
        )
    }


    return (
        <div className='min-h-60vh bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8'>
            <div className='p-5 relative w-full max-w-6xl overflow-hidden rounded-4xl shadow-2xl group flex flex-col lg:flex-row '>

                <div className="absolute inset-0 bg-linear-to-r from-indigo-900 via-purple-900 to-slate-900 ">
                    <img
                        src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=2000"
                        alt="Men's Fashion"
                        className="w-full h-full object-cover mix-blend-overlay opacity-60 scale-105 group-hover:scale-100 transition-transform duration-700"
                    />

                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-indigo-500/20 to-transparent skew-x-12 transform translate-x-20"></div>
                </div>

                <div className='z-10 relative flex flex-col  px-8 py-10 md:px-16 md:py-14 items-center justify-center gap-y-7'>
                    <span className='flex items-center gap-3 bg-indigo-500/20 text-white/80 border border-indigo-400/30 backdrop-blur-md  px-4 py-1  rounded-full  text-sm'>
                        <Zap size={20} className='' />
                        LIMITED TIME OFFER
                    </span>
                    <div className='space-y-2'>
                        <p className='capitalize mb-3 text-white font-black text-4xl text-center'> up to <span className={`text-indigo-600 ${isofferclosed ? 'line-through' : ''}`}>{percentoff}% off in </span>{productcategory}</p>
                        <p className='text-sm text-gray-300 text-center'>Elevate your wardrobe with our premium futuristic collection. Precision cuts meet high-performance fabrics</p>
                    </div>

                    <button onClick={() => handleview(productcategory)} disabled={isofferclosed} className={`px-8 py-5 rounded-3xl flex gap-3 font-bold bg-white text-black  ${isofferclosed && 'text-red-600 cursor-not-allowed'}`}><ShoppingBag size={24} />
                        {isofferclosed ? 'Expired' : 'Shop Now'}<ArrowRight size={24} />
                    </button>


                    <div className='flex items-center gap-2'>
                        <div className='flex -space-x-2'>
                            {[1, 2, 3].map(i => (
                                <span key={i} className='w-8 h-8 border-2 bg-slate-800 border-indigo-900 rounded-full flex items-center justify-center overflow-hidden'>
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="profile" />
                                </span>
                            ))}
                        </div>
                        <span className='text-sm text-slate-300 font-bold italic'>1.2k People viewing</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-y-5'>
                    <div className='flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40  gap-3 px-5 py-6 bg-linear-to-br from-indigo-600 to-purple-700 rounded-full border-5 border-violet-600 z-30'>
                        <span className='text-white/80'>SAVE</span>
                        <span className={`text-3xl font-black tracking-tighter ${isofferclosed && 'line-through'}`}>-{percentoff}%</span>
                    </div>
                    <p className='text-gray-300 flex items-center gap-2 text-sm'><Clock size={16} />ENDING IN</p>
                    <div className='flex justify-between gap-x-5'>
                        <Timeunit Time={timeleft.day} lable={'DAYS'} />
                        <Timeunit Time={timeleft.hour} lable={'HOUR'} />
                        <Timeunit Time={timeleft.minute} lable={'MINUTE'} />
                        <Timeunit Time={timeleft.second} lable={'SECOND'} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Promo
