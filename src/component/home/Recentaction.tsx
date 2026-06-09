import { useEffect, useState } from "react"
import { products } from "../common/products"
import { Clock } from "lucide-react"


function Recentaction() {
    const [recentproduct, setrecentproducts] = useState<products[]>([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('recent-action') || '[]')
        setrecentproducts(data)
    }, [])

    if (recentproduct?.length === 0) {
        return null
    }

    return (
        <div className="mt-20 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock size={20} className="text-indigo-600" />
                Recently Viewed
            </h3>

            <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {recentproduct.map((item) => (
                    <div key={item.id} className="min-w-37.5 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <img src={item.image} className="h-20 w-full object-contain mb-2" />
                        <p className="text-xs font-bold truncate">{item.title}</p>
                        <span className="text-indigo-600 text-sm font-bold">${item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recentaction
