
// funcion para formatear el precio a dolares
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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

// Funcion para formatear la fecha a formato 6 de enero 2026
export const formatDateLong = (date) => {
    const dateObject = new Date(date)

    return dateObject.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Funcion para formatear la fecha formato dd/mm/yyyy
export const formatDateShort = (date) => {
    const dateObject = new Date(date)

    return dateObject.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric'
    })
}

// Funcion para obtener el estado del pedido en español
export const getStatus = (status) => {
    switch (status) {
        case 'Pending':
            return 'Pendiente'
        case 'Paid':
            return 'Pagado'
        case 'Shipped':
            return 'Enviado'
        case 'Delivered':
            return 'Entregado'
        default:
            return status
    }

}

// Funcion para generar el slug de un producto
export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // reemplaza todo lo que no sea alfanumérico por "-"
    .replace(/^-+|-+$/g, '')       // elimina guiones al inicio y al final
    .replace(/--+/g, '-');         // colapsa múltiples guiones
}

// Funcion para extraer el path relativo de una URL
export const extratFilePath = (url) => {
    const parts = url.split('/storage/v1/object/public/product-images/')
    // EJEMPLO: ['/storage/v1/object/public/product-images/', '4554864641864645414561-iphone16-pro-max.jpg]

    if(parts.length !== 2) {
        throw new Error(`url no valida: ${url}`);
    }

    return parts[1]
}