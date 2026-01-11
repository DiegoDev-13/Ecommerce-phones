import {useQuery,} from '@tanstack/react-query'
import { getProducts } from '../../actions/product'

export const useProducts = ({page = 1}) => {
    const {data, isLoading} = useQuery({
        queryKey: ['products', page],
        queryFn: () => getProducts(page),
        staleTime: 1000 * 60 * 5, // 1 hora la data este frescas
    })

    return { 
        products: data?.products, 
        isLoading
        ,totalProducts: data?.count
    }
}