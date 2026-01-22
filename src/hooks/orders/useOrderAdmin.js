import { useQuery } from "@tanstack/react-query"
import { getOrderByIdAdming } from "../../actions/order"

export const useOrderAdmin = (id) => {
    const {data, isLoading} = useQuery({
        queryKey: ['order', 'adming', id],
        queryFn: () => getOrderByIdAdming(id),
        enabled: !!id,
        retry: false
    })

    return {
        data, isLoading
    }
}