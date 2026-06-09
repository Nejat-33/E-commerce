import { useEffect, useState } from 'react'
import { products } from '../common/products'
import StarRating from '../common/Rating'
import { Edit, Plus, Share2, Trash2 } from 'lucide-react'
import addCart from '../common/cartdata'




function Wishhlist() {
    const [activeid, setactiveid] = useState<number | null>(null)
    const [products, setproducts] = useState<products[]>([])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setproducts(data)

    }, [products])

    const handledelete = (product: products) => {
        const filtered = products.filter(products => products != product)
        localStorage.setItem('wishlist', JSON.stringify(filtered))
        setproducts([])
    }

    const handleshare = async () => {
        const url = window.location.href

        if (navigator.share) {
            await navigator.share({
                title: 'My wishlist',
                url
            })
        } else {
            await navigator.clipboard.writeText(url)
            alert('link copied')
        }
    }

    const nav = [
        { items: 'All Items', count: 0 },
        { items: "Price Dropped", count: 3 },
        { items: 'Avalilable', count: 10 },
        { items: 'Out of Stock', count: 2 }
    ]

    return (
        <div className='w-full space-y-7'>
            <div className='flex justify-between items-center'>
                <span className='inline-block w-full'>
                    <p className='text-xl font-bold'>Wishlist</p>
                    <span className='text-gray-400 text-xs'>12 items saved to your faverites</span>
                </span>
                <div className='flex gap-3'>
                    <button onClick={handleshare} className='bg-white flex items-center gap-2 px-10 cursor-pointer py-1.5 text-sm rounded-2xl font-black border border-slate-300'>
                        <Share2 size={15} className='font-black' />
                        Share
                    </button>
                    <button className='bg-white px-10 py-1.5 flex items-center gap-2 cursor-pointer text-sm rounded-2xl font-black border border-slate-300'>
                        <Edit size={15} />
                        Manage</button>
                </div>
            </div>

            <div className='bg-white px-4 py-5 rounded-2xl'>

                <ul className='relative flex justify-between mb-5 '>
                    {nav.map((item, i) => (
                        <li key={i} onClick={() => setactiveid(i)} className={`relative group cursor-pointer hover:text-indigo-500 ${activeid === i ? 'text-indigo-600' : 'text-black'}`}>
                            {item.items} ({item.count})

                            <span className={`absolute group-hover:opacity-100 opacity-0  transition-all ease-in-out duration-500 w-full top-10 left-0 bg-indigo-500 h-0.75 rounded-full ${activeid === i && 'opacity-100'}`}></span>
                        </li>
                    ))}

                </ul>
                <div className='h-[1px] bg-gray-100 -ml-1 -mr-1'></div>
                <div className='grid grid-cols-3 gap-7 mt-8'>
                    {products && products.map((product, index) => (
                        <div key={index} className=''>
                            <div className='bg-gray-100 w-full rounded-2xl   h-50 flex items-center justify-center'>
                                <img src={product.image} alt="product" className='object-contain w-full h-5/6' />
                            </div>
                            <p className='text-sm mt-2 font-bold'>{product.title}</p>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <span className='font-bold text-lg text-red-500'>${(product.price).toFixed(2)} <span className='text-gray-400 text-xs line-through'>{(product.price * 1.3).toFixed(2)}</span></span>
                                    <span className='text-xs'><StarRating rate={product.rating.rate} />| <span>{product.rating.count}</span></span>
                                </div>
                                <div className='flex justify-center items-center flex-col gap-2'>
                                    <Trash2 onClick={() => handledelete(product)} size={18} className='hover:text-red-600' />
                                    <span onClick={() => addCart(product)} className='p-2 bg-indigo-100 rounded-xl'><Plus size={20} className='' /></span>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Wishhlist
