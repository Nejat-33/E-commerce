import { useParams } from "react-router-dom"
import { products, addtorecent } from "../common/products"
import { useEffect, useState } from "react"
import StarRating from "../common/Rating"
import { Award, ChevronRight, Heart, ShieldCheck } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast"
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons"
import addWishlist from "../common/wishlist"
import { applyDiscount } from "../common/applyDiscount"
import { EnrichedProduct } from "../common/products"


function Leftside() {
    const { id } = useParams()
    const [product, setproducts] = useState<EnrichedProduct>()
    const [activeimage, setactiveimage] = useState<string>()
    const [ishovered, setishoverd] = useState(false)

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                const data: products = await response.json()
                const finpro = applyDiscount(data)
                setproducts(finpro)
                setactiveimage(data.image)
                addtorecent(data)
            } catch (error) {
                console.error('error produced', error);
            }
        }
        getdata()
    }, [id])

    if (!product) return <div>Product not found</div>
    const image = [product.image, product.image, product.image, product.image]

    return (
        <div className="mt-8 mb-10">

            <div className='flex flex-col lg:flex-row gap-5 '>
                <div className="w-full lg:w-[40%] flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex flex-row md:flex-col gap-2 shrink-0">
                        {image.map((im, index) => (
                            <div key={index} onMouseEnter={() => setactiveimage(im)}
                                className="cursor-pointer rounded-xl border-2 w-16 h-16 shrink-0 bg-white overflow-hidden">
                                <img src={im} alt="thumbnail" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                    <div className="group w-full bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center min-h-100 md:min-h-125">
                        <img src={activeimage} alt={product.title} className="max-h-87.5 md:max-h-112.5 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-5 w-full">
                    <span className="capitalize text-xs py-2 px-4 bg-orange-100 w-fit rounded-full dark:text-slate-900">
                        {product.category}
                    </span>
                    <p className="text-3xl capitalize text-indigo-600 dark:text-white font-black">{product.title}</p>
                    <div className="flex gap-3">
                        <span ><StarRating rate={product.rating.rate} /></span>
                        <span className="text-xs text-slate-600 dark:text-yellow-400">{product.rating.count}+ SOLD</span>
                    </div>
                    <p className="text-xs capitalize text-slate-600 dark:text-white/80">{product.description}</p>
                    <div className="relative flex flex-col  gap-5 font-black px-8 py-8 rounded-2xl bg-indigo-500 dark:bg-indigo-600 backdrop-blur-md border-gray-50 shadow-2xl  overflow-hidden text-white z-10">
                        <div className="absolute top-1/6 right-0 hidden md:block md:right-10 w-1/3 z-0">
                            <Award size={100} className="text-indigo-600 dark:text-indigo-700 w-full" />
                        </div>
                        <div className="flex gap-5 items-center z-1">
                            <p className="text-4xl text-white">${product.discountPrice}</p>
                            <p className="text-xl text-gray-400 line-through">${product.price}</p>
                            <p className="px-2 py-1 text-sm font-bold bg-white/10 backdrop-blur-md rounded-lg tracking-widest">{product.percentOff}% Off</p>
                        </div>
                        <p className="text-sm upper ">Flash deal ends in 14:22:10</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>
                            <div className="flex gap-2">
                                <div className="bg-indigo-600 w-0.5 h-7 rounded-2xl inline-block"></div>
                                <p className="font-bold mb-2">Color</p>
                            </div>
                            <div className="flex items-center gap-4 ml-2">
                                <span className="w-5 cursor-pointer h-5 rounded-full bg-black hover:scale-120"></span>
                                <span className="w-5 cursor-pointer h-5 rounded-full bg-blue-600 hover:scale-120"></span>
                                <span className="w-5 cursor-pointer h-5 rounded-full bg-orange-900 hover:scale-120"></span>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <div className="bg-indigo-600 w-0.5 h-7 rounded-2xl inline-block"></div>
                                <p className="font-bold mb-2 text-lg">Size</p>
                            </div>
                            <div className="flex items-center gap-3 w-full rounded-2xl ml-2 ">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                                    <span key={i} className="p-2 w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gray-200 hover:scale-110 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white transition-all duration-500 ease-in-out">{size}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <aside className=" flex flex-col gap-6 w-full lg:w-87.5 text-sm sticky top-20 border border-gray-300 p-4 dark:border-white/20">

                    <div onMouseEnter={() => setishoverd(true)} onMouseLeave={() => setishoverd(false)} className="flex gap-2 items-center relative">
                        <p className="font-bold dark:text-indigo-500">Sold by</p>
                        <span className="tracking-wide">Shop1105230713 Store</span>
                        <ChevronRight size={15} />

                        {ishovered && (
                            <div className="absolute top-7 right-0 text-sm w-full border border-gray-100 rounded-2xl px-5 py-3 z-30 bg-white flex flex-col gap-3 shadow-lg">
                                <p className="font-black text-center">Store info</p>
                                <span className="flex justify-between items-center">Name: <span>Shop1105230713 Store</span></span>
                                <span className="flex justify-between items-center">Store No: <span>Shop1105230713 Store</span></span>
                                <span className="flex justify-between items-center ">Location: <span>China</span></span>
                                <span className="flex justify-between items-center">Open Since: <span>2020</span></span>
                            </div>
                        )}
                    </div>

                    <div className="h-0.5 bg-gray-200 dark:bg-white/20"></div>
                    <div className="flex flex-col tracking-wide gap-4">
                        <p className="tracking-wider bg-linear-to-br from-green-100 via-green-50 to-white py-2 dark:bg-none font-bold">Service commitment</p>
                        <div className="flex flex-col">
                            <p className="font-bold"> <FontAwesomeIcon icon={faTruckFast} className="text-green-400 mr-1" />
                                Shipping: <span className="text-lg dark:text-indigo-500">${product.price}</span></p>
                            <p className="ml-6">Delivery:<span className="font-bold dark:text-indigo-500">Apr.10</span></p>
                        </div>
                        <span className="flex items-center justify-between gap-1"><span><FontAwesomeIcon icon={faArrowRotateLeft} className="text-green-400" /> Return and Refund policy </span><ChevronRight size={15} /></span>
                        <span className="flex items-center justify-between gap-1"> <span className="flex gap-1"><ShieldCheck size={18} className="text-green-400" /> Security and Privacy</span><ChevronRight size={15} /></span>
                    </div>
                    <div className="h-0.5 bg-gray-200 dark:bg-white/20"></div>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold">Quantity</p>
                        <div className=" flex items-center gap-2">
                            <button className="px-2 py-1 rounded-full bg-gray-200 text-slate-900 dark:hover:bg-indigo-600 transition-all duration-500">-</button>
                            <span>count</span>
                            <button className="px-2 py-1 rounded-full bg-gray-200 text-slate-900 dark:hover:bg-indigo-600 transition-all duration-500">+</button>
                        </div>
                        <button className="cursor-pointer bg-red-500 font-bold py-3 tracking-wider">Buy now</button>
                        <span className="flex gap-2 w-full">
                            <button className="cursor-pointer border tracking-wider w-full py-3 bg-gray-100 dark:text-slate-900 text-center font-bold">Add to cart</button>
                            <button onClick={() => addWishlist(product)} className="cursor-pointer border tracking-wider w-full py-3 bg-gray-100 dark:text-slate-900 font-bold flex items-center justify-center gap-3"><Heart size={15} />Wishlist</button>
                        </span>
                    </div>


                </aside>

            </div>
        </div>


    )
}

export default Leftside