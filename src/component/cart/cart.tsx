import { HeartPlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react"
import Trancate from "../common/trancate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import addWishlist from "../common/wishlist";

interface products {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    quantity: number;
    rating: { rate: number, count: number }
}


function Cart() {
    const [cartproducts, setcartproducts] = useState<products[]>([])
    const [count, setcount] = useState(0)
    const [selectedproduct, setselectedproduct] = useState<number[]>([])
    const [itemstotal, setitemstotal] = useState<number>()
    const [itemsdiscount, setitemsdiscount] = useState<number>(0)
    const [subtotal, setsubtotal] = useState<number>()
    const navigate = useNavigate()
    const payment = [
        'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
    ]

    const toggle = (id: number) => {
        setselectedproduct(prev =>
            prev.includes(id) ?
                prev.filter(pId => pId != id) : [...prev, id]
        )
    }

    const updatequntity = (id: number, delta: number) => {
        const updatecart = cartproducts.map((p) => {
            if (p.id === id) {
                const newquan = (p.quantity || 1) + delta
                return { ...p, quantity: newquan > 1 ? newquan : 1 }
            }
            return p
        })
        setcartproducts(updatecart)
        localStorage.setItem('cart', JSON.stringify(updatecart))
    }

    const deleteproduct = (id: number) => {
        setcartproducts(prev => {
            const updatechange = prev.filter(product => product.id !== id)
            localStorage.setItem('cart', JSON.stringify(updatechange))
            window.dispatchEvent(new Event('cart-updated'))
            return updatechange
        })
        setselectedproduct(prev => prev.filter(previd => previd !== id))
    }

    const deleteselectedproduct = () => {
        setcartproducts(prev => {
            const updatechange = prev.filter(product => !selectedproduct.includes(product.id))
            localStorage.setItem('cart', JSON.stringify(updatechange))

            window.dispatchEvent(new Event('cart-updated'))
            return updatechange
        })
        setselectedproduct([])
    }

    const handleselectall = () => {
        const allid = cartproducts.map(p => p.id)
        if (selectedproduct.length === cartproducts.length && cartproducts.length > 0) {
            setselectedproduct([])
        } else {
            setselectedproduct(allid)
        }
    }

    const handlecheckout = () => {
        const checkoutproducts = cartproducts.filter(product => selectedproduct.includes(product.id))
        localStorage.setItem('checkout-products', JSON.stringify(checkoutproducts))
        navigate('checkout', { replace: true })
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart') || '[]')
        setcount(data.length)
        setcartproducts(data)
    }, [])

    useEffect(() => {
        const sumdiscount = cartproducts.reduce((sum, p) => {
            if (selectedproduct.includes(p.id)) {
                return sum + (p.price * (p.quantity || 1))
            }
            return sum
        }, 0)
        const sunprice = cartproducts.reduce((sum, p) => {
            if (selectedproduct.includes(p.id)) {
                return sum + (p.price * 1.3 * (p.quantity || 1))
            }
            return sum
        }, 0)

        let discount = sunprice - sumdiscount
        setitemsdiscount(discount)
        setitemstotal(sunprice)
        setsubtotal(sumdiscount)

    }, [selectedproduct, cartproducts])



    return (
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 max-w-7xl mx-auto p-2">
            <Outlet />
            <div className=" flex flex-col p-4 w-full md:w-3/5 gap-3">
                <span className="font-bold text-lg tracking-wider">Cart({count})</span>
                <div className="text-sm flex gap-12 p-4 ">
                    <div className="text-sm flex gap-2">
                        <button onClick={handleselectall} className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${selectedproduct.length === cartproducts.length && cartproducts.length > 0
                            ? "bg-red-600 border-red-600"
                            : "bg-white border-gray-400"}`}>
                            {selectedproduct.length === cartproducts.length && cartproducts.length > 0 && (
                                <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                            )}

                        </button>
                        Select all item
                    </div>
                    <span onClick={() => deleteselectedproduct()} className="hover:text-red-500 hover:underline cursor-pointer">Delete selected item</span>
                </div>
                <div className="space-y-8">
                    {cartproducts.map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 bg-white px-3 py-4 rounded-2xl">
                            <div className="w-40 flex gap-4 items-center">
                                <div className="relative">
                                    <button
                                        onClick={() => toggle(product.id)}
                                        className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${selectedproduct.includes((product.id))
                                            ? "bg-red-600 border-red-600"
                                            : "bg-white border-gray-400"}
                                           `}>
                                        {selectedproduct.includes(product.id) && (
                                            <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                                        )}
                                    </button>
                                </div>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="object-contain bg-gray-200 p-2 rounded-2xl w-20 h-20"
                                />

                            </div>
                            <div className="flex justify-between items-start w-full">
                                <div className="text-xs flex flex-col justify-center gap-2">
                                    <div>
                                        <span className="bg-red-400 p-0.5 mr-2">Sale</span>
                                        <Trancate description={product.description} />
                                    </div>
                                    <p className="text-gray-400">{product.title}</p>
                                    <div className="flex gap-2 items-center px-2 py-1 rounded-lg bg-red-200 w-1/3 md:full">
                                        <span className="text-sm font-black text-red-600 tracking-wide">${product.price}</span>
                                        <span className="text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 font-black">Quantity:
                                        <div className="flex gap-2 items-center">
                                            <span onClick={() => updatequntity(product.id, -1)} className="px-2 py-1 bg-gray-200 rounded-full cursor-pointer">-</span>
                                            {product.quantity}
                                            <span onClick={() => updatequntity(product.id, 1)} className="px-2 py-1 cursor-pointer bg-gray-200 rounded-full">+</span>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 text-[11px]">Shipping: Free</span>
                                    <span className="text-gray-400 text-[11px]">shop12345store</span>
                                </div>
                                <div className="flex gap-3 mr-0">
                                    <span onClick={() => addWishlist(product)} className=""><HeartPlus size={18} className="hover:fill-red-600 hover:text-red-600 transition-all duration-200" /></span>
                                    <span onClick={() => deleteproduct(product.id)}><Trash2 size={18} className="hover:text-red-600" /></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="w-full md:w-1/3 p-4 md:py-29 flex flex-col gap-3 sticky top-5">
                <div className="flex flex-col gap-2 p-3  bg-white rounded-2xl">
                    <p className="font-bold  text-xl">Summary</p>
                    <div className="flex gap-2">
                        {cartproducts.map((product, i) => selectedproduct.includes(product.id) && (
                            <div key={i} className="bg-gray-200 rounded-2xl p-2 w-20 h-20">
                                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                            </div>
                        ))}
                    </div>

                    <div className="text-sm flex flex-col justify-center gap-3">
                        <div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-xs">Items Total:</span>
                                <span className="line-through">${(itemstotal)?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-xs">Items Discount:</span>
                                <span className="text-red-400">-${(itemsdiscount).toFixed(2)}</span>
                            </div>

                        </div>
                        <div className="flex justify-between font-bold">
                            <span className=" text-sm">Sub Total</span>
                            <span>${(subtotal)?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span className="">Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="text-xl flex justify-between font-bold">
                            <span className="">Estimate total</span>
                            <span>${(subtotal)?.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link to='/checkout' className="bg-red-600 py-4 font-bold rounded-2xl text-center text-white">
                        <button onClick={() => handlecheckout()}>Checkout ({selectedproduct.length})</button>
                    </Link>
                </div>

                <div className="bg-white p-3 rounded-2xl">
                    <p className="text-lg font-bold">Pay with</p>
                    <div className="flex gap-3 ">
                        {payment.map((p, i) => (
                            <span key={i} className="w-11 h-11 border border-gray-50 p-0.5 rounded-lg flex items-center">
                                <img src={p} alt="payment method" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Cart
