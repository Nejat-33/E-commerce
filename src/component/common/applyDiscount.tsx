import { products } from "./products"

export const applyDiscount = (product: products) => {
    const discountRate = product.category === 'electronics' ? 0.15 : 0

    if (discountRate > 0) {
        return {
            ...product, hasDiscount: true, discountPrice: (product.price * (1 - discountRate)).toFixed(2),
            percentOff: discountRate * 100
        }
    }
    return { ...product, hasDiscount: false };
}