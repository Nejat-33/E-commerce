
import { products } from "./products"

function addWishlist(product : products){
    const wishlist = JSON.parse(localStorage.getItem('wishlist')|| '[]')
    const existingitem = wishlist.find((pr: any)=> pr.id === product.id)
    if(!existingitem){
        wishlist.push(product)
        localStorage.setItem('wishlist',JSON.stringify(wishlist))
        document.dispatchEvent(new Event('wishlist-updated'))
    } 
}

export default addWishlist