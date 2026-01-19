import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "../../actions/product"
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast"

export const useUpdateProduct = (productId) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate, isPending} = useMutation({
        mutationFn: async (data) => updateProduct(productId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
            toast.success('Producto actualizado')
            navigate('/dashboard/products')
        },
        onError: (error) => {
            console.log(error)
            toast.error('Ocurrio un error a actualizar el producto')
        }
    })

    return {
        mutate,
        isPending
    }
}