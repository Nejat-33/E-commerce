import { faArrowUpRightFromSquare, faCreditCard, faGlobe, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons/faRotateLeft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react';
import StarRating from '../common/Rating';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import Feturedproduct from './feturedproduct';
import { addtorecent } from '../common/products';
import { Link, useNavigate } from 'react-router-dom';
import addCart from '../common/cartdata';

export interface products {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating: { rate: number, count: number }
}



function Categorysections() {
    const [category, setcategory] = useState<string[]>([])
    const [products, setproducts] = useState<products[]>([])
    const [current, setCurrent] = useState<Record<string, number>>({})
    const [visibilitycount, setvisibilitycount] = useState(2)
    const navigate = useNavigate()

    const next = (cartname: string, totalitem: number) => {
        setCurrent(prev => ({
            ...prev,
            [cartname]: Math.min((prev[cartname] || 0) + 1, totalitem - 1)
        }
        ))

    }

    const previous = (cartname: string) => {
        setCurrent(prev => ({ ...prev, [cartname]: Math.max((prev[cartname] || 0) - 1, 0) }))
    }


    useEffect(() => {
        const getproduct = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error('error in fething data')
                }
                const data: products[] = await response.json()
                setproducts(data)
                const uniquecategory = [...new Set(data.map(p => p.category))]
                setcategory(uniquecategory)
            } catch (error) {
                console.error('error', error);
            }
        }
        getproduct()
    }, [])

    const handelexplore = () => {
        setvisibilitycount(prev => prev + 2)
    }

    const handleview = (category: string) => {

        if (category) {
            navigate(`/products?category=${category}`)
        }

    }


    console.log('length of category', category.length);


    return (
        <div className='mb-10'>
            <div className="bg-gray-50 border-y border-gray-100 mt-6 mb-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                <FontAwesomeIcon icon={faTruckFast} className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Free Delivery</h4>
                                <p className="text-xs text-gray-500 mt-1">On all orders over $50</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Secure Payment</h4>
                                <p className="text-xs text-gray-500 mt-1">100% protected checkout</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Easy Returns</h4>
                                <p className="text-xs text-gray-500 mt-1">30-day money back guarantee</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <FontAwesomeIcon icon={faGlobe} className="text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">World Shipping</h4>
                                <p className="text-xs text-gray-500 mt-1">Available in 50+ countries</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div>
                <Feturedproduct products={products} />
            </div>


            <div className='max-w-7xl mx-auto px-4'>
                <div className='space-y-12'>
                    {category.slice(0, visibilitycount).map((cat, index) => {
                        const filteredproduct = products.filter(p => p.category === cat);
                        const startingindex = current[cat] || 0;

                        return (
                            <div key={index} className='mt-8'>

                                <div className='flex justify-between items-end mb-6'>
                                    <div>
                                        <span className='capitalize font-black text-3xl tracking-tight dark:text-white'>{cat}</span>
                                        <div className='h-1 w-12 bg-indigo-500 mt-1 rounded-full'></div>
                                    </div>

                                    <a onClick={() => handleview(cat)} className='text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:gap-3 transition-all cursor-pointer'>
                                        View More <ChevronRight size={18} />
                                    </a>
                                </div>
                                <div className='relative flex flex-wrap lg:flex-nowrap items-stretch justify-start gap-5 mt-6'>

                                    <button
                                        onClick={() => previous(cat)}
                                        disabled={startingindex === 0}
                                        className='absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 p-2 z-30 shadow-xl border border-gray-100 dark:border-slate-700 transition-all rounded-full disabled:opacity-0 hover:scale-110 active:scale-95'
                                    >
                                        <ChevronLeft size={24} className="dark:text-white" />
                                    </button>

                                    {filteredproduct.slice(startingindex, startingindex + 4).map((product) => (
                                        <div key={product.id} onClick={() => addtorecent(product)} className='group relative w-full sm:w-[calc(50%-1.25rem)] lg:w-1/4 p-5 border border-gray-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2'>
                                            <Link to={`/product/${product.id}`}>
                                                <div className='w-full h-48 flex justify-center mb-6 items-center overflow-hidden bg-gray-50 dark:bg-slate-800/50 rounded-2xl'>
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className='object-contain h-3/4 group-hover:scale-110 transition-transform duration-700'
                                                    />
                                                </div>
                                            </Link>

                                            <div className='space-y-2'>
                                                <p className='text-sm font-bold dark:text-gray-200 line-clamp-1'>{product.title}</p>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-red-600 text-xl font-black'>${product.price}</span>
                                                    <span className='line-through text-gray-400 dark:text-gray-500 text-xs'>${(product.price * 1.3).toFixed(2)}</span>
                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <StarRating rate={product.rating.rate} />
                                                    <span className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{product.rating.count} sold</span>
                                                </div>
                                            </div>

                                            <div className='opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out mt-5'>
                                                <button onClick={() => addCart(product)} className='group/btn w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none'>
                                                    Add to Cart
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-xs group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        disabled={startingindex + 4 >= filteredproduct.length}
                                        onClick={() => next(cat, filteredproduct.length)}
                                        className='absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 p-2 z-30 shadow-xl border border-gray-100 dark:border-slate-700 transition-all rounded-full disabled:opacity-0 hover:scale-110 active:scale-95'
                                    >
                                        <ChevronRight size={24} className="dark:text-white" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {visibilitycount < category.length && (
                    <div className='flex items-center justify-center py-20'>
                        <button onClick={handelexplore} className='group border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 px-10 py-4 rounded-2xl font-black text-gray-800 dark:text-white transition-all hover:shadow-2xl hover:shadow-indigo-100 dark:hover:shadow-none flex items-center gap-4'>
                            EXPLORE MORE
                            <FontAwesomeIcon icon={faArrowDown} className='group-hover:translate-y-1 transition-transform text-indigo-600' />
                        </button>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Categorysections