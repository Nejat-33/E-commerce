import { Link } from "react-router-dom";
import { products, EnrichedProduct } from "../common/products";

function DealCard({ product }: { product: EnrichedProduct }) {

    return (
        <div className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 relative hover:shadow-xl transition-all">
            <Link to={`/product/${product.id}`}>
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                    {product.percentOff}%
                </div>
                <div className="h-40 w-full flex justify-center items-center overflow-hidden mb-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 h-10">
                    {product.title}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-red-600">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">$ {product.discountPrice} </span>
                </div>
                <div className="mt-3">
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-2/3 rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium uppercase">8 sold / 12 left</p>
                </div>
            </Link>
        </div>
    );
}

export default DealCard