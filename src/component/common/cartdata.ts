import { products } from "./products";

function addCart(product: products){
    const history = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingitem = history.find((items: any)=> items.id === product.id)

    if(existingitem){
        existingitem.quantity = (existingitem.quantity || 1) + 1
    }  else{
        history.push({...product, quantity:1})
    }
    
    localStorage.setItem('cart',  JSON.stringify(history))
    document.dispatchEvent(new Event('cart-updated'))

    
}

export default addCart