
export function PriceCaculator(product,variants){
    let cost = product?.costPerUnit
    variants.map((variant) => {
        cost = cost + variant?.price
    })
    return cost
}

export function TotalPriceCaculator(products,productsList,quanityList){
    let totalPrice = 0;
    const cartData = products.map((product) => product.productData) 
    productsList.map(productId => {
        let index = productsList.indexOf(productId)
        let data =productId.split('--')
        let id = data.shift()
        var currentProductPrice = cartData.find((product) =>product?.id === id)?.costPerUnit
        data.map((variant) => {
            var extractVariant = variant.split('_')
            currentProductPrice += Number(extractVariant[1])
        })
        let currentQuanity = quanityList[index]
        totalPrice += currentProductPrice*currentQuanity
    })

    return totalPrice
}