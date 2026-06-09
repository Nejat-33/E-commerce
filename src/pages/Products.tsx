import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { EnrichedProduct, Getproduct } from "../component/common/products"
import StarRating from "../component/common/Rating"
import { applyDiscount } from "../component/common/applyDiscount"

function Products() {
  const [product, setproduct] = useState<EnrichedProduct[]>([])
  const [filterddata, setfilterded] = useState<EnrichedProduct[]>([])
  const [params] = useSearchParams()
  const search = params.get('search') || null
  const deal = params.get('DailyDeal') || null
  let category = params.get('category') || null

  useEffect(() => {
    const getproduct = async () => {
      const data = await Getproduct()
      const newfilter: EnrichedProduct[] = data.map(item => applyDiscount(item))
      setproduct(newfilter)
    }
    getproduct()
  }, [])

  useEffect(() => {
    let filtered = product
    if (search) {
      filtered = filtered.filter(product => {
        return (
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        )
      })
    }

    else if (category) {
      if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category)
      }
      else {
        category = 'Trending Now'
        filtered = product
      }
    }
    setfilterded(filtered)


  }, [search, category, product])



  return (
    <div className="bg-white rounded-3xl mb-20 py-5 px-7">

      <p className="capitalize font-bold text-xl text-indigo-600 mb-6">{category === 'all' ? 'Trending Now' : category ? category : deal ? 'Flash Deal' : ''}</p>
      <div className="grid grid-cols-6 gap-5  mb-20 ">
        {filterddata && filterddata.map((product, index) => (
          <Link to={`/product/${product.id}`}>
            <div key={index} className="relative flex flex-col gap-4">

              {product.hasDiscount && (
                <span className="absolute text-xs top-0 left-2 bg-red-600 text-white px-2 py-1 rounded-lg">{product.percentOff}%</span>
              )}
              <div className="flex items-center justify-center w-40 h-40 px-8 py-5 bg-gray-100 rounded-2xl">
                <img src={product.image} alt='product' className="object-contain" />
              </div>
              <p className="text-xs">{product.title}</p>

              <span className="flex gap-1 flex-col">
                <p className="flex gap-2 items-center">
                  <span className="text-red-600  text-sm">${product.price}</span>
                  <span className="text-xs line-through">${(product.price).toFixed(2)}</span>
                </p>
                <span className="text-sm"><StarRating rate={product.rating.rate} /> <span className="text-xs text-gray-400">{product.rating.count} SOLD</span></span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products
