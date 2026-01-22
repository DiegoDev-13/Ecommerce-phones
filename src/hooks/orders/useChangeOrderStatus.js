import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOrderStauts } from "../../actions/order"
import toast from 'react-hot-toast'

export const useChangeOrderStatus = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: updateOrderStauts,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders', 'admin']
            })
        },
        onError: (err) => {
            console.log(err)
            toast.error('No se pudo actulizar el estado de la orden')
        }
    })

    return {
        mutate,
        isPending
    }
}    