import { useQuery } from "@tanstack/react-query"
import { getFilterProducts } from "../../actions/product"

export const useFilteredProducts = ({page, brands}) => {

    const {data, isLoading} = useQuery({
        queryKey: ['filteredProducts', page, brands],
        queryFn: () => getFilterProducts({page, brands}),
        retry: false,
    })

    return {
        data: data?.data,
        isLoading,
        totalProducts: data?.count ?? 0
    }
}