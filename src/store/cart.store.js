import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    items: [],
    totalItemsInCart: 0,
    totalAmount: 0,

    addItem: (item) => {
        set((state) => {
            const existingItemIndex = state.items.findIndex(i => i.variantId === item.variantId)
            let updateItems;
            
            if(existingItemIndex >= 0) {
                // si el item ya existe en el carrito actualizamos la cantidad 
                updateItems = state.items.map((i, index) => index === existingItemIndex ? {
                    ...i, quantity: i.quantity + item.quantity
                } : i)
            } else {
                // Si el item no existe en el carrito se agrega 
                updateItems = [...state.items, item]
            }

            const newTotalItems = updateItems.reduce((acc, i) => acc + i.quantity, 0)

            const newTotalAmount = updateItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

            return {
                items: updateItems,
                totalItemsInCart: newTotalItems,
                totalAmount: newTotalAmount
            }

        })
    },

    removeItem: (variantId) => {
        set((state) => {

            let updateItems = state.items.filter(i => i.variantId !== variantId)

            const newTotalItems = updateItems.reduce((acc, i) => acc + i.quantity, 0)

            const newTotalAmount = updateItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

            return {
                items: updateItems,
                totalItemsInCart: newTotalItems,
                totalAmount: newTotalAmount
            }
        })
    },

    updateQuantity: (variantId, quantity) => {
        set((state) => {

            let updateItems = state.items.map(i => i.variantId === variantId ? {...i, quantity} : i)

            const newTotalItems = updateItems.reduce((acc, i) => acc + i.quantity, 0)

            const newTotalAmount = updateItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

            return {
                items: updateItems,
                totalItemsInCart: newTotalItems,
                totalAmount: newTotalAmount
            }
        })
    },

    cleanCart: () => {
        set({items: [], totalItemsInCart: 0, totalAmount: 0})
    }
}))