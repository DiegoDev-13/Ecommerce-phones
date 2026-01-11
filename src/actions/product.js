import { supabase } from "../supabase/Client"

export const getProducts = async (page) => {

    const itemsPerPages = 10
    const from = (page - 1) * itemsPerPages
    const to = from + itemsPerPages - 1

    const {data: products, error, count} = await supabase.from('products').select('*, variants(*)', {count: 'exact'}).order('created_at', {ascending: false}).range(from, to)

    if(error) {
        console.log(error.message)
        throw new Error(error.message);
    }

    return {products, count}
}

export const getFilterProducts = async ({page = 1, brands = []}) => {

    const itemsPerPages = 10
    const from = (page - 1) * itemsPerPages
    const to = from + itemsPerPages - 1

    let query = supabase.from('products').select('*, variants(*)', {count: 'exact'}).order('created_at', {ascending: false}).range(from , to)

    if(brands.length > 0) {
        query = query.in('brand', brands)
    }

    const {data, error, count} = await query

    if(error) {
        console.log(error.message)
        throw new Error(error.message);
    }

    return {
        data,
        count
    }
}

export const getRecentProducts = async () => {
    const {data: products, error} = await supabase.from('products').select('*, variants(*)').order('created_at', {ascending: false}).limit(4)

    if(error) {
        console.log(error)
        throw new Error(error.message)
    }

    return products
}

export const getRandomProducts = async () => {
    const {data: products, error} = await supabase.from('products').select('*, variants(*)').limit(20)

    if(error) {
        console.log(error)
        throw new Error(error.message)
    }

    // Seleccionar 4 productos al azar
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4)

    return randomProducts
}

export const getProduct = async (slug) => {
    const { data, error } = await supabase.from('products').select('*, variants(*)').eq('slug', slug).single()

    if(error){
        console.log(error)
        throw new Error(error.message)
    }

    return data
}

export const searchProduct = async (searchTerm) => {
    // Buscar productos cuyo nombre contenga el termino de busqueda: searchTerm 
    const { data, error } = await supabase.from('products').select('*, variants(*)').ilike('name', `%${searchTerm}%`)

    if(error) {
        console.log(error)
        throw new Error(error.message)
    }

    return data
}   