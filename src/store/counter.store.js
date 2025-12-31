import { create } from 'zustand'

export const useConunterStore = create((set, get) => ({
    count: 1,
    increment: () => {
        set(state => ({count: state.count + 1}))
    },
    decrement: () =>{
        set(state => ({count: Math.max(1, state.count - 1) }))
    },
}))