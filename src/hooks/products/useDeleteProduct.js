import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../actions/product"
import toast from "react-hot-toast"

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']}),
            toast.success('El producto eliminado correctamente')
        },
        onError: (error) => {
            console.log(error)
            toast.error('Error al eliminar el producto')
        }
    })

    return {
        mutate,
        isPending
    }
}