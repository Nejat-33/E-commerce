import { Plus, Store } from 'lucide-react'
import { useEffect, useState } from 'react'

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

function Checkout() {
  const [checkoutproducts, setcheckoutproducts] = useState<products[]>([])
  let totalP = 0
  const totalprice = () => {
    totalP = checkoutproducts.reduce((sum, p) => sum + (p.price), 0)
  }
  totalprice()
  useEffect(() => {
    const checkout = JSON.parse(localStorage.getItem('checkout-products') || '[]')
    setcheckoutproducts(checkout)
  }, [])


  return (
    <div className='flex flex-col gap-5 p-4'>
      <div className='flex justify-between bg-white rounded-xl p-6'>
        <div className='flex flex-col gap-4 text-sm text-slate-800'>
          <p className='font-bold text-xl'>Shipping address</p>

          <div className='flex flex-col gap-1'>
            <span className='flex gap-2 font-bold '>
              username
              <span className='text-gray-500 font-medium'>user phone no</span>
            </span>
            <span className='text-xs text-gray-500'>user address</span>
            <span className='text-xs text-gray-500'>user country and sub city</span>
          </div>

        </div>
        <span className='text-blue-800'>Change</span>
      </div>
      <div className='flex flex-col p-6 bg-white rounded-xl gap-3'>
        <p className='font-bold text-xl'>Pyment Method</p>
        <div className='flex justify-between px-4 py-2 border border-gray-300 rounded-xl'>
          <div className='flex gap-3 items-center'>
            <button className='w-3 h-3 rounded-full outline outline-offset-2 outline-violet-600 bg-violet-600 cursor-pointer '></button>
            Credit/Debit Card
          </div>
          <img src='https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' className='w-10 h-10' alt="" />
        </div>
        <button className='p-3 items-center justify-center w-full border border-blue-500 rounded-xl flex gap-2 font-bold'><Plus size={12} />Add a New Card</button>
      </div>
      <div className='flex flex-col gap-3 p-6 bg-white rounded-xl'>
        <p className='text-xl font-bold tracking-wide'>Review Items</p>
        <span className='flex gap-2 items-center text-sm font-bold'><Store size={12} className='text-gray-500' /> Degital Trends Store</span>

        <div className='space-y-6'>
          {checkoutproducts.length > 0 && checkoutproducts.map((product, i) => (
            <div key={i} className='flex gap-3 justify-between'>
              <div className='flex gap-3'>
                <div className='w-20 h-20 rounded-2xl bg-gray-100 p-2 flex items-center justify-center'>
                  <img src={product.image} alt="product" className='object-contain w-18 h-18' />

                </div>
                <div className='flex flex-col gap-2'>
                  <p className='capitalize text-sm'>{product.title}</p>
                  <span className='flex gap-2 text-sm text-gray-500'>
                    <p>color  |</p>
                    <p>store</p>
                  </span>
                  <div className='flex gap-2 border justify-between items-center border-gray-200 px-2 text-sm text-gray-400 w-1/3'>
                    <span>-</span>|
                    <span>{product.quantity}</span>|
                    <span>+</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>

                <span className='font-bold text-lg'>${product.price}</span>
                <div className='flex flex-col'>
                  <span className='text-green-600 text-sm'>Shipping <span>Free</span></span>
                  <span className='text-gray-400 text-xs'>delivery <span>Dec 07</span></span>
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
      <div className='flex flex-col gap-5 bg-white rounded-xl p-6'>
        <p className='font-bold text-xl'>Summary</p>
        <div className='text-gray-400 text-sm space-y-1'>
          <div className='flex justify-between items-center'>
            Total items Price
            <span>{totalP}</span>
          </div>
          <div className='flex justify-between items-center'>
            Shipping
            <span className='text-green-500'>free</span>
          </div>
          <div className='flex justify-between items-center'>
            Coin
            <span className='text-red-400'>0.0</span>
          </div>
          <div className='flex justify-between items-center'>
            Tax
            <span>0.0</span>
          </div>
        </div>
        <div className='h-0.5 bg-gray-100'></div>
        <div className='flex flex-col gap-4'>
          <div className='text-xl font-bold flex justify-between'>Total
            <span className='text-2xl text-red-500 font-bold'>${totalP}</span></div>
          <button className='py-4 cursor-pointer rounded-4xl bg-red-500 text-white text-xl'>Place Order</button>
        </div>
        <span className='p-3 text-sm text-gray-400 bg-gray-100 rounded-2xl text-center tracking-wide'>By clicking "Place Order", you agree to our <span className='underline text-blue-600'>Terms of Use</span> and <span className='underline text-blue-600'>Privacy Policy</span></span>
      </div>
    </div>
  )
}

export default Checkout
