
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight } from "lucide-react";
import addCart from "../common/cartdata";
import { Link, useNavigate } from "react-router-dom";

interface Products {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating: { rate: number, count: number }
}

function FeaturedProduct({ products }: { products: Products[] }) {
    const mainProduct = products[0];
    const trendingItems = products.slice(1, 5);
    const navigate = useNavigate()

    const handleview = () => {
        navigate(`/products?category=all`)
    }

    if (!mainProduct) return null;
    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="relative w-full lg:w-1/2 h-screen group rounded-3xl overflow-hidden bg-linear-to-br from-indigo-600 to-purple-700">
                    <img
                        src={mainProduct.image}
                        className="w-full h-full  object-contain group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                        <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                            🔥 Featured
                        </span>

                        <h2 className="text-4xl font-extrabold mt-4 max-w-lg">
                            {mainProduct.title}
                        </h2>

                        <p className="mt-3 text-white/80 line-clamp-2 max-w-md">
                            {mainProduct.description}
                        </p>
                        <Link to={`/product/${mainProduct.id}`}>
                            <button className="mt-6 w-fit bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 hover:bg-indigo-500 hover:text-white transition">
                                Shop Now — ${mainProduct.price}
                            </button>

                        </Link>                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-3xl font-black">
                            Trending <span className="text-indigo-600">Now</span>
                        </h3>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {trendingItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 hover:-translate-y-2 hover:shadow-2xl transition duration-300 overflow-hidden"
                            >
                                <span className="absolute top-3 left-3 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                                    Hot
                                </span>


                                <div className=" h-36 flex justify-center mb-4">
                                    <img
                                        src={item.image}
                                        className="h-full object-contain group-hover:scale-110 transition duration-500"
                                    />
                                </div>

                                <h4 className="font-semibold line-clamp-1 dark:text-white">
                                    {item.title}
                                </h4>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-indigo-600 font-bold text-lg">
                                        ${item.price}
                                    </span>

                                    <div className="flex gap-2 opacity-0 items-center group-hover:opacity-100 transition">
                                        <Link to={`/product/${item.id}`} className="group">
                                            <span className="p-2 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-lg">
                                                <FontAwesomeIcon icon={faEye} />
                                            </span>
                                        </Link>
                                        <span onClick={(e) => { e.stopPropagation(); addCart(item) }} className="p-2 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-lg">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-indigo-600/5 opacity-0 pointer-events-none group-hover:opacity-100 transition"></div>
                            </div>
                        ))}
                    </div>

                    <div className="">
                        <a onClick={handleview} href="" className=" font-bold text-lg mt-3 text-indigo-600 flex items-center gap-2">
                            View More  <ChevronRight size={20} />
                        </a>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default FeaturedProduct;
