
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install lucide-react for icons
import DealCard from "./dealcard";
import { EntryContext, useNavigate } from "react-router-dom";
import { applyDiscount } from "../common/applyDiscount";
import { products } from "../common/products";
import { EnrichedProduct } from "../common/products";
const BANNERS = [
    {
        id: 1,
        title: "Next-Gen Gaming Gear",
        subtitle: "Up to 40% Off on Pro Accessories",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200",
        accent: "from-indigo-600/80 to-purple-900/90"
    },
    {
        id: 2,
        title: "Summer Essentials",
        subtitle: "New Arrivals for Men & Women",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
        accent: "from-emerald-600/80 to-teal-900/90"
    }
];



function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [products, setProducts] = useState<EnrichedProduct[]>([]);


    const navigate = useNavigate()

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Fetch failed');
                const data = await response.json();
                const discounteddata: EnrichedProduct[] = data.map((item: products) => applyDiscount(item))
                const filtereddata = discounteddata.filter(item => item.hasDiscount)
                setProducts(filtereddata)
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const handleviewall = () => {
        navigate(`/products?DailyDeal=men's clothing`)
    }



    return (
        <div className="relative rounded-2xl  bg-gray-50 dark:bg-gray-950">
            <div className="relative w-screen right-1/2 left-1/2 -ml-[50vw] -mr-[50vw] h-110">
                {BANNERS.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                            }`}
                    >
                        <img
                            src={slide.image}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={slide.title}
                        />
                        <div className={`absolute inset-0 bg-linear-to-r ${slide.accent} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
                            <div className={`transition-all duration-700 delay-300 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                }`}>
                                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-md rounded-full">
                                    Limited Time Offer
                                </span>
                                <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                                    {slide.title.split(' ').map((word, i) => (
                                        <span key={i} className={i === 1 ? "text-indigo-300" : ""}>{word} </span>
                                    ))}
                                </h1>
                                <p className="text-xl text-gray-100 mb-8 max-w-lg">
                                    {slide.subtitle}
                                </p>
                                <button className="group relative text-black px-10 py-4 rounded-full font-bold overflow-hidden transition-all hover:pr-14">

                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                    {BANNERS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 transition-all duration-300 rounded-full ${current === i ? "w-12 bg-white" : "w-2 bg-white/50"
                                }`}
                        />
                    ))}
                </div>

                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
                    <ChevronLeft size={32} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
                    <ChevronRight size={32} />
                </button>
            </div>
            <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30 pb-20">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Flash Deals</h2>
                            <p className="text-gray-500">Don't miss out on these limited-time offers</p>
                        </div>
                        <a onClick={handleviewall} href="#" className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                            View All Products <ChevronRight size={20} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.slice(0, 4).map((item) => (
                                <div key={item.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                                    <DealCard product={item} />
                                </div>
                            ))
                        ) : (

                            <div className="col-span-full py-10 text-center text-gray-400">Loading amazing deals...</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HeroSlider;