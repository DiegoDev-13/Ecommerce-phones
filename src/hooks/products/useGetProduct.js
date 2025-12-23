import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../../actions/product"

export const useGetProduct = (slug) => {
    const {data: product, isLoading, isError } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProduct(slug),
        retry: false
    })

    return {
        product, 
        isLoading,
        isError
    }
}