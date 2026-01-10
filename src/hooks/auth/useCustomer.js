import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../../actions/auth"

export const useCustomer = (userId) => {
    const {data, isLoading} = useQuery({
        queryKey: ['customer', userId],
        queryFn: () => getUserData(userId),
        enabled: !!userId,
        retry: false,
        refetchOnWindowFocus: true
    })

    return {
        data,
        isLoading
    }
}