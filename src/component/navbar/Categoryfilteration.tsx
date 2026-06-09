import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

interface products {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating: { rate: number, count: number }
}


function Categoryfilteration() {
    const [ishovered, setishoverd] = useState(false)
    const [more, setmore] = useState(false)
    const [category, setcategory] = useState<string[]>([])
    const [products, setproducts] = useState<products[]>([])
    const moreref = useRef<HTMLDivElement>(null)
    const [activecategory, seactivecategory] = useState<string>('')
    const navigate = useNavigate()



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
                console.log("in the category filteration", category);
                console.log("in the category filteration", products);
            } catch (error) {
                console.error('error', error);
            }
        }
        getproduct()


        const handleclickoutside = (event: MouseEvent) => {
            const target = event.target as Node

            if (moreref.current && !moreref.current.contains(target)) {
                setmore(false)
            }
        }
        document.addEventListener('mousedown', handleclickoutside)
        return () => {
            document.removeEventListener('mousedown', handleclickoutside)
        }

    }, [])

    const handlecategory = (category: string) => {
        if (category) {
            navigate(`/products?category=${category}`)
        }
    }

    return (
        <div className="flex justify-between items-center gap-4 py-4 px-4 my-2 w-full dark:text-white transition-colors">
            <div onMouseEnter={() => setishoverd(true)} onMouseLeave={() => setishoverd(false)} className="relative">
                <button className="flex items-center bg-gray-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 group">
                    <FontAwesomeIcon
                        icon={faBars}
                        className="mr-3 text-indigo-600 group-hover:text-white transition-colors"
                    />
                    All Categories
                </button>

                {ishovered && (
                    <div className="absolute top-8 w-45 bg-white dark:bg-slate-900 rounded-b-xl border border-gray-100 dark:border-slate-700 z-100">
                        {category.map((p, i) => (
                            <button onClick={() => handlecategory(p)} key={i} className="capitalize text-left w-full  px-4 py-3 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 transition-color ">{p}</button>
                        ))}
                    </div>
                )}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[13px] font-medium text-gray-600 dark:text-gray-300">
                {category.map((item) => (
                    <button
                        onClick={() => {
                            handlecategory(item)
                            seactivecategory(item)
                        }}
                        key={item}
                        className={`capitalize   cursor-pointer  ${activecategory === item ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-slate-800' : 'hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'} px-4 py-2 rounded-lg transition-all`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="relative">
                <button onClick={() => setmore(!more)} className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    More
                    <FontAwesomeIcon icon={faCaretDown} className="text-xs" />
                </button>

                {more && (
                    <div ref={moreref} className="absolute top-full right-0 z-100 bg-white border border-gray-100 rounded-b-xl">
                        {category.map((category) => (
                            <button onClick={() => handlecategory(category)} key={category} className="px-4 py-3 top-8 cursor-pointer bg-white w-45 text-left capitalize hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-900 ">{category}</button>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}
export default Categoryfilteration
