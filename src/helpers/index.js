
// funcion para formatear el precio a dolares
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

// Funcion para preparar los productos ( Celulares )
export const prepareProducts = (products) => {
    return products.map(product => {
        // agrupar las variantes por color
        const colors = product.variants.reduce((acc, variant) => {
            const existingColor = acc.find((item) => item.color === variant.color)

            if(existingColor) {
                // Si ya existe el color comparamos los precios

                existingColor.price = Math.min(existingColor.price, variant.price)
            } // Mantenemos el precio minimo
                else {
                    acc.push({
                        color: variant.color,
                        price: variant.price,
                        name: variant.color_name
                    })
                }
            
                return acc;
        }, [])

        // Obtener el precio mas bajo de las variantes agrupadas
        const price = Math.min(...colors.map(item => item.price))

        // Devolver el producto formatiado
        return {
            ...product, // copia todas las propiedades del producto original
            price,      // agrega el precio mínimo calculado
            colors: colors.map(({ name, color }) => ({ name, color })), // lista simplificada de colores
            variants: product.variants
        }

    })
}