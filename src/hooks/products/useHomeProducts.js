import { useQueries } from "@tanstack/react-query"
import { getRandomProducts, getRecentProducts } from "../../actions/product"

export const useHomeProducts = () => {
    const  results = useQueries({
        queries: [
            {
                queryKey: ['recentProducts'],
                queryFn: getRecentProducts,
            },
            {
                queryKey: ['popularProducts'],
                queryFn: getRandomProducts,
            }
        ]
    })

    const [recentProductsResult, popularProductsResult] = results //[resultQuery1, resultQuery2]


    //combinar los Loading & Errores
    const isLoading = recentProductsResult.isLoading || popularProductsResult.isLoading
    const isError = recentProductsResult.isError || popularProductsResult.isError

    return {
        recentProductsResult: recentProductsResult.data || [],
        popularProductsResult: popularProductsResult.data || [],
        isLoading,
        isError
    }
}