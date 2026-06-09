
export interface products {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating: { rate: number, count: number }
}

export interface EnrichedProduct extends products {
  hasDiscount?: boolean;
  discountPrice?: string;
  percentOff?: number;
}


export const Getproduct = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
            throw new Error('error in fething data')
        }
        const data: products[]= await response.json()
        return data
    } catch (error) {
        console.error('error', error);
        return []
    }
}


export const addtorecent = (product: products) =>{
    const rowdata = localStorage.getItem('recent-action')|| '[]'
    const history: products[] = JSON.parse(rowdata)
    const filtteredhistory  = history.filter((items: products)=> items.id !== product.id)
    const newhistory = [product,...filtteredhistory].slice(0,5)

    localStorage.setItem('recent-action',JSON.stringify(newhistory))
}

