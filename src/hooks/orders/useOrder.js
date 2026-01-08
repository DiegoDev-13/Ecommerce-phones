import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../../actions/order"

export const useOrder = (orderId) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
        retry: false
    })

    return {
        data,
        isLoading,
        isError
    }
}